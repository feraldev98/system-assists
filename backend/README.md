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
- [LISTAR USUARIOS POR ID](docs/user/getById.md)
- [ACTUALIZAR USUARIO](docs/user/update.md)
- [ELIMINAR USUARIO](docs/user/delete.md)

### GRADE

- [CREAR NUEVO GRADO (EJ. 1°, 2°, ETC)](docs/grade/create.md)
- [LISTAR TODOS LOS GRADOS](docs/grade/get.md)
- [LISTAR GRADO POR ID](docs/grade/getById.md)
- [ACTUALIZAR GRADO](docs/grade/update.md)
- [ELIMINAR GRADO](docs/grade/delete.md)

### SECTION

- [CREAR NUEVA SECCION (EJ. 1° A, 1° B, ETC)](docs/section/create.md)
- [LISTAR TODAS LAS SECCIONES](docs/section/get.md)
- [LISTAR SECCION POR ID](docs/section/getById.md)
- [ACTUALIZAR SECCION](docs/section/update.md)
- [ELIMINAR SECCION](docs/section/delete.md)

### CLASSROOM

- [CREAR SALÓN DE CLASE](docs/classroom/create.md)
- [LISTAR TODAS LAS SALONES DE CLASE](docs/classroom/get.md)
- [LISTAR SALÓN DE CLASE POR ID](docs/classroom/getById.md)
- [ACTUALIZAR SALÓN DE CLASE](docs/classroom/update.md)
- [ELIMINAR SALÓN DE CLASE](docs/classroom/delete.md)

### STUDENT

- [CREAR NUEVO ESTUDIANTE](docs/student/create.md)
- [LISTAR TODOS LOS ESTUDIANTES](docs/student/get.md)
- [LISTAR ESTUDIANTE POR ID](docs/student/getById.md)
- [ACTUALIZAR ESTUDIANTE](docs/student/update.md)
- [ELIMINAR ESTUDIANTE](docs/student/delete.md)
