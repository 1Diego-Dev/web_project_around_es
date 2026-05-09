# Tripleten web_project_around_es
# Around The U.S. (Conexión a API)

Proyecto interactivo diseñado para gestionar una galería de imágenes de diversos lugares. En esta fase final (Sprint 12), la aplicación ha dejado de ser estática para conectarse a un servidor real mediante una **API**, permitiendo la persistencia de datos y una interacción dinámica en tiempo real. Se ha implementado **JavaScript Asíncrono** y se han reforzado los principios de **POO** y **Arquitectura Modular**.

## Funcionalidades Actualizadas

* **Persistencia de Datos**: Toda la información (perfil, avatar y tarjetas) se sincroniza con un servidor remoto mediante peticiones `fetch`.
* **Edición de Perfil y Avatar**: Permite actualizar el nombre, la descripción y la foto de perfil del usuario de forma permanente en el servidor (método `PATCH`).
* **Gestión Dinámica de Tarjetas**:
    * **Carga Inicial**: Los datos se recuperan masivamente del servidor al iniciar la página utilizando `Promise.all`.
    * **Creación y Borrado Seguro**: Las nuevas tarjetas se guardan en la base de datos (método `POST`) y el borrado requiere una confirmación previa para evitar acciones accidentales.
    * **Control de Autoría**: El botón de eliminación solo es visible en las tarjetas creadas por el propio usuario.
    * **Sistema de "Me Gusta"**: Funcionalidad de likes sincronizada con el servidor (métodos `PUT` y `DELETE`).
* **Mejoras de Experiencia de Usuario (UX)**:
    * **Indicadores de Carga**: Los botones de envío muestran estados como "Guardando..." o "Eliminando..." mientras se procesan las peticiones.
    * **Feedback de Errores**: Se ha implementado un popup de error visual que notifica al usuario si una petición al servidor falla, sustituyendo los logs genéricos de consola.
    * **Efectos Visuales**: La foto de perfil incluye un estado de hover con un icono de edición para mejorar la interactividad.

## Tecnologías Utilizadas

* **HTML5**: Etiquetas semánticas, validación nativa de formularios y elementos de plantilla.
* **CSS3**: Metodología BEM, diseño responsivo y efectos de transición avanzados.
* **JavaScript (ES6+)**: 
  * **Fetch API**: Gestión de peticiones asíncronas HTTP.
  * **Promesas**: Manejo de flujos de datos asíncronos y control de errores (`.then`, `.catch`, `.finally`).
  * **POO Avanzada**: Encapsulamiento de lógica en clases especializadas y herencia.

## Estructura del Proyecto JS (Arquitectura Modular)

El código se organiza en módulos independientes para garantizar escalabilidad y mantenimiento:

1. **`Api.js`**: Centraliza todas las llamadas al servidor (obtención de datos, actualizaciones y borrados).
2. **`Card.js`**: Gestiona la lógica de las tarjetas, incluyendo la verificación de propietario y la gestión de eventos visuales.
3. **`UserInfo.js`**: Sincroniza la información del usuario (nombre, acerca de mí y avatar) entre el servidor y el DOM.
4. **`Section.js`**: Renderiza elementos en el DOM a partir de arrays de datos, ya sean locales o provenientes de la API.
5. **`Popup.js`**: Clase base para el control de ventanas modales.
6. **`PopupWithForm.js`**: Especializada en la recolección de datos y gestión de estados de carga en formularios.
7. **`PopupWithConfirmation.js`**: Subclase diseñada para validar acciones críticas (como el borrado) antes de ejecutarlas.
8. **`PopupError.js`**: Módulo para la visualización de mensajes de error técnicos en la interfaz de usuario.
9. **`index.js`**: Orquestador principal que sincroniza las instancias de clases y define las funciones callback de interacción.

## Link del proyecto:
* https://1diego-dev.github.io/web_project_around_es/