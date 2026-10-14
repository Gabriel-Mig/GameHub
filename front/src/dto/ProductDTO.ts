export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductPageDTO {
  products: ProductDTO[];
  total: number;
  page: number;
  pageSize: number;
}
