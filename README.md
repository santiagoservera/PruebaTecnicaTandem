# Formulario Tandem

Este proyecto es un formulario interactivo con validaciones dinámicas, diseñado con Vue 3, TypeScript y Vuetify.

## Requisitos

- Node.js
- NPM

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev


```

## Funcionamiento

Este formulario permite ingresar información personal a través de campos de texto y campos select. El diseño está separado en múltiples capas para mejorar la mantenibilidad y la escalabilidad:

## Componentes principales

Formulario.vue: Componente principal que contiene la UI general, la lógica de envío (submit), el manejo de estados (mensajes de éxito/error), y los botones de acción.

FormFields.vue: Renderiza los campos del formulario de forma dinámica según una configuración externa (formConfig.ts), y aplica las reglas de validación que se generan.

formConfig.ts: Define la estructura del formulario, incluyendo campos, tipos, valores por defecto, y qué validaciones aplicar a cada uno.

validationUtils.ts: Genera reglas de validación en base a configuraciones externas, incluyendo campos obligatorios, longitudes, expresiones regulares, etc.

fieldConfig.ts: Define la estructura de un campo del formulario, incluyendo su nombre, tipo, valores por defecto, y qué validaciones aplicar a él.

## Validaciones dinámicas

El sistema permite definir reglas personalizadas por campo. Ejemplo de validaciones soportadas:

Campo obligatorio (required)

Longitud mínima y máxima (minLength, maxLength)

Regex personalizado

Validaciones complejas (ej. que no haya números en el nombre)

## Tipado

Se utiliza TypeScript para tipar correctamente las propiedades de los campos del formulario (FieldConfig, FieldOption, etc.), promoviendo una experiencia de desarrollo más robusta y predecible. Las interfaces están pensadas para ser reutilizables y fácilmente escalables.

## Eslinteo y Prettier

Se utilizan ESLint y Prettier para la gestión de estilo y formato de código.

## Autor

Santiago Servera
