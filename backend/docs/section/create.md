# CREAR NUEVA SECCIÓN

## POST /section

- Crea una nueva sección en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- name: nombre de la sección.
- idGrade: ID del grado al que pertenece la sección.

## Example Request

- Example Request
- POST /section

```json
BODY:
{
  "name": "A",
  "idGrade": 1
}
```

## Validations:

- name: requerido, trim automático, debe contener exactamente una letra, solo letras permitidas (A-Z), convertido automáticamente a mayúsculas.
- idGrade: requerido, debe ser un número entero, debe ser mayor o igual a 0.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "name",
      "message": "El nombre de sección solo puede ser una letra"
    },
    {
      "field": "name",
      "message": "El nombre de sección solo puede contener letras"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Seccion creada correctamente",
  "section": {
    "idSection": 25,
    "idGrade": 5,
    "grade": 5,
    "section": "Z"
  }
}
```

## Duplicate Section Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "name",
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

## ID not found Response

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
