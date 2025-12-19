# Tripleten web_project_around_es
# Around The U.S.

Proyecto interactivo diseñado para gestionar una galería de imágenes de diversos lugares. La aplicación permite a los usuarios personalizar su información de perfil, añadir nuevas tarjetas a la colección, interactuar con ellas y visualizar imágenes en alta resolución a través de ventanas emergentes.

## Funcionalidades

* **Edición de Perfil**: Permite actualizar el nombre y la descripción del usuario mediante un formulario que valida y guarda los cambios en el DOM.
* **Gestión Dinámica de Tarjetas**:
    * **Carga Inicial**: Los datos se generan a partir de un array de objetos utilizando una plantilla HTML (template).
    * **Creación de Tarjetas**: Formulario dedicado para añadir nuevos lugares. Las nuevas tarjetas se posicionan al inicio de la lista (prepend).
    * **Eliminación**: Funcionalidad para borrar tarjetas individuales de forma permanente durante la sesión.
* **Interactividad y Visualización**:
    * **Sistema de Likes**: Opción para marcar tarjetas favoritas mediante un cambio de estado visual.
    * **Visualización de Imágenes (Zoom)**: Al hacer clic en cualquier imagen, se despliega un modal que muestra la fotografía en gran tamaño junto con su título descriptivo.
* **Manejo de Datos**: Implementación de parámetros predeterminados para gestionar casos de información faltante, utilizando un título genérico y una imagen de marcador de posición.

## Tecnologías Utilizadas

* **HTML5**: Uso de etiquetas semánticas y elementos de plantilla para renderizado dinámico.
* **CSS3**: Maquetación basada en la metodología BEM y diseño responsivo para diferentes dispositivos.
* **JavaScript**: Manipulación avanzada del DOM, gestión de eventos y clonación de nodos.

## Estructura del Proyecto JS

El archivo index.js se organiza en los siguientes bloques para facilitar su lectura:
1. **Definición de Elementos**: Selección de todas las variables y constantes necesarias del DOM.
2. **Funciones Base**: Lógica reutilizable para la apertura y cierre de modales.
3. **Manejadores de Formularios**: Funciones encargadas de procesar los eventos de envío (submit).
4. **Lógica de Tarjetas**: Funciones para la creación (clonación del template) y el renderizado de los elementos.
5. **Event Listeners**: Configuración de todos los escuchadores de eventos para garantizar la interactividad del usuario.