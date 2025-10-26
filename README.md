# ConversorTextToAudio-FrontEnd
## Descripción
Este repositorio contiene el código fuente del frontend para la aplicación Conversor - Text to Audio. Es una Aplicación de Página Única (SPA) construida con React que proporciona una interfaz de usuario limpia e intuitiva para interactuar con la API de backend (asumiendo el enlace de tu otro repo).

La aplicación permite a los usuarios seleccionar dinámicamente opciones como idioma, acento y velocidad, ingresar un texto y generar un archivo de audio como resultado.

## Características Principales
- Interfaz Reactiva: Construida con React 19, utilizando hooks modernos (useState, useEffect, useContext) para una gestión de estado eficiente.
- Consumo de API Dinámico: Obtiene las listas de idiomas, acentos (filtrados por idioma) y velocidades directamente desde los endpoints del backend.
- Generación de Audio: Envía el formulario de texto y opciones al endpoint /generar-audio del backend usando FormData.
- Reproducción Instantánea: Recibe el audio como un blob, crea una URL de objeto (URL.createObjectURL) y la asigna a un elemento <audio> para su reproducción inmediata en el navegador.
- Gestión de Estado (UI): Muestra estados de "Cargando..." y maneja los posibles errores devueltos por la API.
- Tema dual (Light/Dark Mode): Incluye un interruptor para cambiar entre modo claro y oscuro. El estado del tema se gestiona globalmente usando React Context y se aplica mediante variables CSS.
- Estilos Modulares: Utiliza CSS Modules para encapsular los estilos por componente, evitando colisiones de nombres.

## Tecnologías Utilizadas
- React (19.1.1): Biblioteca principal para construir la interfaz de usuario.
- Vite (7.1.7): Herramienta de compilación y servidor de desarrollo local ultrarrápido.
- React Router DOM (7.9.4): Para la gestión de rutas en la aplicación.
- React Context API: Para la gestión del estado global del tema.
- CSS Modules y Variables CSS: Para un sistema de estilos flexible y mantenible.
- Fetch API (Nativa del navegador): Para realizar solicitudes HTTP al backend.
- ESLint: Para el linting de código y mantenimiento de la calidad.

## Instalación y Puesta en Marcha
### Clonar el repositorio:
```
git clone [URL-DE-TU-REPOSITORIO-FRONTEND]
cd ConversorTextToAudio-FrontEnd
```
### Instalar dependencias:
```
npm install
```
Ejecutar el backend: Esta aplicación requiere que el servidor backend esté en funcionamiento (generalmente en http://127.0.0.1:8000).

### Ejecutar la aplicación frontend:
```
npm run dev
```
La aplicación estará disponible en http://localhost:5173 (o el puerto que Vite asigne).

## Scripts Disponibles
Basado en package.json, puedes usar los siguientes scripts:

- npm run dev: Inicia el servidor de desarrollo de Vite.
- npm run build: Compila la aplicación para producción en la carpeta dist.
- npm run lint: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
- npm run preview: Sirve localmente la compilación de producción para previsualización.

## Configuración
Actualmente, la URL de la API está definida en src/Components/Screens/Home/Home.jsx:

- JavaScript
- const API_BASE_URL = "http://127.0.0.1:8000";

Para un entorno de producción o más flexible, se recomienda mover esto a un archivo de variables de entorno (ej. .env) y cargarlo usando import.meta.env.VITE_API_URL.