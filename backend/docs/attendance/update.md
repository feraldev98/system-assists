# ACTUALIZAR INFORMACIÓN DE UNA ASISTENCIA

## PATCH /attendance/:id

- Actualiza la información de un registro de asistencia.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                  |
| --------- | ------ | -------- | -------------------------------------------- |
| id        | number | Sí       | ID de la asistencia que se desea actualizar. |

## Body

- status: estado de asistencia.
- note: observación de la asistencia.

## Example Request

- PATCH /attendance/1
- BODY:

```json
{
  "status": "TARDANZA",
  "note": "Ingresó 15 minutos tarde"
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- status: opcional, debe ser uno de los estados válidos de asistencia.
- note: opcional, debe contener entre 5 y 100 caracteres alfanuméricos.
- No se permiten campos adicionales.
- Debe enviar al menos un campo para actualizar.

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

## Success Response

```json
{
  "success": true,
  "message": "Asistencia actualizada correctamente",
  "attendance": {
    "idAttendance": 4,
    "date": "2026-06-24T00:00:00.000Z",
    "status": "TARDANZA",
    "note": "5 min tarde",
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
    "updatedAt": "2026-06-24T22:27:31.063Z",
    "classroom": {
      "idClassroomStudent": 75,
      "grade": 3,
      "section": "D"
    }
  }
}
```

## Empty Body Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "body",
      "message": "Debes enviar al menos un campo"
    }
  ]
}
```

## Not Found User Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
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
