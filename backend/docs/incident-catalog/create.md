# CREAR CATEGORÍA DE INCIDENTE

## POST /incident-catalog

- Crea una nueva categoría de incidente en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- name: nombre de la categoría de incidente.
- description: descripción de la categoría de incidente.
- type: tipo de incidente.
- pointsDeducted: cantidad de puntos que se descontarán al estudiante cuando se registre este incidente.

## Example Request

- POST /incident-catalog
- BODY:

```json
{
  "name": "PELEA CON PROFESOR",
  "type": "LEVE",
  "description": "Le revento la cabeza al profesor",
  "pointsDeducted": "1"
}
```

## Validations:

- name: requerido, debe ser una cadena de texto entre 3 y 50 caracteres.
- description: requerido, debe ser una cadena de texto entre 3 y 100 caracteres.
- type: requerido, solo puede ser LEVE, GRAVE o MUY_GRAVE.
- pointsDeducted: requerido, debe ser un número entero entre 1 y 100.
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
    },
    {
      "field": "description",
      "message": "La descripción de la categoría de incidente es requerido"
    },
    {
      "field": "description",
      "message": "La descripción de la categoría de incidente debe tener mínimo 3 caracteres"
    },
    {
      "field": "type",
      "message": "El tipo de incidente es requerido"
    },
    {
      "field": "type",
      "message": "El tipo de incidente debe ser LEVE, GRAVE, MUY_GRAVE"
    },
    {
      "field": "pointsDeducted",
      "message": "Los puntos a deducir debe ser un número"
    },
    {
      "field": "pointsDeducted",
      "message": "Los puntos a deducir debe ser un número entero"
    },
    {
      "field": "pointsDeducted",
      "message": "Los puntos a deducir debe ser mayor o igual a 1"
    },
    {
      "field": "pointsDeducted",
      "message": "Los puntos a deducir no puede ser mayor a 100"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Catálogo de incidente creado correctamente",
  "incidentCatalog": {
    "idIncidentCatalog": 8,
    "name": "PELEA CON PROFESOR",
    "description": "Le revento la cabeza al profesor",
    "type": "LEVE",
    "pointsDeducted": 1
  }
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["name"],
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

## Duplicate Incident Catalog Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["name"],
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
