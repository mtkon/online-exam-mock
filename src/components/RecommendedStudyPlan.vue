<script setup lang="ts">
interface Props {
  pdfUrl: string;
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: '今後の学習プランのおすすめ',
  description: 'あなたに合わせた学習プランをご確認ください'
});
</script>

<template>
  <a
    :href="pdfUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="block w-full bg-green-50 rounded-lg p-4 text-left hover:bg-green-100 transition-colors mb-6"
  >
    <div class="flex items-center justify-between">
      <div>
        <div class="font-bold text-green-800">{{ title }}</div>
        <div class="text-sm text-green-600">{{ description }}</div>
      </div>
      <i class="fas fa-file-pdf text-green-600 text-xl"></i>
    </div>
  </a>
</template>