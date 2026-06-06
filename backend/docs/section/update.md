# ACTUALIZAR INFORMACIÓN DE UNA SECCIÓN

## PATCH /section/:id

- Actualiza la información de una sección existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| id        | number | Sí       | ID de la sección que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- name: nombre de la sección.
- idGrade: ID del grado asociado.

## Example Request

- PATCH /section/1
- BODY:

```json
{
  "name": "B"
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- name: opcional, trim automático, debe contener exactamente una letra, solo letras permitidas (A-Z), convertido automáticamente a mayúsculas.
- idGrade: opcional, debe ser un número entero, debe ser mayor o igual a 0.
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
      "message": "El nombre de sección es requerido"
    },
    {
      "field": "name",
      "message": "El nombre de sección solo puede contener letras"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Seccion actualizada correctamente",
  "section": {
    "idSection": 15,
    "name": "G",
    "grade": {
      "idGrade": 5,
      "level": 5
    }
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

## Not Found User Response

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

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "idSection",
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
