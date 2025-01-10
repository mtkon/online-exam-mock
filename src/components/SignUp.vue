<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'setCurrentPage', page: string): void;
}>();

const signupSuccess = ref(false);
const isSubmitting = ref(false);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    signupSuccess.value = true;
    isSubmitting.value = false;
  }, 1000);
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-4 py-8 md:py-0 bg-gradient-to-b from-blue-50 to-white">
    <div class="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-4xl font-extrabold text-center mb-8 font-roboto text-blue-600">
        アカウント作成
      </h1>
      <template v-if="signupSuccess">
        <div class="text-center space-y-4">
          <div class="text-green-500 text-xl mb-4">
            <i class="fas fa-check-circle text-4xl mb-2"></i>
            <p class="font-bold">メールを送信しました</p>
          </div>
          <p class="text-gray-600">
            入力されたメールアドレスに案内メールを送信しました。
            メールの内容に従って、登録を完了してください。
          </p>
          <button
            @click="emit('setCurrentPage', 'signin')"
            class="text-blue-500 hover:underline font-bold"
          >
            ログインページに戻る
          </button>
        </div>
      </template>
      <template v-else>
        <form class="space-y-8" @submit="handleSubmit">
          <div class="space-y-6">
            <h2 class="text-2xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2">
              アカウント情報
            </h2>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">氏名</label>
              <input
                type="text"
                name="name"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">ふりがな</label>
              <input
                type="text"
                name="furigana"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">メールアドレス</label>
              <input
                type="email"
                name="email"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">電話番号</label>
              <input
                type="tel"
                name="phone"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">パスワード</label>
              <input
                type="password"
                name="password"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">パスワード(確認)</label>
              <input
                type="password"
                name="passwordConfirm"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div class="space-y-6 mt-10">
            <h2 class="text-2xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2">
              住所
            </h2>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">郵便番号</label>
              <input
                type="text"
                name="postalCode"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="123-4567"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">都道府県</label>
              <input
                type="text"
                name="prefecture"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">市区町村</label>
              <input
                type="text"
                name="city"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">番地</label>
              <input
                type="text"
                name="streetAddress"
                required
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-bold mb-2 text-gray-700">建物名・部屋番号</label>
              <input
                type="text"
                name="building"
                :disabled="isSubmitting"
                class="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div class="flex items-center mt-8">
            <input
              type="checkbox"
              name="terms"
              required
              class="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ml-3 text-sm font-bold text-gray-700">
              利用規約に同意します
            </label>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-bold mt-8 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
            <template v-else>アカウントを作成</template>
          </button>
        </form>
      </template>
      <p class="mt-8 text-center text-sm text-gray-600">
        既にアカウントをお持ちの方は
        <button
          @click="emit('setCurrentPage', 'signin')"
          class="text-blue-600 font-bold hover:text-blue-700 ml-1 transition duration-200 ease-in-out"
        >
          ログイン
        </button>
      </p>
    </div>
  </div>
</template>