# OBTENER ESTUDIANTES ASOCIADOS AL PADRE

## GET /parent/student

## GET /grade/:id

- Obtiene la lista de estudiantes asociados al usuario autenticado con rol **PARENT**.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol PARENT pueden acceder a este endpoint.

## Validations

- El usuario debe estar autenticado mediante un token válido.
- El usuario autenticado debe tener el rol **PARENT**.
- El usuario debe tener al menos un estudiante asociado.

## Not Found Error Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "parent",
      "message": "No existen estudiantes asociados a este usuario"
    }
  ]
}
```

## Validation Error Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

## Unauthorized Error Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

## Success Response (200)

```json
{
  "success": true,
  "message": "Estudiantes asociados",
  "data": [
    {
      "idStudent": 1,
      "firstname": "Juan",
      "lastname": "Pérez",
      "email": "juan.perez@example.com",
      "phone": "987654321",
      "status": true
    },
    {
      "idStudent": 2,
      "firstname": "María",
      "lastname": "Pérez",
      "email": "maria.perez@example.com",
      "phone": "912345678",
      "status": true
    }
  ]
}
```
