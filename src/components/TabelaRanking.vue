<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="px-6 py-4 bg-primary-500 text-white">
      <h3 class="text-lg font-semibold">🏆 Ranking Geral</h3>
    </div>

    <div v-if="carregando" class="p-8 text-center">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"
      ></div>
      <p class="mt-2 text-gray-600">Carregando ranking...</p>
    </div>

    <div v-else-if="erro" class="p-8 text-center text-red-600">
      <p>❌ {{ erro }}</p>
      <button
        @click="carregarRanking"
        class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
      >
        Tentar novamente
      </button>
    </div>

    <div v-else-if="ranking.length === 0" class="p-8 text-center text-gray-500">
      <p>📊 Nenhum dados de ranking disponível ainda.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Posição
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Usuário
            </th>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Pontos
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(usuario, index) in ranking"
            :key="usuario.uuid"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium"
                  :class="getPosicaoClass(index + 1)"
                >
                  {{ getPosicaoEmoji(index + 1) }}{{ index + 1 }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10">
                  <img
                    v-if="usuario.foto"
                    :src="usuario.foto"
                    :alt="usuario.nome"
                    class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div
                    v-else
                    class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium text-sm"
                  >
                    {{ usuario.nome.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ usuario.nome }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                {{ usuario.pontos }} pts
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PalpitesService, type RankingUsuario } from '@/services/palpites'
import { useToast } from 'vue-toastification'

const toast = useToast()

const ranking = ref<RankingUsuario[]>([])
const carregando = ref(false)
const erro = ref<string | null>(null)

const carregarRanking = async () => {
  try {
    carregando.value = true
    erro.value = null

    ranking.value = await PalpitesService.buscarRankingPontuacao()
  } catch (error) {
    console.error('Erro ao carregar ranking:', error)
    erro.value = 'Erro ao carregar o ranking. Tente novamente.'
    toast.error('❌ Erro ao carregar ranking')
  } finally {
    carregando.value = false
  }
}

const getPosicaoClass = (posicao: number): string => {
  if (posicao === 1) return 'bg-yellow-500 text-white'
  if (posicao === 2) return 'bg-gray-400 text-white'
  if (posicao === 3) return 'bg-orange-600 text-white'
  return 'bg-gray-100 text-gray-700'
}

const getPosicaoEmoji = (posicao: number): string => {
  if (posicao === 1) return '🥇'
  if (posicao === 2) return '🥈'
  if (posicao === 3) return '🥉'
  return ''
}

onMounted(() => {
  carregarRanking()
})
</script>
