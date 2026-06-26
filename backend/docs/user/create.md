# CREAR NUEVO USUARIO

## POST /user

- Crea un nuevo usuario en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- firstname: nombres del usuario.
- lastname: apellidos del usuario.
- email: correo electrónico del usuario.
- password: contraseña del usuario.
- repassword: confirmación de la contraseña.
- phone: número de teléfono del usuario (opcional).
- role: rol asignado al usuario.

## Example Request

- POST /user
- BODY:

```json
{
  "firstname": "Zoe",
  "lastname": "Pérez",
  "email": "testing@hotmail.com",
  "password": "1234567a",
  "repassword": "1234567a",
  "phone": "+51 985 988 977",
  "role": "AUXILIAR"
}
```

## Validations:

- firstname: requerido, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: requerido, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- email: requerido, trim automático, convertido a minúsculas, formato válido de email.
- password: requerida, trim automático, mínimo 8 caracteres, máximo 32 caracteres, al menos una letra y un número.
- repassword: requerida, trim automático, debe coincidir con password.
- phone: opcional, trim automático, elimina espacios automáticamente, formato +519XXXXXXXX.
- role: requerido, valores permitidos: ADMIN, AUXILIAR o PARENT.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "firstname",
      "message": "El nombre es requerido"
    },
    {
      "field": "firstname",
      "message": "El nombre debe tener mínimo 2 caracteres"
    },
    {
      "field": "firstname",
      "message": "El nombre solo puede contener letras y espacios"
    },
    {
      "field": "email",
      "message": "El correo no tiene un formato válido"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Usuario creado correctamente",
  "user": {
    "user": {
      "idUser": 21,
      "firstname": "qwe Jhnz",
      "lastname": "Kael Fern d",
      "email": "auxili1ar2@wgmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-05T19:25:12.454Z",
      "updatedAt": "2026-06-05T19:25:12.454Z"
    }
  }
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["email"],
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

## Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

- [Volver al inicio](../../README.md)
