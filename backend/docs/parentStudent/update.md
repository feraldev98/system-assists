# ACTUALIZAR RELACIÓN FAMILIAR

## PATCH /parent/:id

- Actualiza la información de una relación estudiante-padre existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                                      |
| --------- | ------ | -------- | ------------------------------------------------ |
| id        | number | Sí       | ID de la relación familiar que se desea actualizar. |

## Body

Todos los campos son opcionales. Se actualizarán únicamente los campos enviados.

- idStudent: ID del estudiante asociado.
- idParent: ID del padre asociado.
- relationship: tipo de relación familiar.

## Example Request

- PATCH /parent/1
- BODY:
```json
{
  "relationship": "MOTHER"
}
```

## Validations

### Params
- id: requerido, número entero positivo.
- No se permiten campos adicionales.

### Body
- idStudent: opcional, debe ser un número entero positivo.
- idParent: opcional, debe ser un número entero positivo.
- relationship: opcional, debe ser un valor válido del enum de relaciones.
- Debe enviarse al menos un campo para actualizar.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "idStudent",
      "message": "El ID del estudiante debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Relación familiar actualizada correctamente",
  "data": {
    "idStudentParent": 6,
    "relationship": "MADRE",
    "parent": {
      "idUser": 2,
      "firstname": "JO JHNZ",
      "lastname": "KAELWWW FEREWN D",
      "email": "auxili11ar2w232@gmail.com",
      "phone": "+51985988977",
      "role": "PARENT",
      "createdAt": "2026-06-10T17:23:27.244Z",
      "updatedAt": "2026-06-10T17:23:27.244Z"
    },
    "student": {
      "idStudent": 10,
      "firstname": "WILLY",
      "lastname": "WONA",
      "code": "4955aac2-2bf7-41ba-8e96-b2b09a56ead4",
      "gender": "M",
      "phone": null,
      "email": null,
      "status": "ACTIVO",
      "createdAt": "2026-06-11T22:25:02.803Z",
      "updatedAt": "2026-06-11T22:25:02.803Z"
    }
  }
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
      "field": "idStudentParent",
      "message": "No existe un registro con este ID"
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
      "field": [
        "idParent",
        "idStudent"
      ],
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
