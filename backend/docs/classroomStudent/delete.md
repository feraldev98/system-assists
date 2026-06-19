# ELIMINAR RELACIÓN ENTRE SALÓN DE CLASE Y ESTUDIANTE

## DELETE /classroomStudent/:id

- Elimina una relación entre un estudiante y un salón de clase.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| id        | number | Sí       | ID de la relación que se desea eliminar. |

## Example Request

- DELETE /classroomStudent/1

## Validations

- id: requerido.
- id: debe ser un número entero.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID del registro debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Relación estudiante salón eliminada correctamente",
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

## Not Found Response

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
