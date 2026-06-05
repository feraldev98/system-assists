# ⚡ API - Sistema Assist

API backend para gestión de asistencia, usuarios e incidencias.

## 🌐 Base URL

http://localhost:3000

---

## 🔐 Autenticación

- Usa cookies HTTP-only
- El frontend debe enviar:

```js
credentials: "include";
```

---

## 🧠 Roles

ADMIN  
AUXILIAR  
PARENT

---

## 📌 Endpoints

### AUTH

<details>
<summary>INICIAR SESIÓN</summary>
  
### POST /login

Autentica un usuario mediante email y contraseña.
Si las credenciales son válidas, el servidor genera una cookie HTTPOnly llamada token que contiene el JWT de autenticación.

### Body:

```json
{
  "email": "testing@hotmail.com",
  "password": "1234567a"
}
```

### Validations:

- email: requerido, trim, convertido a minúsculas, formato válido de email, máximo 100 caracteres.
- password: requerida, trim, obligatoria, máximo 100 caracteres, al menos una letra, al menos un número.
- No se permiten campos adicionales.

### Response:

```json
{
  "success": true,
  "message": "Bienvenido qwe Kael",
  "user": {
    "email": "auxiliar@gmail.com",
    "firstname": "qwe",
    "lastname": "Kael",
    "role": "AUXILIAR"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Usuario y/o contraseña incorrectos",
  "errors": {
    "message": "Usuario y/o contraseña incorrectos"
  }
}
```

</details>

<details>
<summary>CERRAR SESIÓN</summary>

### POST /logout

Cierra la sesión del usuario autenticado eliminando la cookie HTTPOnly token.

### Response:

