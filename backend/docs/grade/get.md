# LISTAR TODOS LOS GRADOS

## GET /grade

Obtiene una lista paginada de grados registrados en el sistema. Requiere autenticación y permisos de administrador o auxiliar.

### Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

### Query Params

| Parameter | Type   | Required | Description                                                                                  |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                               |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 100. Default: 10.                       |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idGrade, level. Default: level. |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.          |

### Example Request

- GET /grade?page=1&limit=10&sortBy=level&sortOrder=asc

### Validations

- page: opcional, número entero, mínimo 1.
- limit: opcional, número entero, mínimo 1, máximo 100.
- sortBy: opcional, valores permitidos: idGrade, level.
- sortOrder: opcional, valores permitidos: asc, desc.

### Validation Error Response

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

### Response

```json
{
  "success": true,
  "data": [
    {
      "idGrade": 15,
      "level": 0
    },
    ...,
    {
      "idGrade": 31,
      "level": 8
    },
    {
      "idGrade": 32,
      "level": 9
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>
