# OBTENER ASISTENCIAS DE UN ESTUDIANTE

## GET /student/:id/attendance

- Obtiene el listado de asistencias registradas de un estudiante.
- Requiere autenticación.

## Authentication

- Usuarios con rol **ADMIN** y **AUXILIAR** pueden consultar las asistencias de cualquier estudiante.
- Usuarios con rol **PARENT** solo pueden consultar las asistencias de los estudiantes con los que tienen una relación registrada.

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
  "message": "Asistencias del estudiante",
  "data": {
    "student": {
      "idStudent": 2,
      "firstname": "Isabella",
      "lastname": "Ramírez Huanca",
      "dni": "95135846",
      "gender": "F",
      "phone": null,
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-26T16:02:04.217Z",
      "updatedAt": "2026-06-26T16:02:04.217Z"
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
    "attendance": [
      {
        "idAttendance": 3,
        "date": "2026-06-19T00:00:00.000Z",
        "status": "PRESENTE",
        "note": null,
        "idStudent": 2,
        "idAuxiliar": 5,
        "createdAt": "2026-06-26T16:02:05.448Z",
        "updatedAt": "2026-06-26T16:02:05.448Z"
      },
      {
        "idAttendance": 4,
        "date": "2026-06-22T00:00:00.000Z",
        "status": "JUSTIFICADA",
        "note": "Presentó certificado médico.",
        "idStudent": 2,
        "idAuxiliar": 2,
        "createdAt": "2026-06-26T16:02:05.451Z",
        "updatedAt": "2026-06-26T16:02:05.451Z"
      },
      {
        "idAttendance": 5,
        "date": "2026-05-26T00:00:00.000Z",
        "status": "PRESENTE",
        "note": null,
        "idStudent": 2,
        "idAuxiliar": 7,
        "createdAt": "2026-06-26T16:02:05.454Z",
        "updatedAt": "2026-06-26T16:02:05.454Z"
      },
      {
        "idAttendance": 6,
        "date": "2026-05-29T00:00:00.000Z",
        "status": "PRESENTE",
        "note": null,
        "idStudent": 2,
        "idAuxiliar": 3,
        "createdAt": "2026-06-26T16:02:05.457Z",
        "updatedAt": "2026-06-26T16:02:05.457Z"
      }
    ]
  }
}
```

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

Cuando un padre intenta consultar las asistencias de un estudiante con el que no tiene relación.

```json
{
  "success": false,
  "message": "Acceso denegado",
  "errors": [
    {
      "field": "idStudent",
      "message": "No tiene acceso a las asistencias de este estudiante"
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
      "message": "No tiene acceso a las asistencias de este estudiante"
    }
  ]
}
```

### 404 Not Found

Cuando el estudiante no tiene asistencias registradas.

```json
{
  "success": false,
  "message": "Acceso denegado",
  "errors": [
    {
      "field": "idStudent",
      "message": "No tiene acceso a las asistencias de este estudiante"
    }
  ]
}
```
