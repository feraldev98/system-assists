# LISTAR USUARIO POR ID

## GET /user/:id

- Obtiene la información de un usuario del sistema mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| id        | number | Sí       | ID del usuario que se desea buscar. |

## Example Request

GET /user/1

## Validations

- id: requerido.
- id: debe ser un número entero.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID del usuario debe ser un número entero"
    }
  ]
}
```

## Response

```json
{
  "success": true,
  "message": "Usuario encontrado",
  "user": {
    "idUser": 1,
    "firstname": "Admin",
    "lastname": "System",
    "email": "admin@system.com",
    "phone": null,
    "role": "ADMIN",
    "createdAt": "2026-06-05T15:30:58.531Z",
    "updatedAt": "2026-06-05T15:30:58.531Z"
  }
}
```

## Not Found Response

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
