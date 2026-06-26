# LISTAR TODAS LAS ASISTENCIAS

## GET /attendance

- Obtiene una lista paginada de registros de asistencia.
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

- GET /attendance
- GET /attendance?page=1&limit=10
- GET /attendance?page=1&limit=10&sortOrder=desc
- GET /attendance?page=1&limit=10&sortBy=idAttendance
- GET /attendance?search=Juan

## Response

```json
{
  "success": true,
  "data": [
    {
      "idAttendance": 4,
      "date": "2026-06-24T00:00:00.000Z",
      "status": "TARDANZA",
      "note": null,
      "student": {
        "idStudent": 5,
        "fullname": "Pedro Huanca Ortiz",
        "firstname": "Pedro",
        "lastname": "Huanca Ortiz",
        "dni": "67771629",
        "gender": "M",
        "phone": null,
        "email": "pedro.huanca4@school.edu.pe",
        "status": "ACTIVO",
        "classroom": {
          "idClassroom": 24,
          "year": 2026,
          "grade": 3,
          "section": "D"
        }
      }
    },
    {
      "idAttendance": 6,
      "date": "2026-06-24T00:00:00.000Z",
      "status": "TARDANZA",
      "note": null,
      "student": {
        "idStudent": 6,
        "fullname": "Pedro Ccopa Huanca",
        "firstname": "Pedro",
        "lastname": "Ccopa Huanca",
        "dni": "99886067",
        "gender": "M",
        "phone": "915604307",
        "email": "pedro.ccopa5@school.edu.pe",
        "status": "ACTIVO",
        "classroom": {
          "idClassroom": 20,
          "year": 2026,
          "grade": 3,
          "section": "B"
        }
      }
    },
    {
      "idAttendance": 7,
      "date": "2026-06-24T00:00:00.000Z",
      "status": "PRESENTE",
      "note": null,
      "student": {
        "idStudent": 7,
        "fullname": "Manuel López Pérez",
        "firstname": "Manuel",
        "lastname": "López Pérez",
        "dni": "85293554",
        "gender": "M",
        "phone": "982840553",
        "email": "manuel.lopez6@school.edu.pe",
        "status": "ACTIVO",
        "classroom": {
          "idClassroom": 12,
          "year": 2026,
          "grade": 2,
          "section": "B"
        }
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

El parámetro search busca coincidencias sobre los siguientes campos:

### Campos numéricos

- idAttendance
- idStudent
- idAuxiliar

### Campos de texto

- note

### Datos del estudiante

- student.firstname
- student.lastname
- student.dni

### Datos del auxiliar

- auxiliar.firstname
- auxiliar.lastname

La búsqueda de texto no distingue entre mayúsculas y minúsculas.

## Example Search Query

- GET /attendance?search=Juan
- GET /attendance?search=Pérez
- GET /attendance?search=12345678
- GET /attendance?search=15

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idAttendance": 7,
      "date": "2026-06-24T00:00:00.000Z",
      "status": "PRESENTE",
      "note": null,
      "student": {
        "idStudent": 7,
        "fullname": "Manuel López Pérez",
        "firstname": "Manuel",
        "lastname": "López Pérez",
        "dni": "85293554",
        "gender": "M",
        "phone": "982840553",
        "email": "manuel.lopez6@school.edu.pe",
        "status": "ACTIVO",
        "classroom": {
          "idClassroom": 12,
          "year": 2026,
          "grade": 2,
          "section": "B"
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
      "message": "El campo para ordenar solo puede ser idAttendance, date, status, note, idStudent, idAuxiliar"
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
