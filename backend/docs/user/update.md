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
