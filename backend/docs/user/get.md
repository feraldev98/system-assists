<details>
<summary>LISTAR TODOS LOS USUARIOS</summary>
  
### GET /user

Obtiene una lista paginada de usuarios del sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### Query Params

| Parameter | Type   | Required | Description                                                                                                                               |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| page      | number | No       | Número de página. Valor mínimo: 1. Default: 1.                                                                                            |
| limit     | number | No       | Cantidad de registros por página. Mínimo: 1. Máximo: 100. Default: 10.                                                                    |
| role      | string | No       | Filtra usuarios por rol. Valores permitidos: ADMIN, AUXILIAR, PARENT.                                                                     |
| search    | string | No       | Busca coincidencias por firstname, lastname, email o phone.                                                                               |
| sortBy    | string | No       | Campo utilizado para ordenar resultados. Valores permitidos: firstname, lastname, email, phone, createdAt, updatedAt. Default: createdAt. |
| sortOrder | string | No       | Ordenamiento ascendente o descendente. Valores permitidos: asc, desc. Default: asc.                                                       |

### Example Request

- GET /user?page=1&limit=10&role=AUXILIAR&search=fernando&sortBy=createdAt&sortOrder=desc

### Response

```json
{
  "success": true,
  "data": [
    {
      "idUser": 2,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T21:56:17.433Z",
      "updatedAt": "2026-06-04T21:56:17.433Z"
    },
    {
      "idUser": 4,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar1@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T22:26:24.283Z",
      "updatedAt": "2026-06-04T22:26:24.283Z"
    },
    {
      "idUser": 6,
      "firstname": "qwe",
      "lastname": "Kael",
      "email": "auxiliar2@gmail.com",
      "phone": "+51985988977",
      "role": "AUXILIAR",
      "createdAt": "2026-06-04T22:26:54.496Z",
      "updatedAt": "2026-06-04T22:26:54.496Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4,
    "totalPages": 1
  }
}
```

### Search Behavior

El parámetro search realiza búsquedas insensibles a mayúsculas/minúsculas sobre los siguientes campos:

- firstname
- lastname
- email
- phone

### Validations

- page: opcional, número entero, mínimo 1.
- limit: opcional, número entero, mínimo 1, máximo 100.
- role: opcional, valores permitidos: ADMIN, AUXILIAR, PARENT.
- sortBy: opcional, valores permitidos: firstname, lastname, email, phone, createdAt, updatedAt.
- sortOrder: opcional, valores permitidos: asc, desc.
- search: opcional, trim automático.

### Unauthorized Response

```json
{
  "success": false,
  "message": "Sin autorización",
  "errors": {
    "message": "Sin autorización"
  }
}
```

</details>
