<template>
  <div class="min-h-screen bg-secondary-100">
    <!-- Menu de Navegação -->
    <MenuNavigation />

    <!-- Conteúdo Principal -->
    <main class="container mx-auto px-4 py-8 mt-16">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import MenuNavigation from './MenuNavigation.vue'
</script>
