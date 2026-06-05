<details>
<summary>CERRAR SESIÓN</summary>

### POST /logout

Cierra la sesión del usuario autenticado eliminando la cookie HTTPOnly token.

### Response:

```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
}
```

### Validations:

- requiere usuario autenticado.

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

- [Volver al inicio](../../README.md)
