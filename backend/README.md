# ⚡ API - Sistema Assist

API backend para gestión de asistencia, usuarios e incidencias.

---

## 🚀 Setup

```bash
npm install
npm run db:migrate
npm run dev
```

---

## 🌐 Base URL

http://localhost:3000

---

## 🔐 Autenticación

- Usa cookies HTTP-only
- El frontend debe enviar:

```js
credentials: "include";
```

---

## 🧠 Roles

ADMIN  
AUXILIAR  
PARENT

---

## 📌 Endpoints

### Auth

<details>
<summary>LOGIN</summary>
  
### POST /login

Autentica un usuario mediante email y contraseña.
Si las credenciales son válidas, el servidor genera una cookie HTTPOnly llamada token que contiene el JWT de autenticación.

### Body:

```json
{
  "email": "testing@hotmail.com",
  "password": "1234567a"
}
```

### Validations:

- email: requerido, trim, convertido a minúsculas, formato válido de email, máximo 100 caracteres.
- password: requerida, trim, obligatoria, máximo 100 caracteres, al menos una letra, al menos un número.

### Response:

```json
{
  "message": "Bienvenido Fernando Pérez",
  "email": "testing@hotmail.com",
  "firstname": "Fernando",
  "lastname": "Pérez",
  "role": "AUXILIAR"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Usuario y/o contraseña incorrectos",
  "errors": {
    "message": "Usuario y/o contraseña incorrectos"
  }
}
```

</details>

<details>
<summary>LOGOUT</summary>

### POST /logout

Cierra la sesión del usuario autenticado eliminando la cookie HTTPOnly token.

### Response:

```json
{
  "message": "Sesión cerrada correctamente"
}
```

### Validations:

- requiere usuario autenticado.

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

### User

<details>
<summary>REGISTER</summary>
  
### POST /auxiliar

Crea un nuevo usuario en el sistema. Requiere autenticación y permisos de administrador.

### Authentication

- Solo usuarios con rol ADMIN pueden acceder a este endpoint.

### Body:

```json
{
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "testing@hotmail.com",
  "password": "1234567a",
  "repassword": "1234567a",
  "phone": "+51 985 988 977",
  "role": "AUXILIAR"
}
```

### Validations:

- firstname: requerido, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- lastname: requerido, trim, mínimo 2 caracteres, máximo 50 caracteres, solo letras y espacios.
- email: requerido, trim, convertido a minúsculas, formato válido de email.
- password: requerida, trim, mínimo 8 caracteres, máximo 100 caracteres, al menos una letra, al menos un número.
- repassword: requerida, trim, debe coincidir con password.
- phone: opcional, trim, elimina espacios automáticamente, debe tener formato +519XXXXXXXX.
- role: requerido, valores permitidos: ADMIN, AUXILIAR, PARENT.

### Response:

```json
{
  "idUser": 1,
  "firstname": "Fernando",
  "lastname": "Pérez",
  "email": "testing@hotmail.com",
  "phone": "+51985988977",
  "role": "AUXILIAR",
  "createdAt": "2026-06-01T15:00:00.000Z",
  "updatedAt": "2026-06-01T15:00:00.000Z"
}
```

### Validation Error Response

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    {
      "field": "email",
      "message": "El email no tiene un formato válido"
    },
    {
      "field": "phone",
      "message": "El teléfono debe tener formato +519XXXXXXXX"
    }
  ]
}
```

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
