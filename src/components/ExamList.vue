<script setup lang="ts">
interface Exam {
  id: number;
  title: string;
  date: string;
  isApplied: boolean;
}

interface Props {
  title: string;
  items: Exam[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'select', examId: number): void;
}>();
</script>

<template>
  <div class="pt-16 pb-24 px-4">
    <h1 class="text-2xl font-bold mb-6 font-roboto">{{ title }}</h1>
    <div class="space-y-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-lg shadow-sm p-4"
      >
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold">{{ item.title }}</div>
            <div class="text-sm text-gray-600">{{ item.date }}</div>
            <div v-if="item.isApplied" class="text-sm text-green-600 mt-1">
              申し込み済み
            </div>
          </div>
          <button
            @click="emit('select', item.id)"
            class="text-blue-600 hover:text-blue-700"
          >
            {{ item.isApplied ? "申込内容の確認" : "申し込む" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>