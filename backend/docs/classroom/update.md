# ACTUALIZAR INFORMACIÓN DE UN SALÓN DE CLASE

## PATCH /classroom/:id

- Actualiza la información de un salón de clase registrado.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                    |
| --------- | ------ | -------- | ---------------------------------------------- |
| id        | number | Sí       | ID del salón de clase que se desea actualizar. |

## Body

- year: año del salón de clase.
- idSection: ID de la sección a la que pertenece el salón de clase.

## Example Request

- PATCH /classroom/1
- BODY:

```json
{
  "year": "1998",
  "idSection": "3"
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- year: opcional, número entero positivo, entre 1900 y 3000.
- idSection: opcional, número entero positivo.
- No se permiten campos adicionales.
- Debe enviar al menos un campo para actualizar.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "year",
      "message": "El año debe ser un número"
    },
    {
      "field": "year",
      "message": "El año debe ser un número entero"
    },
    {
      "field": "year",
      "message": "El año debe ser mayor o igual a 1900"
    },
    {
      "field": "year",
      "message": "El año no puede ser mayor a 3000"
    },
    {
      "field": "idSection",
      "message": "El ID de la sección debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Salón de clase actualizado correctamente",
  "classroom": {
    "idClassroom": 4,
    "year": 2026,
    "grade": 1,
    "section": "B"
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
      "field": "idClassroom",
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
      "field": ["year", "idSection"],
      "message": "Ya existe un salón con ese año y sección"
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
