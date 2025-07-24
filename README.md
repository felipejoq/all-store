# All Shop

Esta es una aplicación que crea una Tienda en línea de caracter general con la finalidad de reforzar conocimientos en Next.js. parte de otros conocimientos tales como JavaScript, TypeScript, React.js, etc.

## Instrucciones para desarrollo

1. Clonar el repositorio
2. Crear una copia del archivo __.env.template__ y renombrar a ```.env```
3. Cambiar las variables de entorno en el archivo .env
4. Instalar las dependencias ```npm install```
5. Ejecutar migraciones de prisma ```npx prisma migrate dev```
6. Crear el cliente prisma ```npx prisma generate```
7. Ejecutar seed ```npm run seed```
8. Ejecutar la base de datos con docker con docker-compose: ```docker-compose up -d```
9. Ejecutar el proyecto ```npm run dev```

## Instrucciones de Prod