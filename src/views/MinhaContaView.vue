<template>
  <BaseLayout>
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">👤 Minha Conta</h1>
        <p class="text-gray-600">Informações do seu perfil</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"
        ></div>
        <p class="ml-3 text-gray-600">Carregando informações...</p>
      </div>

      <div v-else class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Header do Card -->
          <div class="px-6 py-4 bg-primary-500 text-white text-center">
            <h2 class="text-lg font-semibold">Perfil do Usuário</h2>
          </div>

          <!-- Conteúdo do Card -->
          <div class="p-6 text-center">
            <!-- Foto do Usuário -->
            <div class="mb-6">
              <div class="flex justify-center">
                <div v-if="userProfile?.foto" class="relative">
                  <img
                    :src="userProfile.foto"
                    :alt="userProfile.nome"
                    class="w-24 h-24 rounded-full object-cover border-4 border-primary-500 shadow-lg"
                  />
                </div>
                <div
                  v-else
                  class="w-24 h-24 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-primary-600 shadow-lg"
                >
                  {{ getInitials(userProfile?.nome || userName || 'U') }}
                </div>
              </div>
            </div>

            <!-- Nome do Usuário -->
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-1">
                {{ userProfile?.nome || userName || 'Usuário' }}
              </h3>
              <p class="text-gray-600 text-sm">
                {{ user?.email }}
              </p>
            </div>

            <!-- Informações Adicionais -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Status:</span>
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                  >
                    ✅ Ativo
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Último acesso:</span>
                  <span class="text-gray-900">Agora</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer do Card -->
          <div class="px-6 py-4 bg-gray-50 border-t text-center">
            <p class="text-xs text-gray-500">🏆 Boa sorte com seus palpites!</p>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { useAuth } from '@/composables/useAuth'

const { user, userProfile, loading, userName } = useAuth()

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2) // Máximo 2 iniciais
    .join('')
}
</script>
