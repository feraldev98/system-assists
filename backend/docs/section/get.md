# LISTAR TODAS LAS SECCIONES

## GET /section

- Obtiene una lista paginada de secciones registradas en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                                                   |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                         |
| search    | string | No       | Busca coincidencias por nombre de sección, ID de sección, ID de grado o nivel del grado relacionado.          |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                           |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idSection, name, idGrade, grade. Default: grade. |

## Example Request

- GET /section
- GET /section?page=1&limit=10
- GET /section?page=1&limit=10&sortBy=name
- GET /section?page=1&limit=10&sortBy=grade&sortOrder=desc

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "idSection": 4,
      "idGrade": 1,
      "grade": 1,
      "section": "D"
    },
    ...,
    {
      "idSection": 9,
      "idGrade": 3,
      "grade": 3,
      "section": "A"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## Search Behavior

El parámetro search busca coincidencias exactas sobre el campo:

- idSection
- name
- idGrade
- grade.level

## Example Search Query

- GET /section?search=C

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idSection": 3,
      "idGrade": 1,
      "grade": 1,
      "section": "C"
    },
    ...,
    {
      "idSection": 23,
      "idGrade": 6,
      "grade": 6,
      "section": "C"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 6,
    "totalPages": 1
  }
}
```

## Validations

- page: opcional, número entero, mínimo 1, máximo 1000.
- limit: opcional, número entero, mínimo 1, máximo 50.
- sortBy: opcional, valores permitidos: idSection, name, idGrade, grade.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional.
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
