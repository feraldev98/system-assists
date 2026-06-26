# CREAR NUEVO SALON DE CLASES

## POST /classroom

- Crea un nuevo salón de clases en el sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

## Body:

- year: año académico.
- idSection: id de la sección.

## Example Request

- POST /classroom
- BODY:

```json
{
  "year": "2022",
  "idSection": 1
}
```

## Validations:

- year: opcional, debe ser un número entero entre 1900 y 3000.
- idSection: opcional, debe ser un UUID válido.
- Debe enviarse al menos un campo para actualizar (year o idSection).
- No se permiten campos adicionales.
- Si se proporciona idClassroom, debe existir un registro con ese ID.
- La combinación year + idSection debe ser única.
- Si no se envía alguno de los campos, se utilizará el valor actual almacenado para validar la unicidad.
- Solo se verifica duplicidad cuando cambia year o idSection.
- Si ya existe un salón con la misma combinación de año y sección, se devolverá un error de validación.year: opcional, debe ser un número entero entre 1900 y 3000.
- idSection: opcional, debe ser un UUID válido.
- Debe enviarse al menos un campo para actualizar (year o idSection).
- No se permiten campos adicionales.
- Si se proporciona idClassroom, debe existir un registro con ese ID.
- La combinación year + idSection debe ser única.
- Si no se envía alguno de los campos, se utilizará el valor actual almacenado para validar la unicidad.
- Solo se verifica duplicidad cuando cambia year o idSection.
- Si ya existe un salón con la misma combinación de año y sección, se devolverá un error de validación.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "year",
      "message": "El año debe ser un número"
    },
    {
      "field": "year",
      "message": "El año debe ser un número entero"
    },
    {
      "field": "year",
      "message": "El año debe ser mayor o igual a 1900"
    },
    {
      "field": "year",
      "message": "El año no puede ser mayor a 3000"
    },
    {
      "field": "idSection",
      "message": "El ID de la sección es requerido"
    },
    {
      "field": "idSection",
      "message": "El ID de la sección debe ser un número entero"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Aula creada correctamente",
  "classroom": {
    "idClassroom": 49,
    "year": 2002,
    "grade": 2,
    "section": "A"
  }
}
```

## Duplicate Classroom Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["year", "idSection"],
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
