# ACTUALIZAR INFORMACIÓN DE UN USUARIO

## PATCH /user/:id

- Actualiza uno o más campos de un usuario existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| id        | number | Sí       | ID del usuario que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- firstname: nombre del usuario.
- lastname: apellido del usuario.
- email: correo electrónico del usuario.
- phone: teléfono del usuario.
- role: rol del usuario.
- password: nueva contraseña.
- repassword: confirmación de la nueva contraseña.

## Example Request

- PATCH /user/1
- BODY:

```json
{
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "fernando@hotmail.com",
  "phone": "+51 985 988 977",
  "role": "AUXILIAR",
  "password": "nuevo1234",
  "repassword": "nuevo1234"
}
```

## Validations

### Params

- id: requerido, número entero positivo.

### Body

- firstname: opcional, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: opcional, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- email: opcional, trim automático, convertido a minúsculas, formato válido de correo electrónico.
- phone: opcional, trim automático, elimina espacios automáticamente, formato +519XXXXXXXX.
- role: opcional, valores permitidos: ADMIN, AUXILIAR, PARENT.
- password: opcional, mínimo 8 caracteres, máximo 32 caracteres, al menos una letra y un número.
- repassword: opcional, requerida si se envía password.
  password y repassword deben coincidir.
- Debe enviarse al menos un campo para actualizar.
- No se permiten campos adicionales.

## Example Request

- PATCH /user/1
- BODY:

```json
{
  "firstname": "Fernando",
  "phone": "+51 999 888 777"
}
```

## Response

```json
{
  "success": true,
  "message": "Datos actualizados correctamente",
  "user": {
    "idUser": 9,
    "firstname": "Fernando",
    "lastname": "Von",
    "email": "auxiliar212@gmail.com",
    "phone": "+51999888777",
    "role": "AUXILIAR",
    "createdAt": "2026-06-05T19:12:52.040Z",
    "updatedAt": "2026-06-05T20:19:21.119Z"
  }
}
```

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email no tiene un formato válido"
    },
    {
      "field": "repassword",
      "message": "Las contraseñas no coinciden"
    }
  ]
}
```

## Empty Body Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "body",
      "message": "Debes enviar al menos un campo para actualizar"
    }
  ]
}
```

## Not Found User Response

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