```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

### Validations:

- requiere usuario autenticado.

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

### USER

<details>
<summary>CREAR NUEVO USUARIO</summary>
  
### POST /user

Crea un nuevo usuario en el sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### Body:

```json
{
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "testing@hotmail.com",
  "password": "1234567a",
  "repassword": "1234567a",
  "phone": "+51 985 988 977",
  "role": "AUXILIAR"
}
```

### Validations:

- firstname: requerido, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: requerido, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- email: requerido, trim, convertido a minúsculas, formato válido de email.
- password: requerida, trim, mínimo 8 caracteres, máximo 100 caracteres, al menos una letra, al menos un número.
- repassword: requerida, trim, debe coincidir con password.
- phone: opcional, trim, elimina espacios automáticamente, debe tener formato +519XXXXXXXX.
- role: requerido, valores permitidos: ADMIN, AUXILIAR, PARENT.
- No se permiten campos adicionales.

### Response:

```json
{
  "success": true,
  "message": "Usuario creado correctamente",
  "user": {
    "user": {
      "idUser": 6,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar2@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T22:26:54.496Z",
      "updatedAt": "2026-06-04T22:26:54.496Z"
    }
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email no tiene un formato válido"
    },
    {
      "field": "phone",
      "message": "El teléfono debe tener formato +519XXXXXXXX"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>LISTAR TODOS LOS USUARIOS</summary>
  
### GET /user

Obtiene una lista paginada de usuarios del sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### Query Params

| Parameter | Type   | Required | Description                                                                                                                               |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                            |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 100. Default: 10.                                                                    |
| role      | string | No       | Filtra usuarios por rol. Valores permitidos: ADMIN, AUXILIAR, PARENT.                                                                     |
| search    | string | No       | Busca coincidencias por firstname, lastname, email o phone.                                                                               |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: firstname, lastname, email, phone, createdAt, updatedAt. Default: createdAt. |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                                       |

### Example Request

- GET /user?page=1&limit=10&role=AUXILIAR&search=fernando&sortBy=createdAt&sortOrder=desc

### Response

```json
{
  "success": true,
  "data": [
    {
      "idUser": 2,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T21:56:17.433Z",
      "updatedAt": "2026-06-04T21:56:17.433Z"
    },
    {
      "idUser": 4,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar1@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T22:26:24.283Z",
      "updatedAt": "2026-06-04T22:26:24.283Z"
    },
    {
      "idUser": 6,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar2@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T22:26:54.496Z",
      "updatedAt": "2026-06-04T22:26:54.496Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4,
    "totalPages": 1
  }
}
```

### Search Behavior

El parámetro search realiza búsquedas insensibles a mayúsculas/minúsculas sobre los siguientes campos:

- firstname
- lastname
- email
- phone

### Validations

- page: opcional, número entero, mínimo 1.
- limit: opcional, número entero, mínimo 1, máximo 100.
- role: opcional, valores permitidos: ADMIN, AUXILIAR, PARENT.
- sortBy: opcional, valores permitidos: firstname, lastname, email, phone, createdAt, updatedAt.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, trim automático.

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>ACTUALIZAR INFORMACIÓN DE UN USUARIO</summary>
  
### PATCH /user/:id

Obtiene una lista paginada de usuarios del sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| URL Param | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| id        | number | Sí       | ID del usuario que se desea actualizar. |

### Body

Todos los campos son opcionales, pero se debe enviar al menos uno.

```json
{
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "fernando@hotmail.com",
  "phone": "+51 985 988 977",
  "role": "AUXILIAR",
  "password": "nuevo1234",
  "repassword": "nuevo1234"
}
```

### Validations

- firstname: opcional, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: opcional, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- email: opcional, trim, convertido a minúsculas, formato válido de email.
- phone: opcional, trim, elimina espacios automáticamente, debe tener formato +519XXXXXXXX.
- role: opcional, valores permitidos: ADMIN, AUXILIAR, PARENT.
- password: opcional, trim, mínimo 8 caracteres, máximo 100 caracteres, al menos una letra y al menos un número.
- repassword: opcional, obligatorio si se envía password, debe coincidir con password.
- no se permiten campos adicionales.

### Password Behavior

- Si se envía password, el sistema genera automáticamente un nuevo passwordHash.
- password y repassword no son retornados en la respuesta.
- Si no se envía password, la contraseña actual permanece sin cambios.

### Example Request

- PATCH /user/1
- BODY:

```json
{
  "firstname": "Fernando",
  "phone": "+51 999 888 777"
}
```

### Response

```json
{
  "success": true,
  "message": "Datos actualizados correctamente",
  "user": {
    "idUser": 1,
    "firstname": "Fernando",
    "lastname": "System",
    "email": "admin@system.com",
    "phone": "+51999888777",
    "role": "ADMIN",
    "createdAt": "2026-06-04T19:18:17.496Z",
    "updatedAt": "2026-06-04T22:30:21.481Z"
  }
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email no tiene un formato válido"
    },
    {
      "field": "repassword",
      "message": "Las contraseñas no coinciden"
    }
  ]
}
```

### Empty Body Error Response

```json
{
  "success": false,
  "message": "No se enviaron campos para actualizar",
  "errors": [
    {
      "field": "body",
      "message": "Debes enviar al menos un campo para actualizar"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

</details>

<details>
<summary>LISTAR USUARIO POR ID</summary>
  
### GET /user/:id

Obtiene la información de un usuario específico mediante su ID. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| URL Param | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| id        | number | Sí       | ID del usuario que se desea buscar. |

### Example Request

GET /user/1

### Validations

- id: requerido, número entero, mayor a 0.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID de usuario debe ser mayor a 0"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Usuario encontrado",
  "user": {
    "idUser": 1,
    "firstname": "Fernando",
    "lastname": "System",
    "email": "admin@system.com",
    "phone": "+51999888777",
    "role": "ADMIN",
    "createdAt": "2026-06-04T19:18:17.496Z",
    "updatedAt": "2026-06-04T22:30:21.481Z"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Usuario no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un usuario con el ID proporcionado"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>ELIMINAR USUARIO POR ID</summary>
  
### DELETE /user/:id

Elimina un usuario del sistema mediante su ID. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| URL Param | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| id        | number | Sí       | ID del usuario que se desea eliminar. |

### Example Request

DELETE /user/1

### Validations

- id: requerido, número entero, mayor a 0.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID de usuario debe ser mayor a 0"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Usuario eliminado correctamente",
  "user": {
    "idUser": 6,
    "firstname": "qwe",
    "lastname": "Kael",
    "email": "auxiliar2@gmail.com",
    "role": "AUXILIAR",
    "createdAt": "2026-06-04T22:26:54.496Z"
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

### GRADE

<details>
<summary>CREAR NUEVO GRADO</summary>
  
### POST /grade

Crea un nuevo grado en el sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### body

```json
{
  "level": 1
}
```

### Example Request

- POST /user

- BODY:

```json
{
  "level": 1
}
```

### Validations

- level: requerido, número entero.
- level: no puede ser negativo.
- No se permiten campos adicionales.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "level",
      "message": "El grado debe ser un número entero"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado creado correctamente",
  "grade": {
    "idGrade": 37,
    "level": 14
  }
}
```

### Duplicate Grade Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "level",
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>LISTAR TODOS LOS GRADOS</summary>
  
### GET /grade
Obtiene una lista paginada de grados registrados en el sistema. Requiere autenticación y permisos de administrador o auxiliar.

### Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

### Query Params

| Parameter | Type   | Required | Description                                                                                  |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                               |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 100. Default: 10.                       |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idGrade, level. Default: level. |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.          |

### Example Request

- GET /grade?page=1&limit=10&sortBy=level&sortOrder=asc

### Validations

- page: opcional, número entero, mínimo 1.
- limit: opcional, número entero, mínimo 1, máximo 100.
- sortBy: opcional, valores permitidos: idGrade, level.
- sortOrder: opcional, valores permitidos: asc, desc.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortOrder",
      "message": "El orden debe ser asc o desc"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "idGrade": 15,
      "level": 0
    },
    ...,
    {
      "idGrade": 31,
      "level": 8
    },
    {
      "idGrade": 32,
      "level": 9
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>LISTAR GRADO POR ID</summary>
  
### GET /grade/:id

Obtiene la información de un grado específico mediante su ID. Requiere autenticación y permisos de administrador o auxiliar.

### Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                              |
| :-------- | :----- | :------- | :----------------------------------------------------------------------- |
| id        | number | Sí       | ID del grado que se desea consultar. Debe ser un número entero positivo. |

### Example Request

- GET /grade/1

### Validations

- id: requerido, debe ser un número entero.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID debe ser un número entero"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado encontrado",
  "grade": {
    "idGrade": 19,
    "level": 2
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>ACTUALIZAR INFORMACIÓN DE UN GRADO</summary>
  
### PUT /grade/:id

Actualiza la información de un grado existente mediante su ID. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                               |
| :-------- | :----- | :------- | :------------------------------------------------------------------------ |
| id        | number | Sí       | ID del grado que se desea actualizar. Debe ser un número entero positivo. |

### Body

```json
{
  "level": 5
}
```

### Example Request

- PUT /grade/1
- Body

```json
{
  "level": 5
}
```

### Validations

- id: requerido, debe ser un número entero.
- level: requerido, debe ser un número entero.
- level: no puede ser negativo.
- level: no puede ser mayor a 15.
- No se permiten campos adicionales.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "level",
      "message": "El grado no puede ser mayor a 15"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado actualizado correctamente",
  "grade": {
    "idGrade": 19,
    "level": 15
  }
}
```

### Duplicate Grade Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "level",
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>

<details>
<summary>ELIMINAR GRADO POR ID</summary>
  
### DELETE /grade/:id

Elimina un grado existente del sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------- |
| id        | number | Sí       | ID del grado que se desea eliminar. Debe ser un número entero positivo. |

### Example Request

- DELETE /grade/3

### Validations

- id: requerido, número entero positivo.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID debe ser un número entero"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado eliminado correctamente",
  "grade": {
    "idGrade": 21,
    "level": 3
  }
}
```

### Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>
