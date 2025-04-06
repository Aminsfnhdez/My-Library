# 📚 MyLibrary - Sistema de Gestión de Biblioteca

MyLibrary es una aplicación web moderna desarrollada con Angular para la gestión de una biblioteca personal o institucional. Permite organizar, buscar y gestionar libros de manera eficiente.

## 🚀 Características Principales

- 📖 Gestión completa de libros (agregar, editar, eliminar)
- 🔍 Búsqueda avanzada por título
- 📱 Diseño responsivo para todos los dispositivos
- 🌓 Modo claro/oscuro
- 📸 Gestión de portadas de libros
- 📊 Organización por estantes
- 🎨 Interfaz moderna con PrimeNG y Tailwind CSS

## ⚙️ Requisitos del Sistema

- Node.js (versión 16 o superior)
- npm (versión 7 o superior)
- Angular CLI (versión 19.2.1 o superior)

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd my-library
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
ng serve
```

4. Abrir el navegador en `http://localhost:4200`

## 📦 Dependencias Principales

- Angular 19.2.1
- PrimeNG
- Tailwind CSS
- RxJS
- TypeScript

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   ├── services/
├── assets/
└── environments/
```

## 🔧 Comandos Útiles

```bash
# Generar un nuevo componente
ng generate component component-name

# Construir el proyecto para producción
ng build --configuration production

# Ejecutar pruebas unitarias
ng test

# Ejecutar pruebas e2e
ng e2e
```

## ⚠️ IMPORTANTE

- Asegúrate de tener todas las dependencias instaladas antes de ejecutar la aplicación
- El archivo `environment.ts` debe ser configurado con las credenciales correctas
- Para el modo de producción, utiliza `ng build --configuration production`

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte, por favor abra un issue en el repositorio o contacte al administrador del proyecto.
