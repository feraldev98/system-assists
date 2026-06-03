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

### Auth

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

### Response:

```json
{
  "message": "Bienvenido Fernando Pérez",
  "email": "testing@hotmail.com",
  "firstname": "Fernando",
  "lastname": "Pérez",
  "role": "AUXILIAR"
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

### User

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

### Response:

```json
{
  "idUser": 1,
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "testing@hotmail.com",
  "phone": "+51985988977",
  "role": "AUXILIAR",
  "createdAt": "2026-06-01T15:00:00.000Z",
  "updatedAt": "2026-06-01T15:00:00.000Z"
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
  "data": [
    {
      "idUser": 1,
      "firstname": "Admin",
      "lastname": "System",
      "email": "admin@system.com",
      "phone": null,
      "role": "ADMIN",
      "createdAt": "2026-06-01T16:14:50.528Z",
      "updatedAt": "2026-06-01T16:14:50.528Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
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
  "message": "Datos actualizados correctamente",
  "user": {
    "idUser": 1,
    "firstname": "Fernando",
    "lastname": "Pérez",
    "email": "fernando@hotmail.com",
    "phone": "+51999888777",
    "role": "AUXILIAR",
    "createdAt": "2026-06-01T16:14:50.528Z",
    "updatedAt": "2026-06-02T10:30:00.000Z"
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
  "message": "Usuario encontrado",
  "user": {
    "idUser": 1,
    "firstname": "Fernando",
    "lastname": "Pérez",
    "email": "fernando@hotmail.com",
    "phone": "+51985988977",
    "role": "AUXILIAR",
    "createdAt": "2026-06-01T16:14:50.528Z",
    "updatedAt": "2026-06-02T10:30:00.000Z"
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
  "message": "Usuario eliminado correctamente",
  "user": {
    "idUser": 1,
    "firstname": "Fernando",
    "lastname": "Pérez",
    "email": "fernando@hotmail.com",
    "role": "AUXILIAR",
    "createdAt": "2026-06-01T16:14:50.528Z"
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
