# LISTAR TODOS LOS SALONES DE CLASE

## GET /classroom

- Obtiene una lista paginada de salones de clase registrados en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                      |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.               |
| search    | string | No       | Busca por ID del salón, nombre de la sección o nivel del grado asociado.            |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc. |
| sortBy    | string | No       | Campo de ordenamiento. Valores permitidos: year, idSection. Default: year.          |

## Example Request

- GET /classroom
- GET /classroom?page=1&limit=10
- GET /classroom?page=1&limit=10&sortOrder=desc
- GET /classroom?page=1&limit=10&sortBy=year

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroom": 49,
      "year": 2002,
      "grade": 2,
      "section": "A"
    },
    {
      "idClassroom": 21,
      "year": 2025,
      "grade": 3,
      "section": "C"
    },
    {
      "idClassroom": 9,
      "year": 2025,
      "grade": 2,
      "section": "A"
    },
    {
      "idClassroom": 3,
      "year": 2025,
      "grade": 1,
      "section": "B"
    },
    {
      "idClassroom": 7,
      "year": 2025,
      "grade": 1,
      "section": "D"
    },
    {
      "idClassroom": 19,
      "year": 2025,
      "grade": 3,
      "section": "B"
    },
    {
      "idClassroom": 13,
      "year": 2025,
      "grade": 2,
      "section": "C"
    },
    {
      "idClassroom": 5,
      "year": 2025,
      "grade": 1,
      "section": "C"
    },
    {
      "idClassroom": 11,
      "year": 2025,
      "grade": 2,
      "section": "B"
    },
    {
      "idClassroom": 17,
      "year": 2025,
      "grade": 3,
      "section": "A"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "totalPages": 5
  }
}
```

## Search Behavior

El parámetro search busca coincidencias sobre los siguientes campos:

- idClassroom
- section.name
- section.grade.level

## Example Search Query

- GET /classroom?search=3

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroom": 3,
      "year": 2025,
      "grade": 1,
      "section": "B"
    },
    {
      "idClassroom": 17,
      "year": 2025,
      "grade": 3,
      "section": "A"
    },
    {
      "idClassroom": 19,
      "year": 2025,
      "grade": 3,
      "section": "B"
    },
    {
      "idClassroom": 21,
      "year": 2025,
      "grade": 3,
      "section": "C"
    },
    {
      "idClassroom": 23,
      "year": 2025,
      "grade": 3,
      "section": "D"
    },
    {
      "idClassroom": 18,
      "year": 2026,
      "grade": 3,
      "section": "A"
    },
    {
      "idClassroom": 20,
      "year": 2026,
      "grade": 3,
      "section": "B"
    },
    {
      "idClassroom": 22,
      "year": 2026,
      "grade": 3,
      "section": "C"
    },
    {
      "idClassroom": 24,
      "year": 2026,
      "grade": 3,
      "section": "D"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 9,
    "totalPages": 1
  }
}
```

## Validations

- id: opcional, debe ser un UUID válido.
- page: opcional, número entero, mínimo 1, máximo 1000.
- limit: opcional, número entero, mínimo 1, máximo 50.
- sortBy: opcional, debe ser uno de los campos permitidos para ordenamiento.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, texto de búsqueda.
- No se permiten parámetros adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortBy",
      "message": "El campo para ordenar solo puede ser name, idGrade, idSection"
    },
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
