# LISTAR ESTUDIANTE POR ID

## GET /student/:id

- Obtiene la información de un estudiante mediante su ID.
- Requiere autenticación.

## Authentication

- Usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| id        | number | Sí       | ID del estudiante que se desea buscar. |

## Example Request

- GET /student/1

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
      "message": "El ID del estudiante debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Estudiante encontrado",
  "student": {
    "idStudent": 1,
    "firstname": "KRAUS",
    "lastname": "KROENEN",
    "code": "80243d3c-4fe6-43fc-9c02-41fed75539ca",
    "gender": "M",
    "phone": "+51852741963",
    "email": "admin@qwe.com",
    "status": "EXPULSADO",
    "createdAt": "2026-06-07T21:41:36.224Z",
    "updatedAt": "2026-06-07T22:36:06.461Z"
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
      "field": "idStudent",
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
