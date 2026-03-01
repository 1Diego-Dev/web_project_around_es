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

1. **`Card.js`**: Contiene la clase `Card`. Se encarga de crear cada tarjeta, clonar el template y asignar sus propios *event listeners* (eliminar, dar like y hacer zoom).
2. **`FormValidator.js`**: Contiene la clase `FormValidator`. Gestiona toda la lógica de validación de los formularios, alternando el estado del botón de envío y mostrando/ocultando los errores.
3. **`utils.js`**: Archivo de utilidades que almacena las funciones universales para manejar las ventanas modales (abrir, cerrar, cerrar con Escape y cerrar con clic en el *overlay*).
4. **`index.js`**: El archivo principal (orquestador). Instancia las clases, define los datos iniciales y conecta los eventos principales de la página.

## Link del proyecto:
* https://1diego-dev.github.io/web_project_around_es/ *