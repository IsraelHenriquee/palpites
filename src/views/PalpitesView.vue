<template>
  <BaseLayout>
    <div>
      <!-- Componente de Lista de Palpites -->
      <div class="max-w-2xl mx-auto">
        <ListaPalpites />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import ListaPalpites from '@/components/ListaPalpites.vue'
</script>
