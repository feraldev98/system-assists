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

## Response

```json
{
  "success": true,
  "message": "Aula eliminada correctamente",
  "classroom": {
    "idClassroom": 12,
    "year": 2021,
    "section": {
      "name": "A",
      "grade": {
        "level": 1
      }
    }
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
