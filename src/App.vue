<template>
  <v-app>
    <Navbar />
    <v-main class="w-100 my-10">
      <Formulario />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Formulario from "./components/Formulario.vue";
</script>

<style scoped></style>
