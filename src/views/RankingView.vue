<template>
  <BaseLayout>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">🏆 Ranking</h1>
        <p class="text-gray-600">Confira a classificação dos melhores palpiteiros!</p>
      </div>

      <TabelaRanking />
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import TabelaRanking from '@/components/TabelaRanking.vue'
</script>
