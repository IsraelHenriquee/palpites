<template>
  <BaseLayout>
    <div class="max-w-4xl mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">📋 Regras do Jogo</h1>
        <p class="text-gray-600">Confira as regras e como pontuar no campeonato!</p>
      </div>

      <div class="space-y-8">
        <!-- Premiação -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-yellow-500 text-white">
            <h2 class="text-xl font-semibold flex items-center">🏆 Premiação</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div class="text-3xl mb-2">🥇</div>
                <div class="text-lg font-bold text-yellow-700">1º Lugar</div>
                <div class="text-2xl font-bold text-green-600">R$ 100,00</div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div class="text-3xl mb-2">🥈</div>
                <div class="text-lg font-bold text-gray-700">2º Lugar</div>
                <div class="text-2xl font-bold text-green-600">R$ 75,00</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div class="text-3xl mb-2">🥉</div>
                <div class="text-lg font-bold text-orange-700">3º Lugar</div>
                <div class="text-2xl font-bold text-green-600">R$ 50,00</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regras de Participação -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-red-500 text-white">
            <h2 class="text-xl font-semibold flex items-center">⚠️ Regras de Participação</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5"
                >
                  <span class="text-red-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">📧 Email Verdadeiro Obrigatório</h3>
                  <p class="text-gray-600">
                    É obrigatório usar um email verdadeiro e válido para participar do campeonato.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5"
                >
                  <span class="text-red-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">📸 Foto Real Obrigatória</h3>
                  <p class="text-gray-600 mb-2">
                    É obrigatório ter uma foto de perfil que seja da pessoa real.
                  </p>
                  <div class="bg-red-50 p-3 rounded-lg">
                    <p class="text-red-700 text-sm font-medium">❌ NÃO são permitidas:</p>
                    <ul class="text-red-600 text-sm mt-1 space-y-1">
                      <li>• Fotos geradas por IA (Inteligência Artificial)</li>
                      <li>• Fotos de animais</li>
                      <li>• Fotos de personagens, desenhos ou memes</li>
                      <li>• Fotos de outras pessoas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sistema de Pontuação -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 bg-primary-500 text-white">
            <h2 class="text-xl font-semibold flex items-center">🎯 Sistema de Pontuação</h2>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <!-- Regra 1 -->
              <div class="border-l-4 border-primary-500 pl-4">
                <h3 class="font-semibold text-gray-900 mb-2">🏁 Acertar o Resultado Geral</h3>
                <p class="text-gray-700 mb-2">
                  <span
                    class="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    +20 pontos
                  </span>
                </p>
                <p class="text-gray-600">
                  Se acertar quem ganhou o jogo ou se deu empate, independente do placar.
                </p>
              </div>

              <!-- Regra 2 -->
              <div class="border-l-4 border-green-500 pl-4">
                <h3 class="font-semibold text-gray-900 mb-2">⚽ Acertar Número de Gols</h3>
                <p class="text-gray-700 mb-2">
                  <span
                    class="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    +20 pontos por gol acertado
                  </span>
                </p>
                <p class="text-gray-600 mb-3">
                  Para cada placar individual que acertar (mandante ou visitante).
                </p>

                <!-- Exemplo Prático -->
                <div class="bg-green-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-green-800 mb-2">📝 Exemplo Prático:</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">Resultado real do jogo:</span>
                      <span class="font-bold text-gray-900">1 x 3</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-gray-700">Seu palpite:</span>
                      <span class="font-bold text-gray-900">1 x 2</span>
                    </div>
                    <hr class="my-2" />
                    <div class="space-y-1">
                      <div class="flex items-center justify-between">
                        <span class="text-green-700">✅ Acertou o 1 do mandante:</span>
                        <span class="font-bold text-green-600">+20 pts</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-green-700">✅ Acertou que o visitante venceu:</span>
                        <span class="font-bold text-green-600">+20 pts</span>
                      </div>
                      <div class="flex items-center justify-between border-t pt-1">
                        <span class="font-bold text-green-800">Total ganho:</span>
                        <span class="font-bold text-green-800">40 pontos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Placar Exato -->
              <div class="border-l-4 border-purple-500 pl-4">
                <h3 class="font-semibold text-gray-900 mb-2">🎯 Placar Exato (Bônus Máximo)</h3>
                <p class="text-gray-700 mb-2">
                  <span
                    class="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    +60 pontos total
                  </span>
                </p>
                <p class="text-gray-600">
                  Ao acertar o placar exato, você ganha: 20 pts (resultado) + 20 pts (gols mandante)
                  + 20 pts (gols visitante)
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Dicas -->
        <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 class="font-semibold text-blue-900 mb-3 flex items-center">💡 Dicas Importantes</h3>
          <ul class="space-y-2 text-blue-800">
            <li class="flex items-start space-x-2">
              <span class="text-blue-600">•</span>
              <span>Faça seus palpites antes do início de cada partida</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-600">•</span>
              <span>Você pode editar seus palpites até o jogo começar</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-600">•</span>
              <span>Acompanhe o ranking para ver sua posição</span>
            </li>
            <li class="flex items-start space-x-2">
              <span class="text-blue-600">•</span>
              <span>Em caso de empate na pontuação, vale quem fez o palpite primeiro</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
</script>
