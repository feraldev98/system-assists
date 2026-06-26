# OBTENER CATÁLOGO DE INCIDENTE POR ID

## GET /incident-catalog/:id

- Obtiene la información de un catálogo de incidente mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                          |
| --------- | ------ | -------- | ---------------------------------------------------- |
| id        | number | Sí       | ID del catálogo de incidente que se desea consultar. |

## Example Request

- GET /incident-catalog/1

## Validations

- id: requerido.
- id: debe ser un número entero positivo.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID de incidentCatalog debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Catálogo de incidente encontrado",
  "data": {
    "idIncidentCatalog": 1,
    "name": "Falta de respeto verbal",
    "description": "Insultos o palabras ofensivas hacia compañeros o personal.",
    "type": "LEVE",
    "pointsDeducted": 5
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
      "field": "idIncidentCatalog",
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
