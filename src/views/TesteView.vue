<template>
  <div class="min-h-screen bg-secondary-100 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Cabeçalho com cores do projeto -->
      <div class="bg-primary-500 text-branco p-6 rounded-lg shadow-lg mb-8">
        <h1 class="text-3xl font-bold mb-2">Projeto Palpites - Brasil 🇧🇷</h1>
        <p class="text-primary-100">Cores: Verde da Bandeira do Brasil + Branco</p>
      </div>

      <!-- Cards demonstrando a paleta de cores -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Card Verde -->
        <div class="bg-branco rounded-lg shadow-md p-6 border border-primary-200">
          <h2 class="text-xl font-semibold text-primary-700 mb-4">🟢 Paleta Verde Brasil</h2>
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-500 rounded"></div>
              <span class="text-primary-800">Primary 500 - Verde Principal (#009739)</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-400 rounded"></div>
              <span class="text-primary-800">Primary 400 - Verde Médio</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-primary-600 rounded"></div>
              <span class="text-primary-800">Primary 600 - Verde Escuro</span>
            </div>
          </div>
        </div>

        <!-- Card Branco/Cinza -->
        <div class="bg-primary-50 rounded-lg shadow-md p-6 border border-secondary-300">
          <h2 class="text-xl font-semibold text-secondary-700 mb-4">⚪ Paleta Branco/Cinza</h2>
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-branco border border-secondary-300 rounded"></div>
              <span class="text-secondary-800">Branco Puro (#ffffff)</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-secondary-200 rounded"></div>
              <span class="text-secondary-800">Secondary 200 - Cinza Claro</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-secondary-600 rounded"></div>
              <span class="text-secondary-800">Secondary 600 - Cinza Escuro</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Exemplos de botões -->
      <div class="bg-branco rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-secondary-700 mb-4">Exemplos de Componentes</h2>

        <div class="flex flex-wrap gap-4">
          <!-- Botão Principal -->
          <button
            class="bg-primary-500 hover:bg-primary-600 text-branco font-medium py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Botão Principal
          </button>

          <!-- Botão Secundário -->
          <button
            class="bg-branco hover:bg-secondary-50 text-primary-600 font-medium py-3 px-6 rounded-lg border-2 border-primary-500 transition-colors"
          >
            Botão Secundário
          </button>

          <!-- Botão Outline -->
          <button
            class="bg-transparent hover:bg-primary-50 text-primary-600 font-medium py-3 px-6 rounded-lg border border-primary-300 transition-colors"
          >
            Botão Outline
          </button>
        </div>

        <!-- Cards de exemplo -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-primary-500 text-branco p-4 rounded-lg text-center">
            <h3 class="font-semibold">Card Verde</h3>
            <p class="text-primary-100 text-sm mt-1">Destaque principal</p>
          </div>

          <div
            class="bg-branco border-2 border-primary-500 text-primary-600 p-4 rounded-lg text-center"
          >
            <h3 class="font-semibold">Card Branco</h3>
            <p class="text-primary-400 text-sm mt-1">Conteúdo secundário</p>
          </div>

          <div
            class="bg-primary-50 text-primary-700 p-4 rounded-lg text-center border border-primary-200"
          >
            <h3 class="font-semibold">Card Suave</h3>
            <p class="text-primary-500 text-sm mt-1">Informação adicional</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Página de teste com as cores do projeto
</script>
