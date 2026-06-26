# OBTENER INCIDENTE POR ID

## GET /incident/:id

- Obtiene la información de un incidente mediante su ID.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## URL Params

| URL Param | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| id        | number | Sí       | ID del incidente que se desea consultar. |

## Example Request

- GET /incident/1

---

## Validations

- id: requerido.
- id: debe ser un número entero positivo.

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
  "message": "Incidente encontrado",
  "data": {
    "date": "2026-05-19T00:00:00.000Z",
    "idIncident": 2,
    "note": "Incidencia registrada durante seed.",
    "incidentCatalog": {
      "idIncidentCatalog": 2,
      "name": "Tardanza reiterada",
      "description": "Llegar tarde al aula en más de una ocasión en la semana.",
      "type": "LEVE",
      "pointsDeducted": 3
    },
    "student": {
      "idStudent": 61,
      "firstname": "Paola",
      "lastname": "Jiménez Vargas",
      "email": "paola.jimenez60@school.edu.pe",
      "phone": "949142422",
      "status": "ACTIVO",
      "studentParents": [
        {
          "relationship": "OTRO",
          "parent": {
            "idUser": 13,
            "firstname": "José",
            "lastname": "Rivera",
            "email": "jose.rivera@school.edu.pe",
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
