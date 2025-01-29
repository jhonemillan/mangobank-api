# Mango Bank - prueba

**Descripción:**

MangoBank es una startup enfocada en la provisión de servicios financieros. Actualmente,
buscan integrar un flujo de referidos en su aplicación y requieren la implementación de cuatro
endpoints en su API para gestionar los usuarios y sus referencias. A continuación, se detallan
los requisitos y consideraciones para esta tarea técnica.

**levantar el servidor:**
El servidor corre en el puerto 7070 

```
npm run dev
```

**Env vars:**
Para correr la aplicacion es necesario crear una variable de ambiente que contiene la conexion de la BD

```
DATABASE_URL="postgresql://usuario:clave@localhost:5432/mangobank?schema=public"
```

**Tecnologias:**

1. Node.js
2. Prisma ORM
3. Jest para las pruebas
4. Joi para la validacion de payloads

**Para ejecutar las pruebas:**
```bash
npm test




