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
  (e: 'logout'): void;
  (e: 'back'): void;
}>();
</script>

<template>
  <header v-if="user" class="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-2 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <button
        v-if="selectedStudent"
        @click="emit('back')"
        class="text-gray-600 hover:text-gray-800"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div class="text-xl font-bold font-roboto">オンライン模試</div>
    </div>
    <div class="flex items-center gap-4">
      <button
        @click="emit('logout')"
        class="text-sm px-3 py-1 hover:bg-gray-100 rounded"
      >
        <i class="fas fa-sign-out-alt mr-1"></i>
        ログアウト
      </button>
    </div>
  </header>
</template>