<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  examId: number;
  examTitle: string;
  examDate: string;
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
        {{ examTitle }} 申込確認
      </h1>
      <div class="space-y-8">
        <section class="border-b pb-6">
          <h2 class="text-lg font-bold mb-4">試験情報</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">試験日</span>
              <span>{{ examDate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">受験科目</span>
              <span>国語・算数</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">試験時間</span>
              <span>各科目40分</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">受験料</span>
              <span>¥{{ price.toLocaleString() }} (支払い済み)</span>
            </div>
          </div>
        </section>
        <section class="border-b pb-6">
          <h2 class="text-lg font-bold mb-4">受験に関する注意事項</h2>
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                <span class="font-bold">試験当日の持ち物</span>
              </div>
              <p class="text-sm">試験当日の持ち物は不要です。</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <i class="fas fa-clock text-yellow-600 mr-2"></i>
                <span class="font-bold">試験開始時刻</span>
              </div>
              <p class="text-sm">
                試験開始10分前までにログインを完了してください。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>