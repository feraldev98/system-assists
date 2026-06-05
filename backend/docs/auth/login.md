# INICIAR SESIÓN

## POST /login

- Autentica un usuario mediante email y contraseña.
- Si las credenciales son válidas, el servidor genera una cookie HTTPOnly llamada token que contiene el JWT de autenticación.

## Body:

- email: correo electrónico del usuario.
- password: contraseña del usuario.

## Example Request

- POST /login
- BODY:

```json
{
  "email": "admin@system.com",
  "password": "admin123"
}
```

## Validations:

- email: requerido, convertido a minúsculas, formato válido de email, máximo 100 caracteres.
- password: requerida, obligatoria, máximo 32 caracteres, al menos una letra, al menos un número.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email es requerido"
    },
    {
      "field": "password",
      "message": "La contraseña es requerida"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Bienvenido Fernando System",
  "user": {
    "email": "admin@system.com",
    "firstname": "Admin",
    "lastname": "System",
    "role": "ADMIN"
  }
}
```

## Bad Credentials Response

```json
{
  "success": false,
  "message": "Usuario y/o contraseña incorrectos",
  "errors": {
    "message": "Usuario y/o contraseña incorrectos"
  }
}
```

- [Volver al inicio](../../README.md)
