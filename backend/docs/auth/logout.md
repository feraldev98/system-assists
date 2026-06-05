# CERRAR SESIÓN

## POST /logout

- Cierra la sesión del usuario autenticado.
- Elimina la cookie HTTPOnly token que contiene el JWT de autenticación.
- Requiere autenticación.

## Authentication

- Solo usuarios autenticados pueden acceder a este endpoint.

## Example Request

- POST /logout

## Validations:

- cookie: si no existe token, el servidor responderá con error de autorización.

## Validations Error Response:

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Sesión cerrada correctamente"
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
