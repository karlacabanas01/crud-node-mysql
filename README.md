# 🚀 CRUD con Next.js, Node.js, MySQL y AWS

## 📌 Descripción

### Este proyecto es una aplicación CRUD que utiliza Node.js con Express para el backend y MySQL como base de datos. Se ejecuta en un entorno local con XAMPP y gestiona la autenticación mediante JSON Web Tokens (JWT).

## 🌍 Tecnologías utilizadas

## 🛠️ Backend

- Node.js con Express.js (4.21.2)
- MySQL2 (3.12.0)
- CORS (2.8.5)
- Dotenv (16.4.7)
- JSON Web Token (JWT) (9.0.2)
- Bcrypt (5.1.1) y BcryptJS (2.4.3)

📌 Base de datos: MySQL alojado en XAMPP (localhost)
📌 Entorno: Desarrollo local

## Antes de comenzar, asegúrate de tener instalado:

- Node.js
- XAMPP (para MySQL)
- Git

### Clonar el repositorio

git clone https://github.com/karlacabanas01/crud-node-mysql.git
cd crud-node-mysql

### Instalar dependencias

npm install

### Configurar las variables de entorno en .env

DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=<tu-contraseña-segura>
DB_NAME=crud_app
DB_PORT=3307
JWT_SECRET=<clave-secreta-para-tokens>

### Iniciar el servidor backend en el puerto 3000

npm start

## Autor

📌 Desarrollado por @karlacabanas01 🚀
