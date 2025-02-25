# Backend realizado con NodeJS, Fastify, Express y JWT con MongoDB desplegado con Railway

## 🚀 Instalación y Configuración

Este es el backend del sistema de gestión de usuarios, desarrollado con **Node.js**, **Express**, y **TypeScript**.  
Proporciona endpoints para autenticación y administración de usuarios.

### 1️⃣ Requisitos Previos
- **Node.js** `v18+`
- **npm** `v9+` o **yarn`
- **MongoDB** (si se usa base de datos)

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- JWT para autenticación
- Railway para despliegue

## Generar archivo .env en la raiz del proyecto
Existe el archivo .env para poder configurar el puerto, url de la base de dato mongo y el secret jwt

   ```env
   PORT=3000
   JWT_SECRET=tu_secreto
   DB_URL=mongodb://usuario:contraseña@host:puerto/basedatos
   ```
## API Reference

#### Registrar Usuario  

|HTTP Method| URL                                  | Description                |
|---|--------------------------------------|----------------------------|
|`POST`| http://localhost:3000/users/register          | Crear nuevo Usuario        |

1. `Crear nuevo Usuario`
- URL: http://localhost:3000/users/register
- HTTP Method: POST
- Body:
  ````json
    {
        "fullName": "",
        "email": "",
        "password": "",
        "phone": "+332123333333"//formato telefono
    }
  ````
- Response:
    ````json
    {
        "status": "success",
        "message": "Usuario registrado exitosamente",
        "data": {
            "fullName": "",
            "email": "",
            "password": "",
            "phone": "",
            "_id": "",
            "__v": 0
        }
    }
    ````

#### Listar Usuarios

|HTTP Method| URL                                  | Description                |
|---|--------------------------------------|----------------------------|
|`GET`| http://localhost:3000/api/users          | Listar Usuarios        |

2. `Listar usuarios`
- URL: http://localhost:3000/api/users
- HTTP Method: GET
- Body: None
  
- Response:
    ````json
   {
        "status": "success",
        "message": "Listado de usuarios",
        "data": [
            {
                "id": "",
                "fullName": "",
                "email": "",
                "phone": ""
            }
        ]
    }
    ````

#### Login Usuario
### 🔑 **Autenticación**

|HTTP Method| URL                                  | Description                |
|---|--------------------------------------|----------------------------|
|`POST`| http://localhost:3000/api/login          | Inicia sesión y retorna un **token JWT**        |

3. `Logueo`
- URL: http://localhost:3000/api/login
- HTTP Method: POST
- Body: 
    ````json
    {
        "email": "",
        "password": ""
    }
    ````
- Response:
    ````json
    {
        "success": true,
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpjcnV6YWRvQGdtYWlsLmNvbSIsImlhdCI6MTc0MDQ2NjM2NiwiZXhwIjoxNzQwNDY5OTY2fQ.9lTzJrKOu-d22fjylrVFSFNRqvir05OVOVX_w-sN1XQ",
            "email": "XXXX@XXXX.com"
        }
    }
    ````

## 🚀 Despliegue en Railway

El backend ha sido desplegado en [Railway](https://railway.app/).  
Sigue estos pasos para desplegar tu propia versión:

1. Crea una cuenta en Railway e inicia sesión.
2. Crea un nuevo proyecto y selecciona **Deploy from GitHub**.
3. Conéctalo a tu repositorio y configura las variables de entorno en **Settings → Variables**.
4. Railway desplegará automáticamente el backend.


