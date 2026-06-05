# LISTAR TODOS LOS GRADOS

## GET /grade

- Obtiene una lista paginada de grados registrados en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                      |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 10. Default: 10.               |
| search    | string | No       | Busca un grado específico por nivel.                                                |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc. |

## Example Request

- GET /grade
- GET /grade?page=1&limit=10
- GET /grade?page=1&limit=10&sortOrder=desc
- GET /grade?page=1&limit=10&search=5

## Response

```json
{
  "success": true,
  "data": [
    {
      "idGrade": 1,
      "level": 1
    },
    {
      "idGrade": 2,
      "level": 2
    },
    {
      "idGrade": 3,
      "level": 3
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "totalPages": 1
  }
}
```

## Search Behavior

El parámetro search busca coincidencias exactas sobre el campo:

- level

## Example Search Query

- GET /grade?search=3

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idGrade": 3,
      "level": 3
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## Validations

- page: opcional, número entero, mínimo 1, máximo 1000.
- limit: opcional, número entero, mínimo 1, máximo 10.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, debe representar un número entero válido.
- No se permiten parámetros adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortOrder",
      "message": "El orden debe ser asc o desc"
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
