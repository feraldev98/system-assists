# CAMBIAR CONTRASEÑA

## POST /auth/change-password

- Permite al usuario autenticado cambiar su contraseña.
- Requiere autenticación mediante un token válido.
- La contraseña actual debe ser correcta y la nueva contraseña debe ser diferente de la anterior.

## Authentication

- Cualquier usuario autenticado puede acceder a este endpoint.

## Body:

- oldPassword: contraseña actual del usuario.
- password: nueva contraseña del usuario.
- repassword: confirmación de la nueva contraseña del usuario.

## Example Request

- POST /change-password
- BODY:

```json
{
  "oldPassword": "currentPassword123",
  "password": "newPassword456",
  "repassword": "newPassword456"
}
```

## Validations

- oldPassword: requerida, obligatoria, debe coincidir con la contraseña actual del usuario.
- password: requerida, obligatoria, máximo 32 caracteres, al menos una letra, al menos un número, debe ser diferente de la contraseña actual.
- repassword: requerida, obligatoria, debe coincidir con la nueva contraseña.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "password",
      "message": "La nueva contraseña es requerida"
    },
    {
      "field": "password",
      "message": "La nueva contraseña debe tener mínimo 8 caracteres"
    },
    {
      "field": "password",
      "message": "La nueva contraseña no puede contener espacios"
    },
    {
      "field": "password",
      "message": "La nueva contraseña debe contener al menos una letra"
    },
    {
      "field": "password",
      "message": "La nueva contraseña debe contener al menos un número"
    },
    {
      "field": "repassword",
      "message": "Debes confirmar la contraseña"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Contraseña actualizada correctamente",
  "user": {
    "firstname": "Admin",
    "lastname": "System",
    "email": "admin@system.com",
    "role": "ADMIN"
  }
}
```

## Bad Credentials Response

```json
{
  "success": false,
  "message": "Contraseña incorrecta",
  "errors": {
    "field": "oldPassword",
    "message": "Contraseña incorrecta"
  }
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
