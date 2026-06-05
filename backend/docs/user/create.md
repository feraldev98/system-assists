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
