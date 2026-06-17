# OBTENER RELACIÓN ENTRE SALÓN DE CLASE Y ESTUDIANTE POR ID

## GET /user/:id

- Obtiene la información de una relación entre un estudiante y un salón de clase mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR o PARENT pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| id        | number | Sí       | ID de la relación que se desea consultar. |

## Example Request

- GET /classroomStudent/1

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
  "message": "Relación estudiante salón encontrada",
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
