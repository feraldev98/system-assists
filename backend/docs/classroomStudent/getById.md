# OBTENER RELACIÓN ENTRE SALÓN DE CLASE Y ESTUDIANTE POR ID

## GET /classroom-student/:id

- Obtiene la información de una relación entre un estudiante y un salón de clase mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR o PARENT pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| id        | number | Sí       | ID de la relación que se desea consultar. |

## Example Request

- GET /classroom-student/1

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
    "idClassroom": 2,
    "year": 2026,
    "grade": 1,
    "section": "A",
    "student": {
      "idStudent": 93,
      "firstname": "Elena",
      "lastname": "Ramos Reyes",
      "dni": "38397088",
      "gender": "F",
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
