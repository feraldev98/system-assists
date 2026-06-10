# ELIMINAR GRADO POR ID

## DELETE /grade/:id

- Elimina un grado registrado en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| Parameter | Type   | Required | Description                         |
| :-------- | :----- | :------- | :---------------------------------- |
| id        | number | Sí       | ID del grado que se desea eliminar. |

## Example Request

- DELETE /grade/3

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
      "message": "El ID del grado debe ser un número entero"
    }
  ]
}
```

## Response

```json
{
  "success": true,
  "message": "Grado eliminado correctamente",
  "grade": {
    "idGrade": 1,
    "level": 1
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
      "field": "id",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

## Undeleteable Response

```json
{
  "success": false,
  "message": "No se puede eliminar el registro",
  "errors": [
    {
      "field": "id",
      "message": "Existen registros relacionados que dependen de este registro"
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
