# LISTAR TODOS LOS ESTUDIANTES

## GET /student

- Obtiene una lista paginada de los estudiantes del sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                                                                          |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                       |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                                                |
| status    | string | No       | Filtra estudiantes por estado. Valores permitidos: ACTIVO, INACTIVO, SUSPENDIDO, EXPULSADO, TRANSFERIDO, GRADUADO, RETIRADO.         |
| search    | string | No       | Busca coincidencias por firstname, lastname, phone, email, gender o status.                                                          |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: createdAt, updatedAt, firstname, lastname, gender, phone, email, status |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                                  |

## Example Request

- GET /student
- GET /student?page=1&limit=10
- GET /student?page=1&limit=10&status=ACTIVO

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "firstname": "WEQWQ QW",
      "lastname": "VO WQEN",
      "code": "e6e54fad-8cf5-4f22-b182-a0cef743086b",
      "gender": "F",
      "phone": null,
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-07T21:52:05.758Z",
      "updatedAt": "2026-06-07T21:52:05.758Z"
    },
    {
      "firstname": "WEQWQ W QW",
      "lastname": "VO WQEN",
      "code": "cf9bfdc7-2176-4a13-9b22-d93a4088702f",
      "gender": "F",
      "phone": null,
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-07T22:14:53.095Z",
      "updatedAt": "2026-06-07T22:14:53.095Z"
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

## Search Behavior

El parámetro search realiza búsquedas insensibles a mayúsculas/minúsculas sobre los siguientes campos:

- firstname
- lastname
- phone
- email

Además realiza búsquedas exactas sobre los siguientes campos:

- status
- gender

## Example Search Query

- GET /student?search=juan

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "firstname": "Juan",
      "lastname": "Pérez",
      "code": "ST000001",
      "gender": "M",
      "phone": "+51987654321",
      "email": "juan@gmail.com",
      "status": "ACTIVE",
      "createdAt": "2026-06-07T12:00:00.000Z",
      "updatedAt": "2026-06-07T12:00:00.000Z"
    },
    {
      "firstname": "Juan",
      "lastname": "Alvarez",
      "code": "ST000002",
      "gender": "M",
      "phone": "+51927644121",
      "email": "j231@gmail.com",
      "status": "ACTIVE",
      "createdAt": "2026-06-07T12:00:00.000Z",
      "updatedAt": "2026-06-07T12:00:00.000Z"
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
- limit: opcional, número entero, mínimo 1, máximo 50.
- status: opcional, valores permitidos según studentFields.status.
- sortBy: opcional, valores permitidos según studentFields.sort.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, trim automático.
- No se permiten parámetros adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "gender",
      "message": "El sexo debe ser (M)asculino, (F)emenino u (O)tro"
    },
    {
      "field": "sortBy",
      "message": "El campo para ordenar solo puede ser firstname, lastname, gender, phone, email, status, createdAt, updatedAt"
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
