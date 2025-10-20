# Usar uma imagem base leve do Nginx
FROM nginx:alpine

# Copiar o arquivo .html principal COMO 'index.html'
# Isso faz com que o Nginx o sirva por padrão em http://localhost:8080
COPY funcionarios.html /usr/share/nginx/html/index.html

# Copiar os outros arquivos com seus nomes corretos
COPY funcionarios.css /usr/share/nginx/html/
COPY funcionarios.js /usr/share/nginx/html/

# Expor a porta 80
EXPOSE 80