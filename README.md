Guía para crear el proyecto desde cero
Este documento explica cómo configurar desde cero el proyecto, tanto backend como frontend, con el stack tecnológico utilizado en este trabajo.

1️-Crear carpetas base
Abrimos una terminal y creamos la carpeta raíz del proyecto y, dentro de ella, las carpetas frontend y backend:

mkdir mi-proyecto
cd mi-proyecto
mkdir frontend
mkdir backend

2-Backend
Entramos en la carpeta del backend:
cd backend
2.1 Inicializar proyecto Node + TypeScript

npm init -y
mkdir src
npm install -D typescript
npx tsc --init --rootDir src --outDir dist

2.2 Instalar dependencias de desarrollo

npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin ts-node-dev @types/node

usamos solo ESLint, y agregamos ts-node-dev para recarga automática.
2.3 Configurar ESLint

npx eslint --init

Seleccionar opciones para Node.js, TypeScript y ESM.
2.4 Configurar variables de entorno

npm install -D @dotenvx/dotenvx env-schema

Crear el archivo .env con:
PORT=3000
2.5 Dependencias funcionales del backend

npm install express cors body-parser helmet
npm install -D @types/express @types/cors @types/body-parser @types/helmet

2.6 Servidor base en TypeScript
Crear src/server.ts con el siguiente contenido:

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});

2.7 Scripts en package.json

"scripts": {
  "start": "dotenvx run ts-node-dev src/server.ts",
  "build": "tsc",
  "test": "npm run lint",
  "lint": "eslint --format stylish --color --fix ."
}

3- Frontend
Entramos en la carpeta del frontend:

cd ../frontend

3.1 Crear proyecto con Vite

npm create vite@latest .

Seleccionar React + TypeScript.
3.2 Dependencias funcionales

npm install axios
npm install -D @types/axios

3.3 Configurar ESLint

npx eslint --init

3.4 Scripts en package.json

"scripts": {
  "start": "vite",
  "build": "tsc -b && vite build",
  "test": "npm run lint",
  "lint": "eslint --format stylish --color --fix ."
}

4- Stack tecnológico final
Frontend
React, TypeScript, Vite, Axios.
Backend
Express, TypeScript, dotenvx, env-schema, ts-node-dev, ESLint, cors, body-parser, helmet.


