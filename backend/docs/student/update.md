# ACTUALIZAR INFORMACIÓN DE UN ESTUDIANTE

## PATCH /student/:id

- Actualiza uno o más campos de un estudiante existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                |
| --------- | ------ | -------- | ------------------------------------------ |
| id        | number | Sí       | ID del estudiante que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- firstname: nombre del estudiante.
- lastname: apellido del estudiante.
- gender: sexo del estudiante.
- phone: teléfono del estudiante.
- email: correo electrónico del estudiante.
- status: estado del estudiante.

## Example Request

- PATCH /student/1
- BODY:

```json
{
  "success": true,
  "message": "Estudiante actualizado correctamente",
  "student": {
    "idStudent": 11,
    "firstname": "KRAUS",
    "lastname": "KROENEN",
    "code": "8a88dca5-a51e-427e-b645-513afd75729b",
    "gender": "M",
    "phone": "+51852741962",
    "email": "qweqwe@qweqwe.com",
    "status": "ACTIVO",
    "createdAt": "2026-06-07T22:36:21.614Z",
    "updatedAt": "2026-06-07T22:42:03.210Z"
  }
}
```

## Validations

### Params

- id: requerido, número entero positivo.
- No se permiten campos adicionales.

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

## Success Response

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
      "field": "firstname",
      "message": "El nombre solo puede contener letras y espacios"
    },
    {
      "field": "lastname",
      "message": "El apellido solo puede contener letras y espacios"
    },
    {
      "field": "gender",
      "message": "El sexo debe ser (M)asculino, (F)emenino u (O)tro"
    },
    {
      "field": "phone",
      "message": "El teléfono debe tener formato +51 9XX XXX XXX"
    },
    {
      "field": "email",
      "message": "El correo no tiene un formato válido"
    },
    {
      "field": "status",
      "message": "El estado debe ser ACTIVO, INACTIVO, SUSPENDIDO, EXPULSADO, TRANSFERIDO, GRADUADO, RETIRADO"
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
      "message": "Debes enviar al menos un campo"
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
      "field": "idStudent",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "phone",
      "message": "Ya existe un registro con este valor"
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
