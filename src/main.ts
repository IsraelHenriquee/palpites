import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Toast notifications
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Configurar Toast
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  // Customização das cores para combinar com o tema
  toastDefaults: {
    success: {
      toastClassName: 'toast-success-custom',
    },
    error: {
      toastClassName: 'toast-error-custom',
    },
    info: {
      toastClassName: 'toast-info-custom',
    },
  },
})

app.mount('#app')
