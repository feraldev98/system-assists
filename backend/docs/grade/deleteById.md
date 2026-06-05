<details>
<summary>ELIMINAR GRADO POR ID</summary>
  
### DELETE /grade/:id

Elimina un grado existente del sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                             |
| :-------- | :----- | :------- | :---------------------------------------------------------------------- |
| id        | number | Sí       | ID del grado que se desea eliminar. Debe ser un número entero positivo. |

### Example Request

- DELETE /grade/3

### Validations

- id: requerido, número entero positivo.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID debe ser un número entero"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado eliminado correctamente",
  "grade": {
    "idGrade": 21,
    "level": 3
  }
}
```

### Not Found Response

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

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>
