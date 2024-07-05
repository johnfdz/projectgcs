# Development

Pasos para levantar la app en desarrollo

1. Levantar base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env

3. Reemplazar las variables de entorno.

4. Instalar modulos de NODE

```
npm i
```

5. Inciar proyecto

```
npm run dev
```

6. Ejecutar comandos de Prisma

```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Usuarios por defecto

1. Administrador:

   _admin@admin.com_

   _administrator_

2. Usuario:

   _user@user.com_

   _user10_
