<script setup lang="ts">
import { computed } from 'vue';
import RecommendedStudyPlan from './RecommendedStudyPlan.vue';

interface Subject {
  name: string;
  score: number;
  previousScore?: number;
  deviation: number;
  previousDeviation?: number;
  average: number;
}

interface Props {
  examNumber: number;
  examDate: string;
  subjects: Subject[];
  pdfUrl: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'selectSubject', subject: Subject): void;
  (e: 'back'): void;
}>();

const renderScoreChange = (current: number, previous?: number) => {
  if (!previous) return null;
  const diff = current - previous;
  if (diff === 0) return null;

  return {
    diff,
    color: diff > 0 ? 'text-red-500' : 'text-blue-500',
    icon: `fas fa-arrow-${diff > 0 ? 'up' : 'down'}`
  };
};
</script>

<template>
  <div class="pt-16 pb-24 px-4">
    <div class="flex items-center mb-6">
      <button @click="emit('back')" class="mr-2 text-gray-600">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="text-2xl font-bold font-roboto">成績詳細</h1>
    </div>
    <div class="mb-6">
      <div class="font-bold mb-2">第{{ examNumber }}回 オンライン模試</div>
      <div class="text-sm text-gray-600">実施日: {{ examDate }}</div>
    </div>
    <RecommendedStudyPlan :pdf-url="pdfUrl" />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <button
        v-for="(subject, index) in subjects"
        :key="index"
        @click="emit('selectSubject', subject)"
        class="bg-white rounded-lg shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-lg">{{ subject.name }}</div>
            <div class="text-sm space-y-1">
              <div>
                得点: {{ subject.score }}点
                <template v-if="renderScoreChange(subject.score, subject.previousScore)">
                  <span :class="renderScoreChange(subject.score, subject.previousScore)?.color" class="ml-2 text-xs">
                    <i :class="renderScoreChange(subject.score, subject.previousScore)?.icon"></i>
                    {{ Math.abs(renderScoreChange(subject.score, subject.previousScore)?.diff || 0) }}
                  </span>
                </template>
              </div>
              <div>
                偏差値: {{ subject.deviation }}
                <template v-if="renderScoreChange(subject.deviation, subject.previousDeviation)">
                  <span :class="renderScoreChange(subject.deviation, subject.previousDeviation)?.color" class="ml-2 text-xs">
                    <i :class="renderScoreChange(subject.deviation, subject.previousDeviation)?.icon"></i>
                    {{ Math.abs(renderScoreChange(subject.deviation, subject.previousDeviation)?.diff || 0) }}
                  </span>
                </template>
              </div>
            </div>
          </div>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
      </button>
    </div>
  </div>
</template>