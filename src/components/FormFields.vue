<template>
  <div class="d-flex flex-column">
    <!-- Componente de cada campo -->
    <component
      v-for="field in fields"
      :key="field.name"
      :items="field.type === 'select' ? field.options : undefined"
      :is="getFieldComponent(field.type)"
      v-model="modelValue[field.name]"
      v-bind="getFieldProps(field)"
      class="mb-4"
      style="width: 100%"
      @update:model-value="handleFieldUpdate(field.name, $event)"
    />
  </div>
</template>

<script setup lang="ts">
// Importar componentes, variables y funciones necesarias
import { watch, ref } from "vue";
import type { FieldConfig } from "../config/formConfig";
import { updateFormConfig } from "../config/formConfig";

// Propiedades del componente
const props = defineProps<{
  fields: FieldConfig[];
  modelValue: Record<string, string>;
  rules: Record<string, ((value: string) => boolean | string)[]>;
}>();

// Eventos del componente
const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, string>): void;
  (e: "config-updated"): void;
}>();

// Variables para los campos de validación
const codAreaError = ref("");
let codAreaErrorTimeout: number | null = null;
const telefonoError = ref("");
let telefonoErrorTimeout: number | null = null;
const nombreError = ref("");
let nombreErrorTimeout: number | null = null;
const casaNumeroError = ref("");
let casaNumeroErrorTimeout: number | null = null;
const departamentoNumeroError = ref("");
let departamentoNumeroErrorTimeout: number | null = null;

// Manejar cambios en los campos
function handleFieldUpdate(fieldName: string, value: string) {
  if (fieldName === "vivienda") {
    // Actualizar la configuración del formulario
    updateFormConfig(value);

    // Notificar al componente padre que la configuración ha cambiado
    emit("config-updated");
  }
}

// Función para obtener el componente de un campo según su tipo
function getFieldComponent(type: string) {
  switch (type) {
    case "text":
    case "email":
      return "v-text-field";
    case "select":
      return "v-select";
    default:
      return "v-text-field";
  }
}

// Función para obtener las propiedades del campo según su tipo
function getFieldProps(field: FieldConfig) {
  const fieldProps: Record<string, any> = {
    label: field.label,
    rules: props.rules[field.name] || [],
    maxlength: field.maxLength,
    variant: "outlined",
    required: field.required,
  };

  // Validación de campo "nombre"
  if (field.name === "nombre") {
    fieldProps.pattern = "^[a-zA-ZÀ-ÿ\\s]+$";

    fieldProps.error = !!nombreError.value;
    fieldProps.errorMessages = nombreError.value ? [nombreError.value] : [];

    fieldProps["onKeypress"] = (e: KeyboardEvent) => {
      if (!/[a-zA-ZÀ-ÿ\s]/.test(e.key)) {
        e.preventDefault();
        nombreError.value = "El nombre solo puede contener letras y espacios.";

        if (nombreErrorTimeout) clearTimeout(nombreErrorTimeout);
        nombreErrorTimeout = window.setTimeout(() => {
          nombreError.value = "";
        }, 2000);
      }
    };
  }

  // Validación de campo "telefono"
  if (field.name === "telefono") {
    fieldProps.type = "tel";
    fieldProps.inputmode = "numeric";
    fieldProps.pattern = "[0-9]*";

    fieldProps.error = !!telefonoError.value;
    fieldProps.errorMessages = telefonoError.value ? [telefonoError.value] : [];

    fieldProps["onKeypress"] = (e: KeyboardEvent) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        telefonoError.value = "El teléfono solo debe contener números.";

        if (telefonoErrorTimeout) clearTimeout(telefonoErrorTimeout);
        telefonoErrorTimeout = window.setTimeout(() => {
          telefonoError.value = "";
        }, 2000);
      }
    };
  }
  // Validación de campo "codArea"
  if (field.name === "codArea") {
    fieldProps.type = "tel";
    fieldProps.inputmode = "numeric";
    fieldProps.pattern = "[0-9]*";

    fieldProps.error = !!codAreaError.value;
    fieldProps.errorMessages = codAreaError.value ? [codAreaError.value] : [];

    fieldProps["onKeypress"] = (e: KeyboardEvent) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        codAreaError.value = "El código de área solo debe contener números.";

        if (codAreaErrorTimeout) clearTimeout(codAreaErrorTimeout);
        codAreaErrorTimeout = window.setTimeout(() => {
          codAreaError.value = "";
        }, 2000);
      }
    };
  }
  // Validación de campo "casaNumero"
  if (field.name === "numeroCasa") {
    fieldProps.type = "tel";
    fieldProps.inputmode = "numeric";
    fieldProps.pattern = "[0-9]*";

    fieldProps.error = !!casaNumeroError.value;
    fieldProps.errorMessages = casaNumeroError.value
      ? [casaNumeroError.value]
      : [];

    fieldProps["onKeypress"] = (e: KeyboardEvent) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        casaNumeroError.value =
          "El número de la casa solo debe contener números.";

        if (casaNumeroErrorTimeout) clearTimeout(casaNumeroErrorTimeout);
        casaNumeroErrorTimeout = window.setTimeout(() => {
          casaNumeroError.value = "";
        }, 2000);
      }
    };
  }
  // Validación de campo "select"
  if (field.type === "select" && field.options) {
    fieldProps.items = field.options.map(opt =>
      typeof opt === "string"
        ? { title: opt, value: opt }
        : { title: opt.label, value: opt.value }
    );
  }

  return fieldProps;
}

// Observar cambios en el modelValue
watch(
  () => props.modelValue,
  newValue => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);
</script>
