# ELIMINAR CATÁLOGO DE INCIDENTE POR ID

## DELETE /incident-catalog/:id

- Elimina un catálogo de incidente del sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                         |
| --------- | ------ | -------- | --------------------------------------------------- |
| id        | number | Sí       | ID del catálogo de incidente que se desea eliminar. |

## Example Request

- DELETE /incident-catalog/1

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
      "message": "El ID de incidentCatalog debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Catálogo de incidente eliminado correctamente",
  "incidentCatalog": {
    "idIncidentCatalog": 8,
    "name": "PELEA CON PROFESOR",
    "description": "Pelea física con un profesor o personal de la institución.",
    "type": "LEVE",
    "pointsDeducted": 1
  }
}
```

## Undeletable Response

```json
{
  "success": false,
  "message": "No se puede eliminar el registro",
  "errors": [
    {
      "field": [],
      "message": "Existen registros relacionados que dependen de este registro"
    }
  ]
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
