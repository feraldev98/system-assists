# LISTAR GRADO POR ID

## GET /grade/:id

- Obtiene la información de un grado del sistema mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| id        | number | Sí       | ID del grado que se desea buscar. |

## Example Request

- GET /grade/1

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
      "message": "El ID del usuario debe ser un número entero"
    }
  ]
}
```

## Response

```json
{
  "success": true,
  "message": "Grado encontrado",
  "grade": {
    "idGrade": 3,
    "level": 2
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
