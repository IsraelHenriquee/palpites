import { ref, computed, onMounted } from 'vue'
import { AuthService, type LoginData, type RegisterData, type UserProfile } from '@/services/auth'
import { useRouter } from 'vue-router'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const userProfile = ref<UserProfile | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  const router = useRouter()

  // Estado computado
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.user_metadata?.name || user.value?.email)

  // Função de login
  const login = async (data: LoginData) => {
    try {
      loading.value = true
      error.value = null

      const result = await AuthService.login({
        email: data.email,
        password: data.password,
      })

      user.value = result.user

      // Redirecionar para página inicial após login
      await router.push('/')

      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro no login'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Função de registro
  const register = async (data: RegisterData) => {
    try {
      loading.value = true
      error.value = null

      const result = await AuthService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      user.value = result.user

      // Redirecionar para página inicial após registro
      await router.push('/')

      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro no registro'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Função de logout
  const logout = async () => {
    try {
      loading.value = true
      error.value = null

      await AuthService.logout()
      user.value = null

      // Redirecionar para página de login
      await router.push('/login')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro no logout'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Inicializar usuário
  const initializeAuth = async () => {
    try {
      loading.value = true
      const currentUser = await AuthService.getCurrentUser()
      user.value = currentUser

      // Se temos um usuário, buscar o perfil
      if (currentUser) {
        await loadUserProfile(currentUser.id)
      }
    } catch (err) {
      console.error('Erro ao inicializar auth:', err)
      user.value = null
      userProfile.value = null
    } finally {
      loading.value = false
    }
  }

  // Carregar perfil do usuário
  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await AuthService.getUserProfile(userId)
      userProfile.value = profile
    } catch (err) {
      console.error('Erro ao carregar perfil do usuário:', err)
      userProfile.value = null
    }
  }

  // Limpar erros
  const clearError = () => {
    error.value = null
  }

  // Escutar mudanças de autenticação
  const setupAuthListener = () => {
    AuthService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const sessionUser = session.user as User
        user.value = sessionUser
        // Carregar perfil quando o usuário faz login
        loadUserProfile(sessionUser.id)
      } else if (event === 'SIGNED_OUT') {
        user.value = null
        userProfile.value = null
      }
    })
  }

  // Inicializar ao montar
  onMounted(() => {
    initializeAuth()
    setupAuthListener()
  })

  return {
    // Estado
    user: computed(() => user.value),
    userProfile: computed(() => userProfile.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,
    userName,

    // Ações
    login,
    register,
    logout,
    clearError,
    initializeAuth,
    loadUserProfile,
  }
}
