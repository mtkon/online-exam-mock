<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title?: string;
  selectedStudent?: {
    name: string;
    grade: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  title: '生徒ダッシュボード',
  selectedStudent: () => ({ name: '山田太郎', grade: 3 })
});

const emit = defineEmits<{
  (e: 'editStudent', student: typeof props.selectedStudent): void;
  (e: 'deleteStudent', student: typeof props.selectedStudent): void;
  (e: 'applyForExams'): void;
  (e: 'viewResults'): void;
  (e: 'addMaterials'): void;
}>();
</script>

<template>
  <div class="pt-16 pb-24 px-4">
    <h1 class="text-2xl font-bold mb-6 font-roboto">{{ title }}</h1>
    <div class="space-y-6 max-w-lg mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="font-bold text-lg">{{ selectedStudent.name }}</div>
            <div class="text-sm text-gray-600">{{ selectedStudent.grade }}年生</div>
          </div>
          <div class="flex gap-4">
            <button
              @click="emit('editStudent', selectedStudent)"
              class="text-gray-600 hover:text-blue-600"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="emit('deleteStudent', selectedStudent)"
              class="text-gray-600 hover:text-red-600"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <button
          @click="emit('applyForExams')"
          class="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <i class="fas fa-file-alt text-2xl text-blue-500 mb-2"></i>
              <div class="font-bold">模試申し込み</div>
              <div class="text-sm text-gray-600">オンライン模試の申し込み</div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
          </div>
        </button>

        <button
          @click="emit('viewResults')"
          class="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <i class="fas fa-chart-bar text-2xl text-blue-500 mb-2"></i>
              <div class="font-bold">成績確認</div>
              <div class="text-sm text-gray-600">模試の成績を確認</div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
          </div>
        </button>

        <button
          @click="emit('addMaterials')"
          class="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <i class="fas fa-book text-2xl text-blue-500 mb-2"></i>
              <div class="font-bold">学習教材追加</div>
              <div class="text-sm text-gray-600">学習教材の追加</div>
            </div>
            <i class="fas fa-chevron-right text-gray-400"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>