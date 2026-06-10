# ELIMINAR SECCIÓN POR ID

## DELETE /user/:id

- Elimina una sección en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| id        | number | Sí       | ID de la sección que se desea eliminar. |

## Example Request

DELETE /section/1

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
      "message": "El ID de la sección debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Seccion eliminada correctamente",
  "section": {
    "idSection": 15,
    "name": "G",
    "grade": {
      "idGrade": 5,
      "level": 5
    }
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
      "field": "idSection",
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
