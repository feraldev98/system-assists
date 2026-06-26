# CREAR NUEVO ESTUDIANTE

## POST /student

- Crea un nuevo estudiante en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- firstname: nombres del estudiante.
- lastname: apellidos del estudiante.
- gender: sexo del estudiante.
- phone: número de teléfono del estudiante (opcional).
- email: correo electrónico del estudiante (opcional).
- status: estado del estudiante (opcional).

## Example Request

- POST /student
- BODY:

```json
{
  "firstname": "Juan",
  "lastname": "Pérez",
  "gender": "M",
  "phone": "+51 985 988 977",
  "email": "juan.perez@hotmail.com",
  "status": "ACTIVE"
}
```

## Validations:

- firstname: requerido, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: requerido, trim automático, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- gender: requerido, valores permitidos: M, F u O.
- phone: opcional, trim automático, elimina espacios automáticamente, formato +519XXXXXXXX.
- email: opcional, trim automático, convertido a minúsculas, formato válido de email.
- status: opcional, valores permitidos: ACTIVO, INACTIVO, SUSPENDIDO, EXPULSADO, TRANSFERIDO, GRADUADO o RETIRADO.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "firstname",
      "message": "El nombre es requerido"
    },
    {
      "field": "firstname",
      "message": "El nombre debe tener mínimo 2 caracteres"
    },
    {
      "field": "firstname",
      "message": "El nombre solo puede contener letras y espacios"
    },
    {
      "field": "lastname",
      "message": "El apellido es requerido"
    },
    {
      "field": "lastname",
      "message": "El apellido debe tener mínimo 2 caracteres"
    },
    {
      "field": "lastname",
      "message": "El apellido solo puede contener letras y espacios"
    },
    {
      "field": "gender",
      "message": "El sexo es requerido"
    },
    {
      "field": "gender",
      "message": "El sexo debe ser (M)asculino, (F)emenino u (O)tro"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Estudiante creado correctamente",
  "student": {
    "idStudent": 121,
    "firstname": "JUAN DIEGO",
    "lastname": "FLORES A",
    "dni": "12345678",
    "gender": "M",
    "phone": "+51982456753",
    "email": null,
    "status": "ACTIVO",
    "createdAt": "2026-06-25T05:19:17.702Z",
    "updatedAt": "2026-06-25T05:19:17.702Z"
  }
}
```

## Duplicate Student Response

- email
- phone
- firstname + lastname

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["firstname", "lastname"],
      "message": "El estudiante ya esta registraado con esos nombres"
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
