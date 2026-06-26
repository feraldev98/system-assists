# LISTAR INCIDENTES

## GET /incident

- Obtiene una lista paginada de los incidentes registrados en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Query Params

| Parameter | Type   | Required | Description                                                                                |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------ |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                             |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 50. Default: 10.                      |
| search    | string | No       | Búsqueda general sobre varios campos del incidente.                                        |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.        |
| sortBy    | string | No       | Campo por el cual ordenar resultados. Default: idIncident. Valores permitidos: idIncident. |
| id        | number | No       | Filtra por ID del incidente específico.                                                    |

## Example Request

- GET /incident
- GET /incident?page=1&limit=10
- GET /incident?page=2&limit=20
- GET /incident?search=PELEA
- GET /incident?sortBy=idIncident&sortOrder=desc
- GET /incident?id=5

---

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-07-31T00:00:00.000Z",
      "idIncident": 1,
      "note": "Incidencia registrada durante seed.",
      "incidentCatalog": {
        "idIncidentCatalog": 6,
        "name": "Acoso escolar (bullying)",
        "description": "Conducta sistemática de acoso, intimidación o exclusión.",
        "type": "MUY_GRAVE",
        "pointsDeducted": 30
      },
      "student": {
        "idStudent": 80,
        "firstname": "Carmen",
        "lastname": "Rivera Torres",
        "email": null,
        "phone": "916348871",
        "status": "ACTIVO",
        "studentParents": [
          {
            "relationship": "MADRE",
            "parent": {
              "idUser": 34,
              "firstname": "Fernando",
              "lastname": "Cárdenas",
              "email": "fernando.cardenas@school.edu.pe",
              "phone": null
            }
          },
          {
            "relationship": "APODERADO",
            "parent": {
              "idUser": 16,
              "firstname": "Roberto",
              "lastname": "Rivera",
              "email": "roberto.rivera@school.edu.pe",
              "phone": null
            }
          }
        ]
      }
    },
    ...,
    {
      "date": "2026-07-07T00:00:00.000Z",
      "idIncident": 10,
      "note": "Incidencia registrada durante seed.",
      "incidentCatalog": {
        "idIncidentCatalog": 6,
        "name": "Acoso escolar (bullying)",
        "description": "Conducta sistemática de acoso, intimidación o exclusión.",
        "type": "MUY_GRAVE",
        "pointsDeducted": 30
      },
      "student": {
        "idStudent": 21,
        "firstname": "Gabriela",
        "lastname": "Rodríguez Ortiz",
        "email": "gabriela.rodriguez20@school.edu.pe",
        "phone": null,
        "status": "ACTIVO",
        "studentParents": [
          {
            "relationship": "MADRE",
            "parent": {
              "idUser": 31,
              "firstname": "Natalia",
              "lastname": "Jiménez",
              "email": "natalia.jimenez@school.edu.pe",
              "phone": null
            }
          },
          {
            "relationship": "ABUELA",
            "parent": {
              "idUser": 15,
              "firstname": "Carlos",
              "lastname": "Soto",
              "email": "carlos.soto@school.edu.pe",
              "phone": null
            }
          }
        ]
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

---

## Search Behavior

El parámetro `search` realiza coincidencias en los siguientes campos:

### Campos numéricos

- idIncident

### Campos relacionados (relaciones)

- incidentCatalog.name
- incidentCatalog.description
- student.firstname
- student.lastname

---

## Example Search Query

- GET /incident?search=PELEA
- GET /incident?search=Juan
- GET /incident?search=5

---

## Example Search Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-09-04T00:00:00.000Z",
      "idIncident": 3,
      "note": "Incidencia registrada durante seed.",
      "incidentCatalog": {
        "idIncidentCatalog": 4,
        "name": "Pelea o agresión física",
        "description": "Agresión física hacia otro estudiante o personal.",
        "type": "GRAVE",
        "pointsDeducted": 20
      },
      "student": {
        "idStudent": 23,
        "firstname": "Juan",
        "lastname": "Torres García",
        "email": "juan.torres22@school.edu.pe",
        "phone": null,
        "status": "ACTIVO",
        "studentParents": [
          {
            "relationship": "ABUELA",
            "parent": {
              "idUser": 22,
              "firstname": "Rafael",
              "lastname": "Martínez",
              "email": "rafael.martinez@school.edu.pe",
              "phone": null
            }
          },
          {
            "relationship": "TÍO",
            "parent": {
              "idUser": 48,
              "firstname": "Elena",
              "lastname": "Morales",
              "email": "elena.morales@school.edu.pe",
              "phone": null
            }
          }
        ]
      }
    },
    {
      "date": "2026-04-17T00:00:00.000Z",
      "idIncident": 5,
      "note": "Incidencia registrada durante seed.",
      "incidentCatalog": {
        "idIncidentCatalog": 4,
        "name": "Pelea o agresión física",
        "description": "Agresión física hacia otro estudiante o personal.",
        "type": "GRAVE",
        "pointsDeducted": 20
      },
      "student": {
        "idStudent": 32,
        "firstname": "Gabriela",
        "lastname": "Soto Pérez",
        "email": null,
        "phone": null,
        "status": "ACTIVO",
        "studentParents": [
          {
            "relationship": "APODERADO",
            "parent": {
              "idUser": 13,
              "firstname": "José",
              "lastname": "Rivera",
              "email": "jose.rivera@school.edu.pe",
              "phone": null
            }
          },
          {
            "relationship": "TÍA",
            "parent": {
              "idUser": 48,
              "firstname": "Elena",
              "lastname": "Morales",
              "email": "elena.morales@school.edu.pe",
              "phone": null
            }
          }
        ]
      }
    },
    {
      "date": "2026-05-04T00:00:00.000Z",
      "idIncident": 18,
      "note": "Incidencia registrada durante seed.",
      "incidentCatalog": {
        "idIncidentCatalog": 4,
        "name": "Pelea o agresión física",
        "description": "Agresión física hacia otro estudiante o personal.",
        "type": "GRAVE",
        "pointsDeducted": 20
      },
      "student": {
        "idStudent": 9,
        "firstname": "Ricardo",
        "lastname": "Ccopa Ramos",
        "email": "ricardo.ccopa8@school.edu.pe",
        "phone": "918603932",
        "status": "ACTIVO",
        "studentParents": [
          {
            "relationship": "TÍO",
            "parent": {
              "idUser": 11,
              "firstname": "Alejandro",
              "lastname": "Medina",
              "email": "alejandro.medina@school.edu.pe",
              "phone": null
            }
          }
        ]
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

---

## Validations

- page: opcional, número entero entre 1 y 1000.
- limit: opcional, número entero entre 1 y 50.
- sortBy: opcional (default: idIncident).
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional.
- id: opcional, número entero positivo.
- No se permiten parámetros adicionales.

---

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "sortBy",
      "message": "El campo para ordenar solo puede ser date, incidentCatalog.name, incidentCatalog.description, student.firstname, student.lastname"
    }
  ]
}
```

---

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
