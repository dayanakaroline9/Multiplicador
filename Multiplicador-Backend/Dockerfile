# Usar a imagem do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos para o container
COPY package*.json ./
RUN npm install
COPY . .

# Definir a variável de ambiente
ENV NODE_ENV=production

# Expor a porta
EXPOSE 5000

# Comando para rodar o servidor
CMD ["node", "server.js"]
