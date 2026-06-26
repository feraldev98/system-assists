# LISTAR SALÓN DE CLASE POR ID

## GET /classroom/:id

- Obtiene la información de un salón de clase del sistema mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| id        | number | Sí       | ID del salón de clase que se desea buscar. |

## Example Request

- GET /classroom/1

## Validations

- id: requerido.
- id: debe ser un número entero.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID del salon de clase debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Salón de clase encontrado",
  "classroom": {
    "idClassroom": 4,
    "year": 2026,
    "grade": 1,
    "section": "B"
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
      "field": "idClassroom",
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
