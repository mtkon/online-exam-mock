<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  examId: number;
  examTitle: string;
  examPeriod: string;
  price: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'success'): void;
  (e: 'back'): void;
}>();

const agreed = ref(false);
const loading = ref(false);

const handleProceed = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit('success');
  }, 1000);
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button
      @click="emit('back')"
      class="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg inline-flex items-center"
    >
      <i class="fas fa-arrow-left mr-2"></i>
      戻る
    </button>
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold mb-6 font-roboto">
        {{ examTitle }} お申し込み
      </h1>

      <div class="space-y-8">
        <section class="border-b pb-6">
          <h2 class="text-lg font-bold mb-4">試験情報</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">実施期間</span>
              <span>{{ examPeriod }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">受験科目</span>
              <span>国語・算数</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">受験料</span>
              <span class="font-bold">¥{{ price.toLocaleString() }}</span>
            </div>
          </div>
        </section>

        <section class="border-b pb-6">
          <h2 class="text-lg font-bold mb-4">支払い方法</h2>
          <p class="text-gray-600 mb-4">
            クレジットカード決済をご利用いただけます。
            以下のカードブランドに対応しています：
          </p>
          <div class="flex gap-4 mb-6">
            <i class="fab fa-cc-visa text-2xl"></i>
            <i class="fab fa-cc-mastercard text-2xl"></i>
            <i class="fab fa-cc-amex text-2xl"></i>
          </div>
        </section>

        <section class="border-b pb-6">
          <h2 class="text-lg font-bold mb-4">利用規約と同意事項</h2>
          <div class="space-y-4 text-sm text-gray-600">
            <div class="h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              <div class="space-y-4">
                <h3 class="font-bold">第1条（利用規約）</h3>
                <p>
                  本規約は、当社が提供するオンライン模試サービス（以下「本サービス」といいます）の利用に関する条件を定めるものです。
                </p>

                <h3 class="font-bold">第2条（サービスの内容）</h3>
                <p>
                  1. 本サービスは、インターネットを通じて受験できる模擬試験を提供します。
                  2. 試験時間は各科目40分とし、制限時間を超過した場合は自動的に終了となります。
                  3. 採点結果は試験終了後、5営業日以内に提供されます。
                </p>
              </div>
            </div>
            <div class="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                id="agreement"
                class="mt-1"
                v-model="agreed"
              />
              <label for="agreement">
                利用規約と同意事項の内容を確認し、同意します
              </label>
            </div>
          </div>
        </section>

        <div class="pt-4">
          <button
            @click="handleProceed"
            :disabled="!agreed || loading"
            :class="{
              'w-full py-3 rounded-lg text-white font-bold': true,
              'bg-blue-600 hover:bg-blue-700': agreed && !loading,
              'bg-gray-400 cursor-not-allowed': !agreed || loading
            }"
          >
            <i :class="loading ? 'fas fa-spinner fa-spin mr-2' : 'fas fa-lock mr-2'"></i>
            決済画面へ進む（¥{{ price.toLocaleString() }}）
          </button>
        </div>
      </div>
    </div>
  </div>
</template>