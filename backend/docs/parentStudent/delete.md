# ELIMINAR RELACIÓN FAMILIAR POR ID

## DELETE /parent/:id

- Elimina una relación estudiante-padre del sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                      |
| --------- | ------ | -------- | ------------------------------------------------ |
| id        | number | Sí       | ID de la relación familiar que se desea eliminar. |

## Example Request

DELETE /parent/1

## Validations

- id: requerido.
- id: debe ser un número entero positivo.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID de la sección debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Relación familiar eliminada correctamente",
  "data": {
    "idStudentParent": 9,
    "relationship": "ABUELO",
    "parent": {
      "idUser": 2,
      "firstname": "JO JHNZ",
      "lastname": "KAELWWW FEREWN D",
      "email": "auxili11ar2w232@gmail.com",
      "phone": "+51985988977",
      "role": "PARENT",
      "createdAt": "2026-06-10T17:23:27.244Z",
      "updatedAt": "2026-06-10T17:23:27.244Z"
    },
    "student": {
      "idStudent": 1,
      "firstname": "WEQWQ Q W QW",
      "lastname": "VO WQQWEEN",
      "code": "2a4fbdbf-abee-4432-8646-10fdda9aca9c",
      "gender": "F",
      "phone": null,
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-10T17:39:30.905Z",
      "updatedAt": "2026-06-10T17:39:30.905Z"
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
      "field": "idSection",
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
