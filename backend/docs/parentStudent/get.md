# LISTAR RELACIONES PADRE-ESTUDIANTE

## GET /parent

- Obtiene una lista paginada de relaciones entre padres y estudiantes registradas en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter    | Type   | Required | Description                                                                                                                                  |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| page         | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                               |
| limit        | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                                                        |
| search       | string | No       | Busca coincidencias por ID de relación, ID de estudiante, ID de padre, nombre o apellido del estudiante, nombre, apellido o email del padre. |
| sortOrder    | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                                          |
| sortBy       | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idStudentParent, relationship, student, parent. Default: parent.                |
| relationship | string | No       | Filtra por tipo de relación. Valores permitidos: PADRE, MADRE, ABUELO, ABUELA, TÍO, TÍA, APODERADO, OTRO.                                    |

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
      "idStudentParent": 10,
      "relationship": "ABUELO",
      "parent": {
        "idUser": 2,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11ar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-10T17:23:27.244Z",
        "updatedAt": "2026-06-10T17:23:27.244Z"
      },
      "student": {
        "idStudent": 3,
        "firstname": "WVIOLENCE",
        "lastname": "VO WQQWEEN",
        "code": "4f62d579-bb5f-4144-88cf-d0e2cfbae102",
        "gender": "F",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-10T17:56:29.704Z",
        "updatedAt": "2026-06-10T17:56:29.704Z"
      }
    },
    {
      "idStudentParent": 14,
      "relationship": "TÍO",
      "parent": {
        "idUser": 2,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11ar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-10T17:23:27.244Z",
        "updatedAt": "2026-06-10T17:23:27.244Z"
      },
      "student": {
        "idStudent": 4,
        "firstname": "VIOLENCE",
        "lastname": "ALEX",
        "code": "c148fc88-f420-4147-ae5f-3bf84c220d86",
        "gender": "M",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-11T16:20:09.742Z",
        "updatedAt": "2026-06-11T16:20:09.742Z"
      }
    },
    {
      "idStudentParent": 23,
      "relationship": "ABUELO",
      "parent": {
        "idUser": 4,
        "firstname": "JO JHNZ",
        "lastname": "KAELWWW FEREWN D",
        "email": "auxili11qar2w232@gmail.com",
        "phone": "+51985988977",
        "role": "PARENT",
        "createdAt": "2026-06-11T16:29:06.658Z",
        "updatedAt": "2026-06-11T16:29:06.658Z"
      },
      "student": {
        "idStudent": 4,
        "firstname": "VIOLENCE",
        "lastname": "ALEX",
        "code": "c148fc88-f420-4147-ae5f-3bf84c220d86",
        "gender": "M",
        "phone": null,
        "email": null,
        "status": "ACTIVO",
        "createdAt": "2026-06-11T16:20:09.742Z",
        "updatedAt": "2026-06-11T16:20:09.742Z"
      }
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
      "idStudentParent": 163,
      "relationship": "MADRE",
      "parent": {
        "idUser": 28,
        "firstname": "Andrea",
        "lastname": "Ramos",
        "email": "andrea.ramos@school.edu.pe",
        "phone": null
      },
      ...
      "student": {
        "idStudent": 61,
        "firstname": "Carmen",
        "lastname": "Apaza Apaza",
        "phone": null,
        "email": "carmen.apaza60@school.edu.pe",
        "dni": "90788590",
        "status": "ACTIVO"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 200,
    "totalPages": 20
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
