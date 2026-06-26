# CREAR NUEVA RELACION ENTRE SALÓN DE CLASE Y ESTUDIANTE

## POST /classroom-student

- Crea un nuevo usuario en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- idClassroom: ID del salón de clase.
- idStudent: ID del estudiante.

## Example Request

- POST /classroom-student
- BODY:

```json
{
  "idClassroom": 1,
  "idStudent": 5
}
```

## Validations:

- idClassroom: requerido, debe ser un número entero positivo.
- idStudent: requerido, debe ser un número entero positivo.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "idClassroom",
      "message": "El ID del salon de clase debe ser un número entero"
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
  "message": "Estudiante asignado correctamente",
  "classroomStudent": {
    "idClassroomStudent": 127,
    "idClassroom": 5,
    "year": 2025,
    "grade": 1,
    "section": "C",
    "student": {
      "idStudent": 15,
      "firstname": "Patricia",
      "lastname": "Reyes Pérez",
      "dni": "69230782",
      "gender": "F",
      "phone": "964254732",
      "email": "patricia.reyes14@school.edu.pe",
      "status": "SUSPENDIDO"
    }
  }
}
```

## Duplicate Classroom Student Response

```json
{
  "success": false,
  "message": "Registro duplicado",
  "errors": [
    {
      "field": ["idClassroom", "idStudent"],
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
