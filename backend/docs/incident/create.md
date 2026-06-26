# REGISTRAR INCIDENTE

## POST /incident

- Registra un nuevo incidente disciplinario para un estudiante.
- Requiere autenticación.

## Authentication

- Solo usuarios con rol ADMIN o AUXILIAR pueden acceder a este endpoint.

## Body:

- date: fecha en la que ocurrió el incidente.
- note: observación o nota del incidente (opcional).
- idStudent: ID del estudiante involucrado.
- idAuxiliar: ID del auxiliar que registra el incidente.
- idIncidentCatalog: ID de la categoría de incidente aplicada.

## Example Request

- POST /incident
- BODY:

```json
{
  "date": "2026-06-25",
  "note": "El estudiante interrumpió constantemente la clase.",
  "idStudent": 15,
  "idAuxiliar": 3,
  "idIncidentCatalog": 2
}
```

## Validations:

- date: requerido, debe ser una fecha válida.
- note: opcional, debe ser una cadena de texto entre 3 y 255 caracteres.
- idStudent: requerido, debe ser un número entero positivo.
- idAuxiliar: requerido, debe ser un número entero positivo.
- idIncidentCatalog: requerido, debe ser un número entero positivo.
- No se permiten campos adicionales.

## Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "date",
      "message": "La fecha del incidente debe ser una fecha válida"
    },
    {
      "field": "idStudent",
      "message": "El ID del estudiante es requerido"
    },
    {
      "field": "idStudent",
      "message": "El ID del estudiante debe ser un número entero"
    },
    {
      "field": "idAuxiliar",
      "message": "El ID del auxiliar es requerido"
    },
    {
      "field": "idAuxiliar",
      "message": "El ID del auxiliar debe ser un número entero"
    },
    {
      "field": "idIncidentCatalog",
      "message": "El ID del catálogo de incidentes es requerido"
    },
    {
      "field": "idIncidentCatalog",
      "message": "El ID del catálogo de incidentes debe ser un número entero"
    }
  ]
}
```

## Success Response

```json
{
  "success": true,
  "message": "Incidente registrado correctamente",
  "incident": {
    "idIncident": 20,
    "date": "2026-06-25T00:00:00.000Z",
    "note": "EL ESTUDIANTE INTERRUMPIÓ CONSTANTEMENTE LA CLASE.",
    "incidentCatalog": {
      "idIncidentCatalog": 2,
      "name": "Tardanza reiterada",
      "description": "Llegar tarde al aula en más de una ocasión en la semana.",
      "type": "LEVE",
      "pointsDeducted": 3
    },
    "student": {
      "idStudent": 15,
      "firstname": "Ana",
      "lastname": "Ramírez Apaza",
      "email": "ana.ramirez14@school.edu.pe",
      "phone": "965994497",
      "status": "INACTIVO",
      "studentParents": [
        {
          "relationship": "TÍO",
          "parent": {
            "idUser": 34,
            "firstname": "Fernando",
            "lastname": "Cárdenas",
            "email": "fernando.cardenas@school.edu.pe",
            "phone": null
          }
        }
      ]
    },
    "auxiliar": {
      "idUser": 3,
      "firstname": "Roberto",
      "lastname": "Vargas",
      "email": "roberto.vargas@school.edu.pe",
      "phone": null
    },
    "createdAt": "2026-06-25T23:48:17.482Z",
    "updatedAt": "2026-06-25T23:48:17.482Z"
  }
}
```

## Duplicate Incident Response

```json
{
  "success": false,
  "message": "Valor duplicado",
  "errors": [
    {
      "field": ["idStudent", "date", "idIncidentCatalog"],
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
