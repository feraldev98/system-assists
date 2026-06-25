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
      "message": "El ID del estudiante es requerido"
    },
    {
      "field": "idStudent",
      "message": "El ID del estudiante debe ser un número entero"
    },
    {
      "field": "idParent",
      "message": "El ID del padre es requerido"
    },
    {
      "field": "idParent",
      "message": "El ID del padre debe ser un número entero"
    }
  ]
}
```

## Success Response:

```json
{
  "success": true,
  "message": "Relación familiar creada correctamente",
  "parent": {
    "idStudentParent": 200,
    "relationship": "APODERADO",
    "parent": {
      "idUser": 21,
      "firstname": "Daniel",
      "lastname": "Castro",
      "email": "daniel.castro@school.edu.pe",
      "phone": null
    },
    "student": {
      "idStudent": 1,
      "firstname": "Alejandro",
      "lastname": "Herrera Ortiz",
      "phone": "989285616",
      "email": null,
      "dni": "58770185",
      "status": "ACTIVO"
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
      "field": ["idStudent", "idParent"],
      "message": "Ya existe un registro con este valor"
    }
  ]
}
```

## ID not found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "idIncidentCatalog",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

## No Parent Role Response

```json
{
  "success": false,
  "message": "El usuario no es un padre",
  "errors": {
    "field": "idParent",
    "message": "El usuario no es un padre"
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
