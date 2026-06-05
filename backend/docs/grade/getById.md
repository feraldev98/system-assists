<details>
<summary>LISTAR GRADO POR ID</summary>
  
### GET /grade/:id

Obtiene la información de un grado específico mediante su ID. Requiere autenticación y permisos de administrador o auxiliar.

### Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                              |
| :-------- | :----- | :------- | :----------------------------------------------------------------------- |
| id        | number | Sí       | ID del grado que se desea consultar. Debe ser un número entero positivo. |

### Example Request

- GET /grade/1

### Validations

- id: requerido, debe ser un número entero.

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
  "message": "Grado encontrado",
  "grade": {
    "idGrade": 19,
    "level": 2
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
