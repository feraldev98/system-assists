<details>
<summary>ACTUALIZAR INFORMACIÓN DE UN GRADO</summary>
  
### PUT /grade/:id

Actualiza la información de un grado existente mediante su ID. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### URL Params

| Parameter | Type   | Required | Description                                                               |
| :-------- | :----- | :------- | :------------------------------------------------------------------------ |
| id        | number | Sí       | ID del grado que se desea actualizar. Debe ser un número entero positivo. |

### Body

```json
{
  "level": 5
}
```

### Example Request

- PUT /grade/1
- Body

```json
{
  "level": 5
}
```

### Validations

- id: requerido, debe ser un número entero.
- level: requerido, debe ser un número entero.
- level: no puede ser negativo.
- level: no puede ser mayor a 15.
- No se permiten campos adicionales.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "level",
      "message": "El grado no puede ser mayor a 15"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado actualizado correctamente",
  "grade": {
    "idGrade": 19,
    "level": 15
  }
}
```

### Duplicate Grade Response

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
