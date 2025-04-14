<template>
  <v-dialog v-model="internalVisible" persistent max-width="380">
    <v-fade-transition hide-on-leave>
      <v-card
        v-if="internalVisible"
        class="mx-auto pa-4 text-center"
        elevation="12"
        :title="title"
      >
        <template v-slot:append> </template>

        <div class="py-2 text-center">
          <div class="text-body-1 font-weight-medium">
            {{ message }}
          </div>
        </div>

        <div class="text-end mt-2">
          <v-btn
            color="primary"
            variant="outlined"
            rounded
            size="small"
            @click="close"
          >
            Cerrar
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

// Propiedades del componente
const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  success: Boolean,
});
// Eventos del componente
const emit = defineEmits(["update:modelValue"]);

const internalVisible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    internalVisible.value = val;
  }
);

function close() {
  internalVisible.value = false;
  emit("update:modelValue", false);
}
</script>
