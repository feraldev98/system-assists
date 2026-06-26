# LISTAR RELACIÓN FAMILIAR POR ID

## GET /parent/:id

- Obtiene la información de una relación padre-estudiante mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                     |
| --------- | ------ | -------- | ----------------------------------------------- |
| id        | number | Sí       | ID de la relación familiar que se desea buscar. |

## Example Request

- GET /parent/1

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
      "message": "El ID de la sección debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Relación familiar encontrada",
  "data": {
    "idStudentParent": 25,
    "relationship": "TÍO",
    "parent": {
      "idUser": 33,
      "firstname": "Ricardo",
      "lastname": "Condori",
      "email": "ricardo.condori@school.edu.pe",
      "phone": null
    },
    "student": {
      "idStudent": 15,
      "firstname": "Patricia",
      "lastname": "Reyes Pérez",
      "phone": "964254732",
      "email": "patricia.reyes14@school.edu.pe",
      "dni": "69230782",
      "status": "SUSPENDIDO"
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
      "field": "idParent",
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
