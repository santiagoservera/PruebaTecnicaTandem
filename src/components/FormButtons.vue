<template>
  <v-btn
    :color="color"
    @click="handleClick"
    :class="customClass"
    :variant="variant"
  >
    <slot>{{ label }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
  onClick: () => void;
  color?: string;
  label?: string;
  customClass?: string;
  variant?: string;
}>();

function handleClick() {
  props.onClick();
}
</script>
