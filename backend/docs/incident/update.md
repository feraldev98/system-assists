# ACTUALIZAR INCIDENTE

## PATCH /incident/:id

- Actualiza la información de un incidente existente.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

---

## URL Params

| URL Param | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| id        | number | Sí       | ID del incidente a actualizar. |

---

## Body

Todos los campos son opcionales. Solo se actualizarán los campos enviados.

- date: fecha del incidente.
- note: observación del incidente.
- idStudent: ID del estudiante involucrado.
- idAuxiliar: ID del auxiliar que registra el incidente.
- idIncidentCatalog: ID del tipo de incidente.
- Debe enviarse al menos un campo para actualizar.

---

## Example Request

- PATCH /incident/1

```json
{
  "note": "El estudiante interrumpió repetidamente la clase.",
  "idIncidentCatalog": 3
}
```

---

## Validations

### Params

- id: requerido, número entero positivo.

### Body

- date: opcional, debe ser una fecha válida.
- note: opcional, string entre 3 y 255 caracteres.
- idStudent: opcional, número entero positivo.
- idAuxiliar: opcional, número entero positivo.
- idIncidentCatalog: opcional, número entero positivo.
- No se permiten campos adicionales.
- Debe enviarse al menos un campo.

---

## Validation Error Response

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

---

## Success Response

```json
{
  "success": true,
  "message": "Incidente actualizado correctamente",
  "incident": {
    "date": "2026-05-19T00:00:00.000Z",
    "idIncident": 2,
    "note": "EL ESTUDIANTE INTERRUMPIÓ REPETIDAMENTE LA CLASE.",
    "incidentCatalog": {
      "idIncidentCatalog": 3,
      "name": "Uso de celular en clase",
      "description": "Uso de dispositivos móviles sin autorización durante clases.",
      "type": "LEVE",
      "pointsDeducted": 4
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
