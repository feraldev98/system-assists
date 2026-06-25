# ELIMINAR USUARIO POR ID

## DELETE /user/:id

- Elimina un usuario en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| id        | number | Sí       | ID del usuario que se desea eliminar. |

## Example Request

DELETE /user/1

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
      "message": "El ID de usuario debe ser mayor a 0"
    }
  ]
}
```

## Success Response

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

## Undeletable Response

```json
{
  "success": false,
  "message": "No se puede eliminar el registro",
  "errors": [
    {
      "field": [],
      "message": "Existen registros relacionados que dependen de este registro"
    }
  ]
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
