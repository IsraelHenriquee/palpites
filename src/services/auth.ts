import { supabase } from './supabase'
import type { Session } from '@supabase/supabase-js'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name?: string
}

export interface UserProfile {
  id?: number
  uuid: string
  nome: string
  foto?: string | null
}

export class AuthService {
  // Login do usuário
  static async login(data: LoginData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        throw new Error(error.message)
      }

      return {
        user: authData.user,
        session: authData.session,
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  // Criar nova conta
  static async register(data: RegisterData) {
    try {
      // Primeiro, registrar o usuário na autenticação
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      // Se o usuário foi criado com sucesso, salvar na tabela a_usuarios
      if (authData.user) {
        const { error: profileError } = await supabase.from('a_usuarios').insert({
          uuid: authData.user.id,
          nome: data.name,
          foto: null,
        })

        if (profileError) {
          console.error('Erro ao salvar perfil do usuário:', profileError)
          // Não vamos lançar erro aqui para não impedir o fluxo de autenticação
          // mas registramos o erro para fins de depuração
        }
      }

      return {
        user: authData.user,
        session: authData.session,
      }
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    }
  }

  // Logout do usuário
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  // Obter usuário atual
  static async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        throw new Error(error.message)
      }

      return user
    } catch (error) {
      console.error('Erro ao obter usuário:', error)
      throw error
    }
  }

  // Obter perfil do usuário da tabela a_usuarios
  static async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('a_usuarios')
        .select('*')
        .eq('uuid', userId)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data as UserProfile
    } catch (error) {
      console.error('Erro ao obter perfil do usuário:', error)
      throw error
    }
  }

  // Verificar se usuário está logado
  static async isAuthenticated() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      return !!session
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      return false
    }
  }

  // Escutar mudanças no estado de autenticação
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
