<template>
  <div
    class="bg-branco rounded-lg shadow-md p-5 mb-6 border-l-4 hover:shadow-lg transition-shadow"
    :class="{ 'border-green-500': partida.aberto, 'border-red-500': !partida.aberto }"
  >
    <!-- Cabeçalho do Card -->
    <div class="flex justify-between items-center mb-4">
      <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
        Rodada {{ partida.rodada }}
      </span>
      <div class="flex items-center space-x-2">
        <span class="text-xs text-secondary-400 font-mono"> #{{ partida.id_partida }} </span>
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium flex items-center',
            partida.aberto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
          ]"
        >
          <span
            class="w-2 h-2 rounded-full mr-1"
            :class="partida.aberto ? 'bg-green-500' : 'bg-red-500'"
          ></span>
          {{ partida.aberto ? 'Aberto' : 'Fechado' }}
        </span>
      </div>
    </div>

    <!-- Conteúdo da Partida -->
    <div class="flex items-center justify-between">
      <!-- Time Mandante -->
      <div class="flex flex-col items-center w-2/5">
        <div class="w-20 h-20 mb-3 bg-gray-50 rounded-full p-2 flex items-center justify-center">
          <img
            :src="partida.mandante_foto"
            :alt="partida.mandante_nome"
            class="w-full h-full object-contain"
            onerror="this.src='https://via.placeholder.com/80?text=Time'"
          />
        </div>
        <p class="text-center font-medium text-secondary-800 text-sm md:text-base">
          {{ partida.mandante_nome }}
        </p>
      </div>

      <!-- Placar / Palpite -->
      <div class="flex flex-col items-center w-1/5">
        <!-- Resultado da Partida (se não estiver aberto e tiver resultado) -->
        <div
          v-if="
            !partida.aberto &&
            (partida.gols_mandante_partida !== null || partida.gols_visitante_partida !== null)
          "
          class="mb-2"
        >
          <div class="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-2">
            <span class="text-xl font-bold text-secondary-800">{{
              partida.gols_mandante_partida ?? '-'
            }}</span>
            <span class="mx-2 text-secondary-500">x</span>
            <span class="text-xl font-bold text-secondary-800">{{
              partida.gols_visitante_partida ?? '-'
            }}</span>
          </div>
          <p class="text-xs text-center text-secondary-500 mt-1">Resultado</p>
        </div>

        <!-- Palpite do Usuário -->
        <div v-if="partida.aberto">
          <!-- Counter buttons para palpite -->
          <div class="flex items-center justify-center space-x-4">
            <!-- Contador Mandante -->
            <div class="flex flex-col items-center">
              <button
                @click="incrementMandante"
                class="bg-primary-100 hover:bg-primary-200 text-primary-700 w-8 h-8 rounded-t-md flex items-center justify-center transition-colors"
              >
                <span class="text-lg">+</span>
              </button>
              <div
                class="w-8 h-10 bg-white border-x border-y border-secondary-300 flex items-center justify-center font-bold text-lg"
              >
                {{ palpiteMandante }}
              </div>
              <button
                @click="decrementMandante"
                class="bg-primary-100 hover:bg-primary-200 text-primary-700 w-8 h-8 rounded-b-md flex items-center justify-center transition-colors"
                :disabled="palpiteMandante <= 0"
                :class="{ 'opacity-50 cursor-not-allowed': palpiteMandante <= 0 }"
              >
                <span class="text-lg">-</span>
              </button>
            </div>

            <span class="text-secondary-500 font-medium">x</span>

            <!-- Contador Visitante -->
            <div class="flex flex-col items-center">
              <button
                @click="incrementVisitante"
                class="bg-primary-100 hover:bg-primary-200 text-primary-700 w-8 h-8 rounded-t-md flex items-center justify-center transition-colors"
              >
                <span class="text-lg">+</span>
              </button>
              <div
                class="w-8 h-10 bg-white border-x border-y border-secondary-300 flex items-center justify-center font-bold text-lg"
              >
                {{ palpiteVisitante }}
              </div>
              <button
                @click="decrementVisitante"
                class="bg-primary-100 hover:bg-primary-200 text-primary-700 w-8 h-8 rounded-b-md flex items-center justify-center transition-colors"
                :disabled="palpiteVisitante <= 0"
                :class="{ 'opacity-50 cursor-not-allowed': palpiteVisitante <= 0 }"
              >
                <span class="text-lg">-</span>
              </button>
            </div>
          </div>
          <button
            @click="salvarPalpite"
            class="mt-3 bg-primary-500 hover:bg-primary-600 text-branco text-sm py-1 px-4 rounded-lg transition-colors w-full"
          >
            {{ partida.id_palpite ? 'Atualizar Palpite' : 'Salvar Palpite' }}
          </button>
        </div>

        <!-- Palpite já feito (quando fechado ou já palpitado) -->
        <div
          v-else-if="
            partida.gols_mandante_palpite !== null || partida.gols_visitante_palpite !== null
          "
          class="mb-2"
        >
          <div
            class="flex items-center justify-center bg-primary-50 rounded-lg px-4 py-2 border border-primary-200"
          >
            <span class="text-lg font-medium text-primary-700">{{
              partida.gols_mandante_palpite ?? '-'
            }}</span>
            <span class="mx-2 text-secondary-500">x</span>
            <span class="text-lg font-medium text-primary-700">{{
              partida.gols_visitante_palpite ?? '-'
            }}</span>
          </div>
          <p class="text-xs text-center text-secondary-500 mt-1">Seu palpite</p>
        </div>

        <!-- Sem palpite -->
        <div v-else class="mb-2">
          <p
            class="text-xs text-center text-red-500 bg-red-50 py-2 px-3 rounded-lg border border-red-100"
          >
            Sem palpite
          </p>
        </div>
      </div>

      <!-- Time Visitante -->
      <div class="flex flex-col items-center w-2/5">
        <div class="w-20 h-20 mb-3 bg-gray-50 rounded-full p-2 flex items-center justify-center">
          <img
            :src="partida.visitante_foto"
            :alt="partida.visitante_nome"
            class="w-full h-full object-contain"
            onerror="this.src='https://via.placeholder.com/80?text=Time'"
          />
        </div>
        <p class="text-center font-medium text-secondary-800 text-sm md:text-base">
          {{ partida.visitante_nome }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Partida } from '@/services/palpites'

const props = defineProps<{
  partida: Partida
}>()

// Inicializar com 0 se for nulo
const palpiteMandante = ref<number>(props.partida.gols_mandante_palpite ?? 0)
const palpiteVisitante = ref<number>(props.partida.gols_visitante_palpite ?? 0)

const emit = defineEmits<{
  (
    e: 'salvar-palpite',
    idPartida: number,
    golsMandante: number,
    golsVisitante: number,
    idPalpite?: number | null,
  ): void
}>()

// Funções para incrementar e decrementar os contadores
const incrementMandante = () => {
  palpiteMandante.value++
}

const decrementMandante = () => {
  if (palpiteMandante.value > 0) {
    palpiteMandante.value--
  }
}

const incrementVisitante = () => {
  palpiteVisitante.value++
}

const decrementVisitante = () => {
  if (palpiteVisitante.value > 0) {
    palpiteVisitante.value--
  }
}

const salvarPalpite = () => {
  emit(
    'salvar-palpite',
    props.partida.id_partida,
    palpiteMandante.value,
    palpiteVisitante.value,
    props.partida.id_palpite,
  )
}
</script>
