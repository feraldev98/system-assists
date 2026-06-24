# CREAR NUEVA ASISTENCIA

## POST /attendance

- Crea un registro de asistencia en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Body:

- status: estado de asistencia.
- note: observación de la asistencia (opcional).
- idStudent: ID del estudiante.

## Example Request

- POST /attendance
- BODY:

```json
{
  "status": "PRESENTE",
  "note": "Llegó puntual al aula",
  "idStudent": 15
}
```

## Validations:

- status: requerido, debe ser uno de los estados válidos de asistencia.
- note: opcional, debe contener entre 5 y 100 caracteres alfanuméricos.
- idStudent: requerido, debe ser un número entero válido.
- No se permiten campos adicionales.
- El estudiante debe existir.
- No se puede registrar asistencia para estudiantes con estado:
  - SUSPENDIDO
  - EXPULSADO
  - TRANSFERIDO
  - RETIRADO
  - INACTIVO
- El usuario autenticado debe tener un idAuxiliar válido.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "status",
      "message": "El estado es requerido"
    },
    {
      "field": "status",
      "message": "El estado debe ser PRESENTE, TARDANZA, JUSTIFICADA"
    },
    {
      "field": "idStudent",
      "message": "El ID del estudiante es requerido"
    },
    {
      "field": "idStudent",
      "message": "El ID del estudiante debe ser un número entero"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Asistencia creada correctamente",
  "attendance": {
    "classroom": {
      "idClassroomStudent": 75,
      "grade": 3,
      "section": "D"
    },
    "idAttendance": 3,
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
      "status": "ACTIVO"
    },
    "auxiliar": {
      "idUser": 1,
      "firstname": "Admin",
      "lastname": "System",
      "email": "admin@system.com",
      "phone": null,
      "role": "ADMIN"
    },
    "createdAt": "2026-06-24T22:02:07.992Z",
    "updatedAt": "2026-06-24T22:02:07.992Z"
  }
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "idStudent",
      "message": "Ya existe un registro con este valor"
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
