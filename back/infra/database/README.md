# Banco de dados PostgreSQL

O GameHub usa PostgreSQL. Crie um banco chamado `gamehub` no pgAdmin e configure `DATABASE_URL` no arquivo `back/.env`.

O comando `npm run init-db` cria as tabelas e cadastra os usuários e produtos de demonstração. Não execute o arquivo SQL no pgAdmin se já for usar o script de inicialização; ele é mantido como referência do esquema.
