# LISTAR TODAS LAS RELACIONES ENTRE SALÓN Y ESTUDIANTE

## GET /classroom-student

- Obtiene una lista paginada de relaciones entre salones de clase y estudiantes.
- Requiere autenticación.

## Authentication

- Usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter   | Type   | Required | Description                                                                                                                    |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| page        | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                 |
| limit       | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                                                          |
| idClassroom | number | No       | Id del salon de clase.                                                                                                         |
| idStudent   | number | No       | Id del estudiante.                                                                                                             |
| search      | string | No       | Busca coincidencias por nombre, apellido, año del salón o identificadores relacionados.                                        |
| sortBy      | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: idClassroomStudent, idClassroom, idStudent. Default: idClassroom. |
| sortOrder   | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                            |

## Example Request

- GET /classroom-student
- GET /classroom-student?page=1&limit=10
- GET /classroom-student?idClassroom=3
- GET /classroom-student?idStudent=5

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroomStudent": 4,
      "idClassroom": 2,
      "year": 2026,
      "grade": 1,
      "section": "A",
      "student": {
        "idStudent": 1,
        "firstname": "Alejandro",
        "lastname": "Herrera Ortiz",
        "dni": "58770185",
        "gender": "M",
        "phone": "989285616",
        "email": null,
        "status": "ACTIVO"
      }
    },
    ...
    {
      "idClassroomStudent": 8,
      "idClassroom": 4,
      "year": 2026,
      "grade": 1,
      "section": "B",
      "student": {
        "idStudent": 43,
        "firstname": "Víctor",
        "lastname": "Flores Jiménez",
        "dni": "34347104",
        "gender": "M",
        "phone": "974218868",
        "email": "victor.flores42@school.edu.pe",
        "status": "SUSPENDIDO"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 125,
    "totalPages": 13
  }
}
```

## Search Behavior

El parámetro search realiza búsquedas sobre los siguientes campos:

- Campos directos
  - idClassroomStudent
  - idClassroom
  - idStudent
- Campos del estudiante
  - firstname
  - lastname
- Campos del salón
  - year
- Campos de la sección
  - name

## Example Search Query

- GET /classroom-student?search=herrera

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "idClassroomStudent": 4,
      "idClassroom": 2,
      "year": 2026,
      "grade": 1,
      "section": "A",
      "student": {
        "idStudent": 1,
        "firstname": "Alejandro",
        "lastname": "Herrera Ortiz",
        "dni": "58770185",
        "gender": "M",
        "phone": "989285616",
        "email": null,
        "status": "ACTIVO"
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

- page: opcional, número entero, mínimo 1.
- limit: opcional, número entero, mínimo 1, máximo 50.
- idClassroom: opcional, número entero positivo.
- idStudent: opcional, número entero positivo.
- sortBy: opcional, valores permitidos: idClassroomStudent, idClassroom, idStudent.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, trim automático.

## Validation Error Response

````json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortBy",
      "message": "El campo para ordenar solo puede ser idClassroomStudent, idClassroom, idStudent"
    },
    {
      "field": "sortOrder",
      "message": "El orden debe ser asc o desc"
    }
  ]
}

## Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
````

- [Volver al inicio](../../README.md)
