# LISTAR ASISTENCIA POR ID

## GET /attendance/:id

- Obtiene la información de una asistencia del sistema mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| id        | number | Sí       | ID de la asistencia que se desea buscar. |

## Example Request

- GET /attendance/1

## Validations

- id: requerido.
- id: debe ser un número entero.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID de attendance debe ser un número entero"
    }
  ]
}
```

## Response

```json
{
  "success": true,
  "message": "Asistencia encontrada",
  "data": {
    "idAttendance": 4,
    "date": "2026-06-24T00:00:00.000Z",
    "status": "TARDANZA",
    "note": null,
    "student": {
      "idStudent": 5,
      "firstname": "Pedro",
      "lastname": "Huanca Ortiz",
      "dni": "67771629",
      "gender": "M",
      "phone": null,
      "email": "pedro.huanca4@school.edu.pe",
      "status": "ACTIVO",
      "classroomStudents": [
        {
          "idClassroom": 24,
          "classroom": {
            "year": 2026,
            "section": {
              "name": "D",
              "grade": {
                "level": 3
              }
            }
          }
        }
      ]
    },
    "auxiliar": {
      "idUser": 1,
      "firstname": "Admin",
      "lastname": "System",
      "email": "admin@system.com",
      "phone": null,
      "role": "ADMIN"
    },
    "createdAt": "2026-06-24T22:09:33.122Z",
    "updatedAt": "2026-06-24T22:09:33.122Z",
    "classroom": {
      "idClassroomStudent": 75,
      "grade": 3,
      "section": "D"
    }
  }
}
```

## Not Found Response

```json
{
  "success": false,
  "message": "Asistencia no encontrada",
  "errors": [
    {
      "field": "idAttendance",
      "message": "No existe un registro con el ID proporcionado"
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
