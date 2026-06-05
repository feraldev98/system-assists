<details>
<summary>CREAR NUEVO GRADO</summary>
  
### POST /grade

Crea un nuevo grado en el sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### body

```json
{
  "level": 1
}
```

### Example Request

- POST /user

- BODY:

```json
{
  "level": 1
}
```

### Validations

- level: requerido, número entero.
- level: no puede ser negativo.
- No se permiten campos adicionales.

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "level",
      "message": "El grado debe ser un número entero"
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "message": "Grado creado correctamente",
  "grade": {
    "idGrade": 37,
    "level": 14
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
