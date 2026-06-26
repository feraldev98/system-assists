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
  "firstname": "Juan",
  "lastname": "Pérez",
  "dni": "12345678",
  "gender": "M",
  "phone": "+51982456753",
  "email": null,
  "status": "EXPULSADO"
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
  "message": "Estudiante actualizado correctamente",
  "student": {
    "idStudent": 1,
    "firstname": "Carmen",
    "lastname": "Quispe Castro",
    "dni": "12225678",
    "gender": "F",
    "phone": "948481636",
    "email": null,
    "status": "SUSPENDIDO",
    "createdAt": "2026-06-25T05:13:49.036Z",
    "updatedAt": "2026-06-25T05:30:55.146Z"
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
