# LISTAR RELACIONES PADRE-ESTUDIANTE

## GET /parent

- Obtiene una lista paginada de relaciones entre padres y estudiantes registradas en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter    | Type   | Required | Description                                                                                                                         |
| ------------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| page         | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                      |
| limit        | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                                               |
| search       | string | No       | Busca coincidencias por ID de relación, ID de estudiante, ID de padre, nombre o apellido del estudiante, nombre, apellido o email del padre. |
| sortOrder    | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                                 |
| sortBy       | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idStudentParent, relationship, student, parent. Default: parent.        |
| relationship | string | No       | Filtra por tipo de relación. Valores permitidos: PADRE, MADRE, ABUELO, ABUELA, TÍO, TÍA, APODERADO, OTRO.                          |

## Example Request

- GET /parent
- GET /parent?page=1&limit=10
- GET /parent?page=1&limit=10&sortBy=student
- GET /parent?page=1&limit=10&sortBy=parent&sortOrder=desc
- GET /parent?relationship=PADRE

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "idStudentParent": 9,
      "relationship": "ABUELO",
      "student": {
        "idStudent": 1,
        "firstname": "WEQWQ Q W QW",
        "lastname": "VO WQQWEEN",
        "code": "2a4fbdbf-abee-4432-8646-10fdda9aca9c",
        "gender": "F",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-10T17:39:30.905Z",
        "updatedAt": "2026-06-10T17:39:30.905Z"
      },
      "parent": {
        "idUser": 2,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11ar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-10T17:23:27.244Z",
        "updatedAt": "2026-06-10T17:23:27.244Z"
      }
    },
    {
      "idStudentParent": 6,
      "relationship": "APODERADO",
      "student": {
        "idStudent": 2,
        "firstname": "WEQWQWQ Q W QW",
        "lastname": "VO WQQWEEN",
        "code": "cbad1c50-1633-421a-9d12-1eef9494cccb",
        "gender": "F",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-10T17:41:18.019Z",
        "updatedAt": "2026-06-10T17:41:18.019Z"
      },
      "parent": {
        "idUser": 2,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11ar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-10T17:23:27.244Z",
        "updatedAt": "2026-06-10T17:23:27.244Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 7,
    "totalPages": 4
  }
}
```

## Search Behavior

El parámetro search busca coincidencias sobre los campos:

- idStudentParent
- idStudent
- idParent
- student.firstname
- student.lastname
- parent.firstname
- parent.lastname
- parent.email

## Example Search Query

- GET /parent?search=Delarge

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idStudentParent": 15,
      "relationship": "ABUELO",
      "student": {
        "idStudent": 5,
        "firstname": "ALEX",
        "lastname": "DELARGE",
        "code": "ea6584a3-22ac-4111-a79f-f3738ba3e447",
        "gender": "M",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-11T16:20:36.513Z",
        "updatedAt": "2026-06-11T16:20:36.513Z"
      },
      "parent": {
        "idUser": 2,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11ar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-10T17:23:27.244Z",
        "updatedAt": "2026-06-10T17:23:27.244Z"
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

- page: opcional, número entero, mínimo 1, máximo 1000.
- limit: opcional, número entero, mínimo 1, máximo 50.
- sortBy: opcional, valores permitidos: idStudentParent, relationship, student, parent.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional.
- relationship: opcional, valores permitidos: PADRE, MADRE, ABUELO, ABUELA, TÍO, TÍA, APODERADO, OTRO.
- No se permiten parámetros adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortBy",
      "message": "El campo para ordenar solo puede ser idStudentParent, student, relationship, parent"
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
