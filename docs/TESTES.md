 GameHub

## Antes de alterar o código
- Faça login com a conta de demonstração.
- [ Abra o catálogo e observe a aba Network
- [ ] Digite uma busca devagar e depois cole um termo completo.
- [ ] Teste categorias e ordenação.
- [ ] Abra o dashboard e conte as consultas relacionadas aos indicadores
- [ ] Entre como administrador e cadastre um produto; observe a atualização do catálogo
- [ ] Exclua um produto e observe quantos dados são solicitados novamente
- [ ] Volte entre Dashboard e Produtos e observe se a página busca e renderiza o catálogo inteiro.
- [ ] Registre duração, quantidade de requisições e quantidade de produtos recebidos.
 [ ] Use os mesmos passos após cada correção.

## Testes de regressão
- Pesquisa por nome e descrição.
- [ ] Filtro por categoria.
- [ ] Ordenação por nome e preço.
- [ ] Cadastro e exclusão com conta de administrador; compare a quantidade de dados recarregados.
- [ ] Acesso negado para operações administrativas com conta de aluno
- [ ] Indicadores do dashboard compatíveis com o catálogo.
-[ ] Requisições simultâneas e respostas de busca em ordem diferente

Registre somente tempos medidos no seu computador; não invente resultados.


## Cenarios obrigatórios para a versão com gargalos

1. Após executar `npm run init-db`, confirme que a listagem mostra aproximadamente 60.000 produtos. Se mostrar poucos, o inicializador não foi executado contra o banco configurado em `back/.env`.
2. Abra DevTools > Network, filtre por `products` e digite `console` lentamente. Conte quantas requisições GET são disparadas enquanto digita
3. Na primeira carga, compare o tamanho da resposta JSON e o tempo de renderização na aba Performance. O navegador deverá montar o catálogo completo; não use apenas o tempo do filtro local como medida
4. Observe o terminal do backend: a mesma listagem é registrada duas vezes por busca e informa linhas/tempo de cada execução.
5. Abra o dashboard e observe o log de quatro consultas sequenciais
6. Compare os resultados com a versão resolvida, no mesmo computador, banco e navegador. Não use `setTimeout` ou `sleep` para fabricar lentidão: o exercício deve medir trabalho desnecessário real.
