# ⚡ API - Sistema Assist

API backend para gestión de asistencia, usuarios e incidencias.

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

### AUTH

- [INICIAR SESIÓN](docs/auth/login.md)
- [CERRAR SESIÓN](docs/auth/logout.md)

### USER

- [CREAR NUEVO USUARIO](docs/user/create.md)
- [LISTAR USUARIOS](docs/user/get.md)
- [ACTUALIZAR USUARIO](docs/user/update.md)
- [ELIMINAR USUARIO](docs/user/delete.md)

### GRADE
