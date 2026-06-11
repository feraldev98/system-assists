# RELACIONAR PADRE CON ESTUDIANTE

## POST /parent

- Crea una relación entre un padre/familiar y un estudiante en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- idStudent: ID del estudiante a relacionar.
- idParent: ID del usuario padre/familiar.
- relationship: tipo de relación entre el padre y el estudiante. (OPCIONAL)

## Example Request

- POST /parent
- BODY:

```json
{
  "idStudent": 3,
  "idParent": 7,
  "relationship": "PADRE"
}
```

## Validations:

- idStudent: requerido, debe ser un número entero.
- idParent: requerido, debe ser un número entero, el usuario debe existir en el sistema, debe tener rol PARENT.
- relationship: solo puede ser PADRE, MADRE, ABUELO, ABUELA, TÍO, TÍA, APODERADO u OTRO, valor por defecto OTRO, es opcional.
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
    },
    {
      "field": "idParent",
      "message": "El ID del padre debe ser un número entero"
    },
    {
      "field": "relationship",
      "message": "La relación solo puede ser PADRE, MADRE, ABUELO, ABUELA, TÍO, TÍA, APODERADO u OTRO"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Padre relacionado correctamente",
  "parent": {
    "idStudentParent": 23,
    "idStudent": 4,
    "idParent": 4,
    "relationship": "ABUELO",
    "student": {
      "idStudent": 4,
      "firstname": "VIOLENCE",
      "lastname": "ALEX",
      "code": "c148fc88-f420-4147-ae5f-3bf84c220d86",
      "phone": null,
      "email": null,
      "gender": "M",
      "status": "ACTIVO",
      "createdAt": "2026-06-11T16:20:09.742Z",
      "updatedAt": "2026-06-11T16:20:09.742Z"
    },
    "parent": {
      "idUser": 4,
      "firstname": "JO JHNZ",
      "lastname": "KAELWWW FEREWN D",
      "email": "auxili11qar2w232@gmail.com",
      "phone": "+51985988977",
      "createdAt": "2026-06-11T16:29:06.658Z",
      "updatedAt": "2026-06-11T16:29:06.658Z"
    }
  }
}
```

## Duplicate User Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": "idStudent",
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

## ID not found Response

```json
{
  "success": false,
  "message": "El padre no existe",
  "errors": {
    "field": "idParent",
    "message": "No existe un registro con el ID proporcionado"
  }
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
