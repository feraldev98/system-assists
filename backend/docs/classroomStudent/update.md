# ACTUALIZAR RELACIÓN ENTRE SALÓN DE CLASE Y ESTUDIANTE

## PATCH /user/:id

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

- PATCH /classroomStudent/1
- BODY:

```json
{
  "idClassroom": 2,
  "idStudent": 5
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- idClassroom: opcional, número entero positivo.
- idStudent: opcional, número entero positivo.
- Debe enviarse al menos un campo para actualizar.
- No se permiten campos adicionales.

## Example Request

- PATCH /classroomStudent/1
- BODY:

```json
{
  "idStudent": 1
}
```

## Success Response

```json
{
  "success": true,
  "message": "Estudiante reasignado correctamente",
  "classroomStudent": {
    "idClassroomStudent": 1,
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
      "idStudent": 1,
      "firstname": "MASHIDA",
      "lastname": "TV",
      "code": "07ca1fd7-3185-41c6-ba46-b96bcf3f0eae",
      "gender": "M",
      "phone": null,
      "email": null,
      "status": "ACTIVO"
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
