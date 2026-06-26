# OBTENER USUARIO AUTENTICADO

## GET /auth/me

- Obtiene la información del usuario actualmente autenticado.
- Requiere autenticación mediante un token válido.

## Authentication

- Solo usuarios autenticados pueden acceder a este endpoint.

## Example Request

- GET /me

## Validations:

- cookie: si no existe token, el servidor responderá con error de autorización.

## Validations Error Response:

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

## Success Response:

```json
{
  "success": true,
  "user": {
    "idUser": 1,
    "firstname": "Admin",
    "lastname": "System",
    "email": "admin@system.com",
    "phone": null,
    "role": "ADMIN",
    "createdAt": "2026-06-26T03:44:49.574Z",
    "updatedAt": "2026-06-26T03:44:49.574Z"
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
