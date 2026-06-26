# CAMBIAR CONTRASEÑA DEL USUARIO AUTENTICADO

## POST /auth/change-password

Permite al usuario autenticado cambiar su contraseña.
Requiere autenticación.
Valida que la contraseña actual sea correcta.
La nueva contraseña no puede ser igual a la contraseña actual.

## Authentication:

Cualquier usuario autenticado puede acceder a este endpoint.

## Request Body

| campo       | tipo   | requerido | descripción                                    |
| :---------- | :----- | :-------- | ---------------------------------------------- |
| oldPassword | string | Sí        | Contraseña actual del usuario.                 |
| password    | string | Sí        | Nueva contraseña del usuario.                  |
| rePassword  | string | Sí        | Repetición de la nueva contraseña del usuario. |

## Request Example

- POST /auth/change-password
- BODY:

```json
{
  "oldPassword": "admin123",
  "password": "newpassword123",
  "rePassword": "newpassword123"
}
```

## Validations

### Body

- oldPassword: obligatorio, entre 8 y 32 caracteres, solo admite caracteres alfanuméricos y debe coincidir con la contraseña actual registrada en el sistema.
- password: obligatorio, entre 8 y 32 caracteres, debe cumplir las reglas de seguridad de contraseñas del sistema y ser diferente de la contraseña actual.
- rePassword: obligatorio, debe coincidir exactamente con el valor de password.
  No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "oldPassword",
      "message": "La contraseña actual es requerida"
    },
    {
      "field": "oldPassword",
      "message": "La contraseña actual debe tener mínimo 8 caracteres"
    },
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

## Success Response

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

## Empty Body Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "oldPassword",
      "message": "La contraseña actual es requerida"
    },
    {
      "field": "oldPassword",
      "message": "La contraseña actual debe tener mínimo 8 caracteres"
    },
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

## Bad Request Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "repassword",
      "message": "Las contraseñas no coinciden"
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
