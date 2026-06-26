# OBTENER INCIDENTES DE UN ESTUDIANTE

## GET /student/:id/incidents

- Obtiene el listado de incidentes registrados para un estudiante.
- Requiere autenticación.

## Authentication

- Usuarios con rol **ADMIN** y **AUXILIAR** pueden consultar los incidentes de cualquier estudiante.
- Usuarios con rol **PARENT** solo pueden consultar los incidentes de los estudiantes con los que tienen una relación registrada.

## URL Params

| URL Param | Type   | Required | Description        |
| --------- | ------ | -------- | ------------------ |
| id        | number | Sí       | ID del estudiante. |

## Validations

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

## Response

### Success (200)

```json
{
  "success": true,
  "message": "Incidentes del estudiante",
  "data": {
    "student": {
      "idStudent": 6,
      "firstname": "Alejandro",
      "lastname": "Jiménez Ccopa",
      "dni": "52098023",
      "gender": "M",
      "phone": "926672329",
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-26T16:02:04.233Z",
      "updatedAt": "2026-06-26T16:02:04.233Z"
    },
    "parent": {
      "idUser": 1,
      "firstname": "Admin",
      "lastname": "System",
      "email": "admin@system.com",
      "phone": null,
      "role": "ADMIN",
      "createdAt": "2026-06-26T16:01:45.113Z",
      "updatedAt": "2026-06-26T16:01:45.113Z"
    },
    "incidents": [
      {
        "date": "2026-05-15T00:00:00.000Z",
        "idIncident": 1,
        "note": "Se realizó llamado de atención formal.",
        "incidentCatalog": {
          "idIncidentCatalog": 6,
          "name": "Agresión verbal",
          "description": "El estudiante insultó o amenazó verbalmente a un compañero o docente.",
          "type": "GRAVE",
          "pointsDeducted": 8
        },
        "student": {
          "idStudent": 6,
          "firstname": "Alejandro",
          "lastname": "Jiménez Ccopa",
          "email": null,
          "phone": "926672329",
          "status": "ACTIVO",
          "studentParents": [
            {
              "relationship": "ABUELA",
              "parent": {
                "idUser": 47,
                "firstname": "Miguel",
                "lastname": "Paredes",
                "email": "miguel.paredes@school.edu.pe",
                "phone": null
              }
            }
          ]
        }
      },
      {
        "date": "2026-05-07T00:00:00.000Z",
        "idIncident": 2,
        "note": "Se realizó llamado de atención formal.",
        "incidentCatalog": {
          "idIncidentCatalog": 9,
          "name": "Falsificación de firma",
          "description": "El estudiante falsificó la firma de un apoderado en documentos escolares.",
          "type": "GRAVE",
          "pointsDeducted": 10
        },
        "student": {
          "idStudent": 6,
          "firstname": "Alejandro",
          "lastname": "Jiménez Ccopa",
          "email": null,
          "phone": "926672329",
          "status": "ACTIVO",
          "studentParents": [
            {
              "relationship": "ABUELA",
              "parent": {
                "idUser": 47,
                "firstname": "Miguel",
                "lastname": "Paredes",
                "email": "miguel.paredes@school.edu.pe",
                "phone": null
              }
            }
          ]
        }
      }
    ]
  }
}
```

## Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

### 403 Forbidden

Cuando un padre intenta consultar los incidentes de un estudiante con el que no tiene relación.

```json
{
  "success": false,
  "message": "Acceso denegado",
  "errors": [
    {
      "field": "idStudent",
      "message": "No tiene acceso a los incidentes de este estudiante"
    }
  ]
}
```

### 404 Not Found

Cuando el usuario autenticado no existe.

```json
{
  "success": false,
  "message": "Acceso denegado",
  "errors": [
    {
      "field": "idStudent",
      "message": "No tiene acceso a los incidentes de este estudiante"
    }
  ]
}
```
