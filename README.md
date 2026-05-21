# system-assists
Monorepo fullstack con **Express** (backend) y **React + Vite** (frontend), para control de asistencias de una institución educativa.

---

## Estructura
```
system-assists/
├── package.json          ← raíz: scripts globales
├── backend/              ← API REST con Express + Prisma
└── frontend/             ← SPA con React + Vite
```

---

## Requisitos
- Node.js
- PostgreSQL

---

## Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/wynsley/system-assists.git
cd system-assists
 
# 2. Instalar dependencias, copiar .env y migrar la base de datos
npm run setup
# 2.1. Luego abre `backend/.env` y completa tus credenciales de ser necesario

# 3. Ejecutar en modo desarrollo
npm run dev
```

---

## Scripts disponibles
 
| Comando | Descripción |
|---|---|
| `npm run setup` | Instala deps + copia `.env.example` → `.env` + migra DB |
| `npm run dev` | Levanta backend y frontend en paralelo |
| `npm run db:migrate` | Corre migraciones de Prisma en el backend |
| `npm run build:frontend` | Build de producción del frontend |
| `npm run install:all` | Instala dependencias en raíz, backend y frontend |
| `npm run env` | Solo copia el `.env.example` al `.env` del backend |

---

## Desarrollo
 
```bash
npm run dev
```
 
| Servicio | URL por defecto |
|---|---|
| Backend (Express) | http://localhost:3000 |
| Frontend (Vite) | http://localhost:5173 |
 
---

## Base de datos
 
Las migraciones usan **Prisma**. Para crearlas manualmente:
 
```bash
npm run db:migrate
```
 
Esto ejecuta `prisma migrate dev && prisma generate` dentro del backend.
 
---