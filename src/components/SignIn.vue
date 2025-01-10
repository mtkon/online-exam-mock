<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'setUser', user: { email: string }): void;
  (e: 'setCurrentPage', page: string): void;
}>();

const handleLogin = () => {
  emit('setUser', { email: 'test@example.com' });
  emit('setCurrentPage', 'dashboard');
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-4 py-8 md:py-0 bg-gradient-to-b from-blue-50 to-white">
    <div class="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-4xl font-bold text-center mb-8 font-roboto text-blue-600">
        オンライン模試
      </h1>
      <form class="space-y-6" @submit.prevent>
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-700">
            メールアドレス
          </label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
            <input
              type="email"
              name="email"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@email.com"
              required
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-700">
            パスワード
          </label>
          <div class="relative">
            <i class="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              type="password"
              name="password"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <button
          @click="handleLogin"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          ログイン
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        アカウントをお持ちでない方は
        <button
          @click="emit('setCurrentPage', 'signup')"
          class="text-blue-600 font-medium hover:text-blue-700"
        >
          新規登録
        </button>
      </p>
    </div>
  </div>
</template>