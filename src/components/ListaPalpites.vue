<template>
  <div>
    <!-- Navegação por rodadas (simples) -->
    <div class="flex items-center justify-center mb-6">
      <button
        @click="rodadaAnterior"
        class="bg-primary-500 hover:bg-primary-600 text-branco px-4 py-2 rounded-l-md"
        :disabled="rodadaAtual <= 2"
        :class="{ 'opacity-50 cursor-not-allowed': rodadaAtual <= 2 }"
      >
        &lt;
      </button>
      <div class="bg-primary-100 px-6 py-2 font-medium text-primary-800">
        Rodada {{ rodadaAtual }}
      </div>
      <button
        @click="proximaRodada"
        class="bg-primary-500 hover:bg-primary-600 text-branco px-4 py-2 rounded-r-md"
        :disabled="rodadaAtual >= 7"
        :class="{ 'opacity-50 cursor-not-allowed': rodadaAtual >= 7 }"
      >
        &gt;
      </button>
    </div>

    <!-- Conteúdo principal -->
    <div class="pt-2">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-10">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-4"
        ></div>
        <p class="text-secondary-600">Carregando partidas...</p>
      </div>

      <!-- Cards de Partidas -->
      <div v-else>
        <div v-if="partidasFiltradas.length === 0" class="text-center py-10">
          <p class="text-secondary-600">Nenhuma partida disponível para esta rodada.</p>
        </div>
        <PartidaCard
          v-for="partida in partidasFiltradas"
          :key="partida.id_partida"
          :partida="partida"
          @salvar-palpite="handleSalvarPalpite"
          class="mb-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PalpitesService, type Partida } from '@/services/palpites'
import { useAuth } from '@/composables/useAuth'
import PartidaCard from '@/components/PartidaCard.vue'
import { useToast } from 'vue-toastification'

// Estados
const partidas = ref<Partida[]>([])
const loading = ref(false)
const rodadaAtual = ref(2) // Começa na rodada 2

// Obter usuário atual e estado de autenticação
const { user, isAuthenticated, loading: authLoading } = useAuth()

// Toast para notificações
const toast = useToast()

// Filtrar partidas pela rodada atual
const partidasFiltradas = computed(() => {
  return partidas.value.filter((partida) => partida.rodada === rodadaAtual.value)
})

// Navegação entre rodadas
const rodadaAnterior = () => {
  if (rodadaAtual.value > 2) {
    // Mínimo é rodada 2
    rodadaAtual.value--
  }
}

const proximaRodada = () => {
  if (rodadaAtual.value < 7) {
    // Máximo é rodada 7
    rodadaAtual.value++
  }
}

// Carregar partidas do backend
const carregarPartidas = async () => {
  // Não fazer nada se a autenticação ainda estiver carregando
  if (authLoading.value) return

  loading.value = true

  try {
    // Se o usuário estiver logado, buscar partidas do backend
    if (user.value?.id) {
      console.log('Buscando partidas para o usuário:', user.value.id)
      const partidasData = await PalpitesService.buscarPartidasComPalpites(user.value.id)
      partidas.value = partidasData
    } else {
      // Se não estiver logado, não exibir nada
      partidas.value = []
    }
  } catch (err) {
    console.error('Erro ao carregar partidas:', err)
    partidas.value = []

    // Toast de erro ao carregar partidas
    toast.error('Erro ao carregar partidas. Verifique sua conexão! 🔄', {
      timeout: 3000,
    })
  } finally {
    loading.value = false
  }
}

// Função para lidar com o evento de salvar palpite
const handleSalvarPalpite = async (
  idPartida: number,
  golsMandante: number,
  golsVisitante: number,
  idPalpite?: number | null,
) => {
  if (!user.value?.id) {
    console.error('Usuário não encontrado')
    return
  }

  try {
    console.log(
      `${idPalpite ? 'Atualizando' : 'Criando'} palpite: Partida ${idPartida}, ${golsMandante} x ${golsVisitante}`,
    )

    // Salvar no backend
    const palpiteId = await PalpitesService.salvarPalpite(
      user.value.id,
      idPartida,
      golsMandante,
      golsVisitante,
      idPalpite,
    )

    // Atualizar o estado local
    const partidaIndex = partidas.value.findIndex((p) => p.id_partida === idPartida)
    if (partidaIndex !== -1) {
      partidas.value[partidaIndex].gols_mandante_palpite = golsMandante
      partidas.value[partidaIndex].gols_visitante_palpite = golsVisitante
      partidas.value[partidaIndex].id_palpite = palpiteId
    }

    // Mostrar toast de sucesso
    if (idPalpite) {
      toast.success(`Palpite atualizado: ${golsMandante} x ${golsVisitante}! ✅`, {
        timeout: 2500,
      })
    } else {
      toast.success(`Palpite salvo: ${golsMandante} x ${golsVisitante}! ⚽`, {
        timeout: 2500,
      })
    }

    console.log(`Palpite ${idPalpite ? 'atualizado' : 'criado'} com sucesso!`)
  } catch (error) {
    console.error('Erro ao salvar palpite:', error)

    // Mostrar toast de erro
    toast.error(`Erro ao ${idPalpite ? 'atualizar' : 'salvar'} palpite. Tente novamente! ❌`, {
      timeout: 4000,
    })
  }
}

// Observar mudanças no estado de autenticação
watch(
  () => [isAuthenticated.value, authLoading.value],
  ([isAuth, isLoading]) => {
    // Só carregar partidas quando a autenticação estiver completa e o usuário estiver logado
    if (!isLoading && isAuth) {
      carregarPartidas()
    } else if (!isLoading && !isAuth) {
      // Se não estiver logado e a autenticação estiver completa, limpar os dados
      partidas.value = []
    }
  },
  { immediate: true }, // Executar imediatamente na montagem do componente
)
</script>
