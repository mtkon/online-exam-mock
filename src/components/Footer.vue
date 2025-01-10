<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  user?: {
    email: string;
  } | null;
  selectedStudent?: {
    name: string;
    grade: number;
  } | null;
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  selectedStudent: null
});

const emit = defineEmits<{
  (e: 'navigate', page: string): void;
}>();
</script>

<template>
  <footer
    v-if="user && selectedStudent"
    class="fixed bottom-0 left-0 right-0 bg-white shadow-md px-4 py-2"
  >
    <nav class="flex justify-around">
      <button
        @click="emit('navigate', 'dashboard')"
        class="text-center px-2 py-1 hover:bg-gray-100 rounded"
      >
        <i class="fas fa-home text-lg"></i>
        <div class="text-xs mt-1">ホーム</div>
      </button>
      <button
        @click="emit('navigate', 'exams')"
        class="text-center px-2 py-1 hover:bg-gray-100 rounded"
      >
        <i class="fas fa-file-alt text-lg"></i>
        <div class="text-xs mt-1">模試申込</div>
      </button>
      <button
        @click="emit('navigate', 'results')"
        class="text-center px-2 py-1 hover:bg-gray-100 rounded"
      >
        <i class="fas fa-chart-bar text-lg"></i>
        <div class="text-xs mt-1">成績確認</div>
      </button>
      <button
        @click="emit('navigate', 'learningMaterials')"
        class="text-center px-2 py-1 hover:bg-gray-100 rounded"
      >
        <i class="fas fa-book text-lg"></i>
        <div class="text-xs mt-1">学習教材</div>
      </button>
    </nav>
  </footer>
</template>