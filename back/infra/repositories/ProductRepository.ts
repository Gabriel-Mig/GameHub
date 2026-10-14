import { db } from "../database/db";
import type { CreateProductDTO } from "../../src/dto/CreateProductDTO";
import type { Product } from "../../src/model/Product";

export interface ProductFilters {
  search?: string;
  category?: string;
  sort?: string;
  page?: number;
}

export interface ProductPage {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

const PRODUCT_PAGE_SIZE = 24;

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id),
    name: String(row.name),
    description: String(row.description),
    category: String(row.category),
    price: Number(row.price),
    stock: Number(row.stock)
  };
}

export class ProductRepository {
  async findAll(filters: ProductFilters): Promise<ProductPage> {
    const conditions: string[] = [];
    const values: unknown[] = [];

    if (filters.search) {
      values.push(`%${filters.search}%`);
      const parameter = `$${values.length}`;
      conditions.push(`(name ILIKE ${parameter} OR description ILIKE ${parameter})`);
    }

    if (filters.category) {
      values.push(filters.category);
      conditions.push(`category = $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const orderBy = filters.sort === "price" ? "price ASC, id ASC" : "name ASC, id ASC";
    const requestedPage = Number.isInteger(filters.page) && (filters.page ?? 0) > 0
      ? filters.page ?? 1
      : 1;
    const pageQuery = `SELECT id, name, description, category, price, stock FROM products ${where}
       ORDER BY ${orderBy} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    const [countResult, pageResult] = await Promise.all([
      db.query<{ total: string }>(`SELECT COUNT(*) AS total FROM products ${where}`, values),
      db.query(pageQuery, [...values, PRODUCT_PAGE_SIZE, (requestedPage - 1) * PRODUCT_PAGE_SIZE])
    ]);
    const total = Number(countResult.rows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);
    const result = page === requestedPage
      ? pageResult
      : await db.query(pageQuery, [...values, PRODUCT_PAGE_SIZE, (page - 1) * PRODUCT_PAGE_SIZE]);

    return {
      products: result.rows.map(mapProduct),
      total,
      page,
      pageSize: PRODUCT_PAGE_SIZE
    };
  }

  async create(input: CreateProductDTO): Promise<Product> {
    const result = await db.query(
      `INSERT INTO products (name, description, category, price, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, category, price, stock`,
      [input.name, input.description, input.category, input.price, input.stock]
    );
    return mapProduct(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    await db.query("DELETE FROM products WHERE id = $1", [id]);
  }

  async getDashboard() {
    const dashboardStartedAt = performance.now();
    const result = await db.query<{
      total_products: string;
      low_stock: string;
      inventory_value: string;
      categories: string;
    }>(
      `SELECT
         COUNT(*) AS total_products,
         COUNT(*) FILTER (WHERE stock <= 5) AS low_stock,
         COALESCE(SUM(price * stock), 0) AS inventory_value,
         COUNT(DISTINCT category) AS categories
       FROM products`
    );
    console.info(`[SQL] dashboard agregado em ${(performance.now() - dashboardStartedAt).toFixed(2)} ms`);
    const metrics = result.rows[0];

    return {
      totalProducts: Number(metrics.total_products),
      lowStock: Number(metrics.low_stock),
      inventoryValue: Number(metrics.inventory_value),
      categories: Number(metrics.categories)
    };
  }
}
