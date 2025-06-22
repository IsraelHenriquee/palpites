<template>
  <div class="max-w-lg mx-auto bg-branco rounded-lg shadow-md p-8">
    <!-- Título -->
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-primary-700">Palpites Copa do Mundo de Clubes</h2>
    </div>

    <!-- Mensagem de Erro -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {{ error }}
      <button @click="clearError" class="float-right text-red-500 hover:text-red-700">✕</button>
    </div>

    <!-- Abas -->
    <div class="flex mb-6">
      <button
        @click="activeTab = 'login'"
        :class="[
          'flex-1 py-2 px-4 text-center font-medium transition-colors',
          activeTab === 'login'
            ? 'bg-primary-500 text-branco rounded-l-lg'
            : 'bg-secondary-200 text-secondary-600 rounded-l-lg hover:bg-secondary-300',
        ]"
      >
        Login
      </button>
      <button
        @click="activeTab = 'register'"
        :class="[
          'flex-1 py-2 px-4 text-center font-medium transition-colors',
          activeTab === 'register'
            ? 'bg-primary-500 text-branco rounded-r-lg'
            : 'bg-secondary-200 text-secondary-600 rounded-r-lg hover:bg-secondary-300',
        ]"
      >
        Criar Conta
      </button>
    </div>

    <!-- Conteúdo das Abas -->
    <div>
      <!-- Aba Login -->
      <div v-if="activeTab === 'login'">
        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <!-- Email -->
            <div>
              <label for="login-email" class="block text-sm font-medium text-secondary-700 mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                v-model="loginForm.email"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Digite seu email"
              />
            </div>

            <!-- Senha -->
            <div>
              <label for="login-password" class="block text-sm font-medium text-secondary-700 mb-1">
                Senha
              </label>
              <input
                id="login-password"
                type="password"
                v-model="loginForm.password"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Digite sua senha"
              />
            </div>

            <!-- Botão Login -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary-500 hover:bg-primary-600 text-branco font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Entrando...</span>
              <span v-else>Entrar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Aba Criar Conta -->
      <div v-if="activeTab === 'register'">
        <form @submit.prevent="handleRegister">
          <div class="space-y-4">
            <!-- Nome -->
            <div>
              <label for="register-nome" class="block text-sm font-medium text-secondary-700 mb-1">
                Nome
              </label>
              <input
                id="register-nome"
                type="text"
                v-model="registerForm.nome"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Digite seu nome"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="register-email" class="block text-sm font-medium text-secondary-700 mb-1">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                v-model="registerForm.email"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Digite seu email"
              />
            </div>

            <!-- Senha -->
            <div>
              <label for="register-senha" class="block text-sm font-medium text-secondary-700 mb-1">
                Senha
              </label>
              <input
                id="register-senha"
                type="password"
                v-model="registerForm.senha"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Digite sua senha (mínimo 6 caracteres)"
                minlength="6"
              />
            </div>

            <!-- Confirmar Senha -->
            <div>
              <label
                for="register-confirmar-senha"
                class="block text-sm font-medium text-secondary-700 mb-1"
              >
                Confirmar Senha
              </label>
              <input
                id="register-confirmar-senha"
                type="password"
                v-model="registerForm.confirmarSenha"
                required
                :disabled="loading"
                class="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-secondary-100"
                placeholder="Confirme sua senha"
                minlength="6"
              />
            </div>

            <!-- Botão Criar Conta -->
            <button
              type="submit"
              :disabled="loading || !passwordsMatch"
              class="w-full bg-primary-500 hover:bg-primary-600 text-branco font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Criando conta...</span>
              <span v-else>Criar Conta</span>
            </button>

            <!-- Aviso de senhas não conferem -->
            <p v-if="registerForm.confirmarSenha && !passwordsMatch" class="text-red-500 text-sm">
              As senhas não conferem
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToast } from 'vue-toastification'

const { login, register, loading, error, clearError } = useAuth()
const toast = useToast()

const activeTab = ref<'login' | 'register'>('login')

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
})

// Verificar se senhas conferem
const passwordsMatch = computed(() => {
  return registerForm.value.senha === registerForm.value.confirmarSenha
})

// Função de login
const handleLogin = async () => {
  try {
    await login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    })

    // Toast de sucesso no login
    toast.success('Login realizado com sucesso! Bem-vindo! 🎉', {
      timeout: 2500,
    })
  } catch (err) {
    // Erro já tratado no composable, mas mostrar toast adicional
    console.error('Erro no login:', err)
  }
}

// Função de registro
const handleRegister = async () => {
  if (!passwordsMatch.value) {
    toast.warning('As senhas não conferem! ⚠️', {
      timeout: 2500,
    })
    return
  }

  try {
    await register({
      name: registerForm.value.nome,
      email: registerForm.value.email,
      password: registerForm.value.senha,
    })

    // Toast de sucesso no registro
    toast.success('Conta criada com sucesso! Bem-vindo ao Palpites Brasil! 🇧🇷', {
      timeout: 3000,
    })
  } catch (err) {
    // Erro já tratado no composable
    console.error('Erro no registro:', err)
  }
}
</script>
