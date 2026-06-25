# ACTUALIZAR INFORMACIÓN DE UN GRADO

## PUT /grade/:id

- Actualiza la información de un grado existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| id        | number | Sí       | ID del grado que se desea actualizar. |

## Body

- level: número del grado.

## Example Request

- PUT /user/1
- BODY:

```json
{
  "level": 2
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body

- level: requerido, debe ser un número entero, mayor o igual a 0 y menor o igual a 15.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "level",
      "message": "El grado debe ser un número"
    },
    {
      "field": "level",
      "message": "El grado debe ser un número entero"
    },
    {
      "field": "level",
      "message": "El grado debe ser mayor o igual a 0"
    },
    {
      "field": "level",
      "message": "El grado no puede ser mayor a 15"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Grado actualizado correctamente",
  "grade": {
    "idGrade": 3,
    "level": 6
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
      "message": "Debes enviar al menos un campo para actualizar"
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
      "field": "id",
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
      "field": ["level"],
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
