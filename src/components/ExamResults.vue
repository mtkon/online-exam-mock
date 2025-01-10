<script setup lang="ts">
import RecommendedStudyPlan from './RecommendedStudyPlan.vue';

interface Score {
  subject: string;
  value: number;
}

interface Exam {
  title: string;
  date: string;
  scores: Score[];
  nextStepsPdf: string;
}

interface Props {
  studentName: string;
  studentGrade: number;
  exams: Exam[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'selectExam', index: number): void;
}>();

const getScoreDifference = (currentScore: number, index: number, subject: string, examIndex: number) => {
  if (examIndex === 0) return null;
  const previousExam = props.exams[examIndex - 1];
  const previousScore = previousExam.scores.find(s => s.subject === subject);
  if (!previousScore) return null;
  return currentScore - previousScore.value;
};

const renderScoreDifference = (difference: number | null) => {
  if (difference === null) return null;
  const color = difference > 0 ? 'text-red-500' : 'text-blue-500';
  const sign = difference > 0 ? '+' : '';
  return { color, text: `${sign}${difference}` };
};
</script>

<template>
  <div class="pt-16 pb-24 px-4">
    <h1 class="text-2xl font-bold mb-6 font-roboto">成績一覧</h1>
    <div class="mb-4 p-4 bg-blue-50 rounded">
      <div class="font-bold">{{ studentName }}</div>
      <div class="text-sm text-gray-600">{{ studentGrade }}年生</div>
    </div>
    <div class="space-y-4">
      <div v-for="(exam, examIndex) in exams" :key="examIndex" class="space-y-2">
        <button
          @click="emit('selectExam', examIndex)"
          class="w-full bg-white rounded-lg shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="font-bold">{{ exam.title }}</div>
            <i class="fas fa-chevron-right text-gray-400"></i>
          </div>
          <div class="text-sm text-gray-600">実施日: {{ exam.date }}</div>
          <div class="mt-4 grid grid-cols-3 gap-4">
            <div
              v-for="(score, idx) in exam.scores"
              :key="idx"
              class="text-center"
            >
              <div class="font-bold">{{ score.subject }}</div>
              <div class="flex flex-col items-center">
                <div class="text-sm">{{ score.value }}点</div>
                <template v-if="renderScoreDifference(getScoreDifference(score.value, idx, score.subject, examIndex))">
                  <div :class="renderScoreDifference(getScoreDifference(score.value, idx, score.subject, examIndex))?.color">
                    {{ renderScoreDifference(getScoreDifference(score.value, idx, score.subject, examIndex))?.text }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </button>
        <RecommendedStudyPlan :pdf-url="exam.nextStepsPdf" />
      </div>
    </div>
  </div>
</template>