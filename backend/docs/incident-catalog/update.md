# ACTUALIZAR CATÁLOGO DE INCIDENTE

## PATCH /incident-catalog/:id

- Actualiza la información de un catálogo de incidente existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| id        | number | Sí       | ID del catálogo de incidente que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- name: nombre de la categoría de incidente.
- description: descripción de la categoría de incidente.
- type: tipo de incidente.
- pointsDeducted: cantidad de puntos que se descontarán.

## Example Request

- PATCH /incident-catalog/1

- BODY:

```json
{
  "pointsDeducted": 10,
  "description": "Uso de dispositivos móviles durante el desarrollo de la clase."
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- name: opcional, cadena de texto entre 3 y 50 caracteres.
- description: opcional, cadena de texto entre 3 y 100 caracteres.
- type: opcional, valores permitidos: LEVE, GRAVE, MUY_GRAVE.
- pointsDeducted: opcional, número entero entre 1 y 100.
- Debe enviarse al menos un campo para actualizar.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "name",
      "message": "El nombre de la categoría de incidente es requerido"
    },
    {
      "field": "name",
      "message": "El nombre de la categoría de incidente debe tener mínimo 3 caracteres"
    },
    {
      "field": "name",
      "message": "El nombre de la categoría de incidente solo puede contener letras y espacios"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Catálogo de incidente actualizado correctamente",
  "incidentCatalog": {
    "idIncidentCatalog": 1,
    "name": "INSULTOS",
    "description": "Insultos o palabras ofensivas hacia compañeros o personal.",
    "type": "LEVE",
    "pointsDeducted": 5
  }
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
