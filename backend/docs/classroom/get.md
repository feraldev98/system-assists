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

## Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroom": 14,
      "year": 1998,
      "section": {
        "name": "A",
        "grade": {
          "level": 3
        }
      }
    },
    {
      "idClassroom": 1,
      "year": 2020,
      "section": {
        "name": "A",
        "grade": {
          "level": 1
        }
      }
    },
    {
      "idClassroom": 3,
      "year": 2020,
      "section": {
        "name": "A",
        "grade": {
          "level": 2
        }
      }
    },
    ...
    ,
    {
      "idClassroom": 15,
      "year": 2022,
      "section": {
        "name": "A",
        "grade": {
          "level": 1
        }
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 10,
    "totalPages": 1
  }
}
```

## Search Behavior

El parámetro search busca coincidencias sobre los siguientes campos:

- idClassroom
- section.name
- section.grade.level

## Example Search Query

- GET /classroom?search=A
- GET /classroom?search=C

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroom": 6,
      "year": 2020,
      "section": {
        "name": "C",
        "grade": {
          "level": 1
        }
      }
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
