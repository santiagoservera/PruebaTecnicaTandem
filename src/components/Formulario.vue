<template>
  <v-card class="mx-auto pa-5" max-width="1200" max-height="100%" elevation="2">
    <v-row no-gutters class="fill-height align-stretch">
      <!-- Imagen -->
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center align-center fill-height pa-6"
      >
        <img
          src="../assets/imgForm.jpg"
          alt="Formulario Tandem"
          class="form-img"
        />
      </v-col>

      <!-- Formulario -->
      <v-col cols="12" md="6" class="h-25">
        <div class="py-2">
          <h1 class="text-center font">Formulario de datos</h1>
          <p class="text-center">Ingresa los datos</p>
        </div>

        <VForm
          ref="formRef"
          validate-on="submit"
          class="d-flex flex-column justify-space-between fill-height"
        >
          <!-- Componente de campos de formulario -->

          <FormFields
            :fields="formConfig[0].fields"
            v-model="formData"
            :rules="rules"
            @config-updated="handleConfigUpdated"
          />

          <!-- Botones del formulario -->
          <div
            class="d-flex w-full justify-space-between flex-column ga-2 mt-4"
          >
            <FormButtons :onClick="submit" color="#18BAD8" label="Enviar" />
            <FormButtons
              :onClick="resetForm"
              label="Limpiar formulario"
              color="#3D4375"
            />
          </div>
        </VForm>
      </v-col>
    </v-row>

    <!-- Dialogo de alerta -->
    <AlertDialog
      v-model="dialogVisible"
      :title="isSuccess ? 'Éxito' : 'Error'"
      :message="isSuccess ? successMessage : errorMessage"
      :success="isSuccess"
    />
  </v-card>
</template>

<script setup lang="ts">
// Importar componentes, variables y funciones necesarias
import { ref, reactive, onMounted, watch } from "vue";
import FormButtons from "./FormButtons.vue";
import FormFields from "./FormFields.vue";
import { formConfig } from "../config/formConfig";
import { generateRules } from "../utils/validationUtils";
import AlertDialog from "./AlertDialog.vue";
import type { VForm } from "vuetify/components";

// Variables para el formulario

// Botón para mostrar el dialogo de alerta y tipos de alerta
const dialogVisible = ref(false);
const isSuccess = ref(true);
const errorMessage = ref("");
const successMessage = ref("");

// Formulario
const formRef = ref<InstanceType<typeof VForm> | null>(null);
const formData = reactive<Record<string, string>>({});

// Reglas de validación para cada campo
const rules = reactive<Record<string, ((value: string) => boolean | string)[]>>(
  {}
);

// Manejar la actualización de la configuración del formulario
function handleConfigUpdated() {
  // Inicializar los nuevos campos
  formConfig.value[0].fields.forEach((field) => {
    if (!formData[field.name]) {
      formData[field.name] = field.default;
    }

    // Generar reglas de validación para el nuevo campo
    rules[field.name] = generateRules(field.validations || []);
  });
}

// Manejar los cambios en el estado de la alerta de error
watch([successMessage, errorMessage], ([newSuccess, newError]) => {
  if (newSuccess || newError) {
    isSuccess.value = !!newSuccess;
    dialogVisible.value = true;
  }
});

// Observar cambios en la configuración del formulario
watch(
  () => formConfig.value,
  () => {
    handleConfigUpdated();
  },
  { deep: true }
);

// Inicializar la configuración del formulario
onMounted(() => {
  formConfig.value[0].fields.forEach((field) => {
    formData[field.name] = field.default;
    rules[field.name] = generateRules(field.validations || []);
  });
});

// Función para reiniciar el formulario
function resetForm() {
  if (formRef.value) {
    formRef.value.reset();
    successMessage.value = "";
    errorMessage.value = "";
  }

  // También podrías reiniciar formData si querés:
  Object.keys(formData).forEach((key) => {
    formData[key] = "";
  });
}

// Función para limpiar las validaciones del formulario (En este caso no la estamos usando)
// function clearValidation() {
//   if (formRef.value) {
//     formRef.value.resetValidation();
//     errorMessage.value = "";
//   }
// }

// Función para enviar el formulario
async function submit() {
  errorMessage.value = "";
  successMessage.value = "";

  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (!valid) {
    errorMessage.value =
      "Error al enviar el formulario: hay campos vacíos o inválidos. ❌";
    setTimeout(() => {
      formRef.value?.resetValidation();
    }, 3000);
    return;
  }

  try {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("La respuesta del servidor no fue exitosa");
    }
    resetForm();

    const result = await response.json();
    console.log("Enviado correctamente:", result);

    localStorage.setItem("formData", JSON.stringify(formData));
    successMessage.value = "Formulario enviado con éxito ✔️";
  } catch (error: any) {
    errorMessage.value = `Error al enviar el formulario: ${
      error.message || "Error desconocido"
    }`;
  }
}
</script>

<!-- Estilos del formulario -->
<style scoped>
.form-img {
  max-width: 90%;
  border-radius: 16px;
  max-height: 800px;
}

.form {
  max-height: 100%;
  max-height: 500px;
}
</style>
