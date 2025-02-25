# Backend realizado con NodeJS, Fastify, Express y JWT con MongoDB desplegado con Railway

## Instalacion
Este proyecto esta creado con Fastify y Express

## Generar archivo .env en la raiz del proyecto
Existe el archivo .env para poder configurar el puerto, url de la base de dato mongo y el secret jwt

```
MONGO_URI=
PORT=
JWT_SECRET=
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

|HTTP Method| URL                                  | Description                |
|---|--------------------------------------|----------------------------|
|`POST`| http://localhost:3000/api/login          | Login        |

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