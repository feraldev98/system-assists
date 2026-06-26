# ACTUALIZAR RELACIÓN ENTRE SALÓN DE CLASE Y ESTUDIANTE

## PATCH /classroom-student/:id

- Actualiza una relación existente entre un salón de clase y un estudiante.
- Permite reasignar un estudiante a otro salón o modificar los datos de la relación.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| id        | number | Sí       | ID de la relación que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- idClassroom: ID del salón de clase.
- idStudent: ID del estudiante.

## Example Request

- PATCH /classroom-student/1
- BODY:

```json
{
  "idClassroom": 2,
  "idStudent": 5
}
```

## Validations

### Params

- idClassroom: opcional, número entero positivo.
- idStudent: opcional, número entero positivo.
- No se permiten campos adicionales.

### Body

- idClassroom: opcional, número entero positivo.
- idStudent: opcional, número entero positivo.
- Debe enviarse al menos un campo para actualizar.
- No se permiten campos adicionales.

## Example Request

- PATCH /classroom-student/2
- BODY:

```json
{
  "idClassroom": 2
}
```

## Success Response

```json
{
  "success": true,
  "message": "Estudiante reasignado correctamente",
  "classroomStudent": {
    "idClassroomStudent": 2,
    "idClassroom": 2,
    "year": 2026,
    "grade": 1,
    "section": "A",
    "student": {
      "idStudent": 110,
      "firstname": "Daniel",
      "lastname": "López García",
      "dni": "49233738",
      "gender": "M",
      "phone": null,
      "email": "daniel.lopez109@school.edu.pe",
      "status": "INACTIVO"
    }
  }
}
```

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "idStudent",
      "message": "El ID del estudiante debe ser un número entero"
    }
  ]
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
      "field": "idClassroomStudent",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "idClassroom",
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
