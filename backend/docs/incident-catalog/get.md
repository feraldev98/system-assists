# LISTAR CATÁLOGO DE INCIDENCIAS

## GET /incident-catalog

- Obtiene una lista paginada de los tipos de incidencias registrados en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                                            |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                         |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                  |
| search    | string | No       | Busca coincidencias por ID del catálogo, nombre, descripción, tipo de incidencia o puntos descontados. |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                    |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idIncidentCatalog, nam                    |

## Example Request

- GET /incident-catalog
- GET /incident-catalog?page=1&limit=10
- GET /incident-catalog?page=2&limit=20&sortBy=name
- GET /incident-catalog?sortBy=pointsDeducted&sortOrder=desc
- GET /incident-catalog?search=GRAVE

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "idIncidentCatalog": 1,
      "name": "Falta de respeto verbal",
      "description": "Insultos o palabras ofensivas hacia compañeros o personal.",
      "type": "LEVE",
      "pointsDeducted": 5
    },
    ...,
    {
      "idIncidentCatalog": 8,
      "name": "PELEA CON PROFESOR",
      "description": "La agresión física hacia un profesor o miembro del personal.",
      "type": "LEVE",
      "pointsDeducted": 10
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "totalPages": 1
  }
}
```

## Search Behavior

El parámetro search busca coincidencias sobre los campos:

- idIncidentCatalog
- name
- description
- type
- pointsDeducted

## Example Search Query

- GET /incident-catalog?search=PELEA
- GET /incident-catalog?search=GRAVE
- GET /incident-catalog?search=10

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idIncidentCatalog": 4,
      "name": "Pelea o agresión física",
      "description": "Agresión física hacia otro estudiante o personal.",
      "type": "GRAVE",
      "pointsDeducted": 20
    },
    {
      "idIncidentCatalog": 8,
      "name": "PELEA CON PROFESOR",
      "description": "La agresión física hacia un profesor o miembro del personal.",
      "type": "LEVE",
      "pointsDeducted": 10
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

## Validations

- page: opcional, número entero, mínimo 1, máximo 1000.
- limit: opcional, número entero, mínimo 1, máximo 50.
- sortBy: opcional, valores permitidos: idIncidentCatalog, name, type, pointsDeducted.
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
      "message": "El campo para ordenar solo puede ser name, type, pointsDeducted"
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
