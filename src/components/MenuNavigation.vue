<template>
  <nav class="bg-primary-500 text-branco shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Título -->
        <div class="flex-shrink-0">
          <h1 class="text-xl font-bold">Palpites Brasil 🇧🇷</h1>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-if="isAuthenticated"
              to="/palpites"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600"
              :class="{ 'bg-primary-600': $route.name === 'palpites' }"
            >
              Palpites
            </router-link>

            <router-link
              v-if="isAuthenticated"
              to="/ranking"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600"
              :class="{ 'bg-primary-600': $route.name === 'ranking' }"
            >
              Ranking
            </router-link>

            <router-link
              v-if="isAuthenticated"
              to="/minha-conta"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600"
              :class="{ 'bg-primary-600': $route.name === 'minha-conta' }"
            >
              Minha Conta
            </router-link>

            <div v-if="isAuthenticated" class="flex items-center space-x-4">
              <span class="text-sm text-primary-100"> Olá, {{ userName }} </span>
              <button
                @click="handleLogout"
                :disabled="loading"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600 disabled:opacity-50"
              >
                <span v-if="loading">Saindo...</span>
                <span v-else>Sair</span>
              </button>
            </div>

            <router-link
              to="/regras"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600"
              :class="{ 'bg-primary-600': $route.name === 'regras' }"
            >
              Regras
            </router-link>

            <router-link
              v-if="!isAuthenticated"
              to="/login"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-600"
              :class="{ 'bg-primary-600': $route.name === 'login' }"
            >
              Entrar
            </router-link>
          </div>
        </div>

        <!-- Menu Mobile - Botão -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile - Expandido -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-600">
        <router-link
          v-if="isAuthenticated"
          to="/palpites"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700"
          :class="{ 'bg-primary-700': $route.name === 'palpites' }"
          @click="mobileMenuOpen = false"
        >
          Palpites
        </router-link>

        <router-link
          v-if="isAuthenticated"
          to="/ranking"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700"
          :class="{ 'bg-primary-700': $route.name === 'ranking' }"
          @click="mobileMenuOpen = false"
        >
          Ranking
        </router-link>

        <router-link
          v-if="isAuthenticated"
          to="/minha-conta"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700"
          :class="{ 'bg-primary-700': $route.name === 'minha-conta' }"
          @click="mobileMenuOpen = false"
        >
          Minha Conta
        </router-link>

        <div v-if="isAuthenticated" class="border-t border-primary-500 pt-2">
          <div class="px-3 py-2 text-sm text-primary-100">Olá, {{ userName }}</div>
          <button
            @click="handleLogout"
            :disabled="loading"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700 disabled:opacity-50"
          >
            <span v-if="loading">Saindo...</span>
            <span v-else>Sair</span>
          </button>
        </div>

        <router-link
          to="/regras"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700"
          :class="{ 'bg-primary-700': $route.name === 'regras' }"
          @click="mobileMenuOpen = false"
        >
          Regras
        </router-link>

        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-primary-700"
          :class="{ 'bg-primary-700': $route.name === 'login' }"
          @click="mobileMenuOpen = false"
        >
          Entrar
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from 'vue-toastification'

const { isAuthenticated, userName, logout, loading } = useAuth()
const toast = useToast()

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleLogout = async () => {
  try {
    await logout()
    mobileMenuOpen.value = false

    // Toast de logout
    toast.info('Logout realizado com sucesso! Até logo! 👋', {
      timeout: 2500,
    })
  } catch (err) {
    console.error('Erro no logout:', err)
    toast.error('Erro ao fazer logout. Tente novamente! ❌')
  }
}
</script>
