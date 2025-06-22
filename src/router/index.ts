import { createRouter, createWebHistory } from 'vue-router'
import PalpitesView from '../views/PalpitesView.vue'
import LoginView from '../views/LoginView.vue'
import RankingView from '../views/RankingView.vue'
import MinhaContaView from '../views/MinhaContaView.vue'
import RegrasView from '../views/RegrasView.vue'
import { AuthService } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'palpites',
      component: PalpitesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/palpites',
      redirect: '/', // Redireciona /palpites para a página inicial
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/minha-conta',
      name: 'minha-conta',
      component: MinhaContaView,
      meta: { requiresAuth: true },
    },
    {
      path: '/regras',
      name: 'regras',
      component: RegrasView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
  ],
})

// Guard para verificar autenticação
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await AuthService.isAuthenticated()

  // Se a rota requer autenticação e o usuário não está logado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // Se a rota é só para visitantes e o usuário está logado
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
