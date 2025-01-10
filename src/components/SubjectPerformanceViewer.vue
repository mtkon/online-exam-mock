<script setup lang="ts">
import { ref } from 'vue';
import RecommendedStudyPlan from './RecommendedStudyPlan.vue';

interface Question {
  id: number;
  type: string;
  score: number;
  correct: boolean;
}

interface Area {
  name: string;
  points: number;
  score: number;
  average: number;
  rate: number;
}

interface Subject {
  name: string;
  score: number;
  previousScore?: number;
  average: number;
  deviation: number;
  previousDeviation?: number;
  studyPlanPdf: string;
  questions: Question[];
  areas: Area[];
}

interface Props {
  subject: Subject;
  selectedTab: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'selectTab', tab: string): void;
}>();

const renderScoreChange = (current: number, previous?: number) => {
  if (!previous) return null;
  const diff = current - previous;
  const color = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';
  const icon = diff > 0 ? 'fa-arrow-up' : diff < 0 ? 'fa-arrow-down' : 'fa-minus';
  return { diff, color, icon };
};
</script>

<template>
  <div class="pt-16 pb-24 px-4">
    <div class="flex items-center mb-6">
      <button @click="emit('back')" class="mr-2 text-gray-600">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="text-2xl font-bold font-roboto">{{ subject.name }}の成績</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="text-center">
          <div class="text-sm text-gray-600">得点</div>
          <div class="flex flex-col items-center">
            <div class="font-bold text-lg">{{ subject.score }}点</div>
            <template v-if="renderScoreChange(subject.score, subject.previousScore)">
              <div :class="`text-sm ${renderScoreChange(subject.score, subject.previousScore)?.color} flex items-center gap-1`">
                <i :class="`fas ${renderScoreChange(subject.score, subject.previousScore)?.icon}`"></i>
                <span>{{ Math.abs(renderScoreChange(subject.score, subject.previousScore)?.diff || 0) }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">平均点</div>
          <div class="font-bold text-lg">{{ subject.average }}点</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">偏差値</div>
          <div class="flex flex-col items-center">
            <div class="font-bold text-lg">{{ subject.deviation }}</div>
            <template v-if="renderScoreChange(subject.deviation, subject.previousDeviation)">
              <div :class="`text-sm ${renderScoreChange(subject.deviation, subject.previousDeviation)?.color} flex items-center gap-1`">
                <i :class="`fas ${renderScoreChange(subject.deviation, subject.previousDeviation)?.icon}`"></i>
                <span>{{ Math.abs(renderScoreChange(subject.deviation, subject.previousDeviation)?.diff || 0) }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <RecommendedStudyPlan :pdf-url="subject.studyPlanPdf" />
    </div>

    <div class="mb-6">
      <div class="flex border-b">
        <button
          v-for="tab in ['問題別', '領域別']"
          :key="tab"
          @click="emit('selectTab', tab)"
          :class="`px-4 py-2 ${
            selectedTab === tab
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-4">
      <template v-if="selectedTab === '問題別'">
        <div>
          <div class="font-bold mb-4">問題別正答状況</div>
          <div class="space-y-4">
            <div
              v-for="q in subject.questions"
              :key="q.id"
              class="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-bold">問{{ q.id }}</div>
                  <div class="text-sm text-gray-600">{{ q.type }}</div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-sm">{{ q.score }}点</div>
                  <div
                    :class="`w-8 h-8 rounded-full flex items-center justify-center ${
                      q.correct
                        ? 'bg-blue-100 text-blue-500'
                        : 'bg-red-100 text-red-500'
                    }`"
                  >
                    <i :class="`fas ${q.correct ? 'fa-check' : 'fa-times'}`" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div>
          <div class="font-bold mb-4">領域別分析</div>
          <div class="space-y-4">
            <div
              v-for="area in subject.areas"
              :key="area.name"
              class="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-bold">{{ area.name }}</div>
                  <div class="text-sm text-gray-600">配点: {{ area.points }}点</div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-sm">得点: {{ area.score }}/{{ area.points }}</div>
                  <div class="text-sm text-gray-600">平均: {{ area.average }}</div>
                  <div class="text-sm text-blue-500">正答率: {{ area.rate }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>