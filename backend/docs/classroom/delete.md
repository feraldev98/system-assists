# ELIMINAR SALÓN DE CLASE POR ID

## DELETE /classroom/:id

- Elimina un salón de clase registrado en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| Parameter | Type   | Required | Description                                  |
| :-------- | :----- | :------- | :------------------------------------------- |
| id        | number | Sí       | ID del salón de clase que se desea eliminar. |

## Example Request

- DELETE /classroom/3

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

## Success Response

```json
{
  "success": true,
  "message": "Salón de clase eliminado correctamente",
  "classroom": {
    "idClassroom": 15,
    "year": 2025,
    "grade": 2,
    "section": "D"
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
      "field": "idClassroom",
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
      "field": [],
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
