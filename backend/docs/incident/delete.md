# ELIMINAR INCIDENTE POR ID

## DELETE /incident/:id

- Elimina un incidente del sistema.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

---

## URL Params

| URL Param | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| id        | number | Sí       | ID del incidente que se desea eliminar |

---

## Example Request

- DELETE /incident/1

---

## Validations

- id: requerido.
- id: debe ser un número entero positivo.
- No se permiten campos adicionales.

---

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "id",
      "message": "El ID del incidente debe ser un número entero"
    }
  ]
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Incidente eliminado correctamente",
  "incident": {
    "date": "2026-10-14T00:00:00.000Z",
    "idIncident": 4,
    "note": "Incidencia registrada durante seed.",
    "incidentCatalog": {
      "idIncidentCatalog": 6,
      "name": "Acoso escolar (bullying)",
      "description": "Conducta sistemática de acoso, intimidación o exclusión.",
      "type": "MUY_GRAVE",
      "pointsDeducted": 30
    },
    "student": {
      "idStudent": 32,
      "firstname": "Gabriela",
      "lastname": "Soto Pérez",
      "email": null,
      "phone": null,
      "status": "ACTIVO",
      "studentParents": [
        {
          "relationship": "APODERADO",
          "parent": {
            "idUser": 13,
            "firstname": "José",
            "lastname": "Rivera",
            "email": "jose.rivera@school.edu.pe",
            "phone": null
          }
        },
        {
          "relationship": "TÍA",
          "parent": {
            "idUser": 48,
            "firstname": "Elena",
            "lastname": "Morales",
            "email": "elena.morales@school.edu.pe",
            "phone": null
          }
        }
      ]
    }
  }
}
```

---

## Not Found Response

```json
{
  "success": false,
  "message": "Registro no encontrado",
  "errors": [
    {
      "field": "idIncident",
      "message": "No existe un registro con el ID proporcionado"
    }
  ]
}
```

---

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

---

- [Volver al inicio](../../README.md)
