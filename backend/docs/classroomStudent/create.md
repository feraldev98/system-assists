# CREAR NUEVA RELACION ENTRE SALÓN DE CLASE Y ESTUDIANTE

## POST /classroomStudent

- Crea un nuevo usuario en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- idClassroom: ID del salón de clase.
- idStudent: ID del estudiante.

## Example Request

- POST /classroomStudent
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
    "idClassroomStudent": 4,
    "classroom": {
      "idClassroom": 1,
      "year": 2026,
      "section": {
        "grade": {
          "level": 1
        },
        "name": "A"
      }
    },
    "student": {
      "idStudent": 3,
      "firstname": "KICK",
      "lastname": "PERU",
      "code": "38eb7388-cee8-4c9e-b2aa-688f59d64960",
      "gender": "M",
      "phone": null,
      "email": null,
      "status": "ACTIVO"
    }
  }
}
```

## Duplicate User Response

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
