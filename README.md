# Tripleten web_project_around_es
# Around The U.S.

Proyecto interactivo diseñado para gestionar una galería de imágenes de diversos lugares. La aplicación permite a los usuarios personalizar su información de perfil, añadir nuevas tarjetas a la colección, interactuar con ellas y visualizar imágenes en alta resolución a través de ventanas emergentes. En su versión más reciente, el proyecto ha sido refactorizado para implementar **Programación Orientada a Objetos (POO)** y **Módulos ES6**, mejorando su escalabilidad y mantenimiento.

## Funcionalidades

* **Edición de Perfil**: Permite actualizar el nombre y la descripción del usuario mediante un modal.
* **Validación de Formularios en Tiempo Real**: Sistema de validación robusto que evalúa los campos a medida que el usuario escribe, mostrando mensajes de error nativos del navegador y bloqueando el botón de envío si los datos son inválidos.
* **Gestión Dinámica de Tarjetas**:
    * **Carga Inicial**: Los datos se generan a partir de un array de objetos utilizando la etiqueta `<template>`.
    * **Creación de Tarjetas**: Formulario dedicado para añadir nuevos lugares, posicionándolos al inicio de la lista (prepend).
    * **Eliminación y "Me Gusta"**: Funcionalidad para borrar tarjetas individuales o marcarlas como favoritas, gestionada de forma independiente por cada instancia de tarjeta.
* **Interactividad y Visualización (Zoom)**: Al hacer clic en cualquier imagen, se despliega un modal que muestra la fotografía ampliada junto con su título descriptivo. Cierre de modales optimizado (clic en la "X", tecla Escape o clic en el fondo oscuro).

## Tecnologías Utilizadas

* **HTML5**: Uso de etiquetas semánticas y elementos de plantilla (`<template>`).
* **CSS3**: Maquetación basada en la metodología BEM y diseño responsivo.
* **JavaScript (ES6+)**: 
  * Implementación de **Clases** (POO) para encapsular comportamientos.
  * Uso de **Módulos (`import` / `export`)** para dividir el código según responsabilidades.
  * Manipulación avanzada del DOM y gestión de eventos.

## Estructura del Proyecto JS (Arquitectura Modular)

El código JavaScript ha sido dividido en módulos independientes para garantizar el principio de responsabilidad única:

1. **`Card.js`**: Contiene la lógica para instanciar cada tarjeta, clonar su template y gestionar sus eventos individuales (eliminar, dar like y notificar cuando se requiere hacer zoom).
2. **`FormValidator.js`**: Gestiona toda la lógica de validación en tiempo real de los formularios, interactuando con las clases de CSS para mostrar u ocultar errores y gestionar el estado del botón de envío.
3. **`Section.js`**: Se encarga de renderizar una lista de elementos (como el array inicial de tarjetas) y de inyectar nuevos elementos individuales directamente en el contenedor del DOM.
4. **`Popup.js`**: Clase base que maneja las funciones universales de las ventanas modales, como abrir, cerrar y escuchar eventos de cierre (clic externo o tecla Escape).
5. **`PopupWithImage.js` y `PopupWithForm.js`**: Clases hijas que heredan de `Popup`, especializadas en inyectar datos en el modal de visualización de imágenes y en procesar la recolección de datos de los formularios, respectivamente.
6. **`UserInfo.js`**: Gestiona y sincroniza la visualización de la información del perfil del usuario en la página principal.
7. **`index.js`**: El archivo principal (orquestador). Instancia todas las clases, inyecta las dependencias necesarias mediante callbacks (acoplamiento débil) y conecta los *event listeners* principales de la página.

## Link del proyecto:
* https://1diego-dev.github.io/web_project_around_es/