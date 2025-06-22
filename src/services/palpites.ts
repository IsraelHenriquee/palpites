import { supabase } from './supabase'

export interface Partida {
  id_partida: number
  rodada: number
  aberto: boolean
  gols_mandante_partida: number | null
  gols_visitante_partida: number | null
  mandante_nome: string
  mandante_foto: string
  visitante_nome: string
  visitante_foto: string
  gols_mandante_palpite: number | null
  gols_visitante_palpite: number | null
  id_palpite: number | null // ID do palpite se existe, null se não existe
}

export interface RankingUsuario {
  nome: string
  foto: string | null
  uuid: string
  pontos: number
}

export class PalpitesService {
  /**
   * Busca as partidas com os palpites do usuário
   * @param uuid_usuario UUID do usuário logado
   * @returns Array de partidas com os palpites do usuário
   */
  static async buscarPartidasComPalpites(uuid_usuario: string): Promise<Partida[]> {
    try {
      const { data, error } = await supabase.rpc('fn_partidas_com_palpites', {
        uuid_input: uuid_usuario,
      })

      if (error) {
        console.error('Erro ao buscar partidas com palpites:', error)
        throw error
      }

      return data as Partida[]
    } catch (error) {
      console.error('Erro ao buscar partidas com palpites:', error)
      throw error
    }
  }

  /**
   * Salva ou atualiza um palpite
   * @param uuid_usuario UUID do usuário
   * @param id_partida ID da partida
   * @param gols_mandante Gols do time mandante
   * @param gols_visitante Gols do time visitante
   * @param id_palpite ID do palpite existente (null para criar novo)
   * @returns ID do palpite (criado ou atualizado)
   */
  static async salvarPalpite(
    uuid_usuario: string,
    id_partida: number,
    gols_mandante: number,
    gols_visitante: number,
    id_palpite?: number | null,
  ): Promise<number> {
    try {
      if (id_palpite) {
        // Atualizar palpite existente
        const { error } = await supabase
          .from('a_palpites')
          .update({
            gols_mandante: gols_mandante,
            gols_visitante: gols_visitante,
          })
          .eq('id', id_palpite)

        if (error) {
          console.error('Erro ao atualizar palpite:', error)
          throw error
        }

        return id_palpite
      } else {
        // Criar novo palpite
        const { data, error } = await supabase
          .from('a_palpites')
          .insert([
            {
              uuid: uuid_usuario,
              id_partida: id_partida,
              gols_mandante: gols_mandante,
              gols_visitante: gols_visitante,
            },
          ])
          .select('id')
          .single()

        if (error) {
          console.error('Erro ao criar palpite:', error)
          throw error
        }

        return data.id
      }
    } catch (error) {
      console.error('Erro ao salvar palpite:', error)
      throw error
    }
  }

  /**
   * Busca o ranking de pontuação dos usuários
   * @returns Array de usuários ordenados por pontuação
   */
  static async buscarRankingPontuacao(): Promise<RankingUsuario[]> {
    try {
      const { data, error } = await supabase
        .from('vw_ranking_pontuacao')
        .select('nome, foto, uuid, pontos')

      if (error) {
        console.error('Erro ao buscar ranking de pontuação:', error)
        throw error
      }

      return data as RankingUsuario[]
    } catch (error) {
      console.error('Erro ao buscar ranking de pontuação:', error)
      throw error
    }
  }
}
