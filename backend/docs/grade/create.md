# CREAR NUEVO USUARIO

## POST /user

- Crea un nuevo grado en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- level: nivel del grado.

## Example Request

- POST /grade
- BODY:

```json
{
  "level": 1
}
```

## Validations:

- level: requerido.
- level: debe ser un número.
- level: debe ser un número entero.
- level: debe ser mayor o igual a 0.
- level: no puede ser mayor a 15.
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

## Success Response:

```json
{
  "success": true,
  "message": "Grado creado correctamente",
  "grade": {
    "idGrade": 5,
    "level": 12
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
      "field": "level",
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
