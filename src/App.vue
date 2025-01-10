<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Dashboard from './components/Dashboard.vue';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import ExamList from './components/ExamList.vue';
import ExamResults from './components/ExamResults.vue';
import ExamRequestConfirm from './components/ExamRequestConfirm.vue';
import ExamRequest from './components/ExamRequest.vue';
import ExamSubjectsResults from './components/ExamSubjectsResults.vue';
import SubjectPerformanceViewer from './components/SubjectPerformanceViewer.vue';

const currentComponent = ref('signin');
const user = ref<{ email: string } | null>(null);
const selectedStudent = ref<{ name: string; grade: number } | null>({ name: '山田太郎', grade: 3 });
const selectedSubject = ref(null);
const selectedTab = ref('問題別');
const selectedExam = ref(null);
const selectedExamResult = ref(null);

// Mock data
const examItems = ref([
  {
    id: 1,
    title: "第1回 オンライン模試",
    date: "2024/01/01",
    isApplied: true,
  },
  {
    id: 2,
    title: "第2回 オンライン模試",
    date: "2024/02/01",
    isApplied: false,
  },
  {
    id: 3,
    title: "第3回 オンライン模試",
    date: "2024/03/01",
    isApplied: false,
  },
]);

const examResults = ref([
  {
    title: "第1回 オンライン模試",
    date: "2024/01/01",
    scores: [
      { subject: "国語", value: 85 },
      { subject: "算数", value: 90 },
    ],
    nextStepsPdf: "/nextsteps/exam1.pdf",
  },
  {
    title: "第2回 オンライン模試",
    date: "2024/02/01",
    scores: [
      { subject: "国語", value: 78 },
      { subject: "算数", value: 82 },
    ],
    nextStepsPdf: "/nextsteps/exam2.pdf",
  },
]);

const subjects = ref([
  {
    name: "国語",
    score: 85,
    previousScore: 78,
    deviation: 65,
    previousDeviation: 60,
    average: 75,
    studyPlanPdf: "/study-plans/japanese.pdf",
    questions: [
      { id: 1, type: "読解", score: 10, correct: true },
      { id: 2, type: "文法", score: 8, correct: false },
    ],
    areas: [
      { name: "読解力", points: 50, score: 40, average: 35, rate: 80 },
      { name: "文法", points: 30, score: 25, average: 20, rate: 83 },
      { name: "漢字", points: 20, score: 15, average: 18, rate: 75 },
    ],
  },
  {
    name: "算数",
    score: 90,
    previousScore: 82,
    deviation: 70,
    previousDeviation: 62,
    average: 80,
    studyPlanPdf: "/study-plans/math.pdf",
    questions: [
      { id: 1, type: "計算", score: 10, correct: true },
      { id: 2, type: "文章題", score: 8, correct: false },
    ],
    areas: [
      { name: "計算力", points: 40, score: 35, average: 30, rate: 88 },
      { name: "図形", points: 30, score: 28, average: 25, rate: 93 },
      { name: "文章題", points: 30, score: 27, average: 25, rate: 90 },
    ],
  },
]);

const handleSetUser = (newUser: { email: string }) => {
  user.value = newUser;
  currentComponent.value = 'dashboard';
};

const handleSetCurrentPage = (page: string) => {
  currentComponent.value = page;
};

const handleLogout = () => {
  user.value = null;
  currentComponent.value = 'signin';
};

const handleBack = () => {
  switch (currentComponent.value) {
    case 'SubjectPerformanceViewer':
      selectedSubject.value = null;
      currentComponent.value = 'ExamSubjectsResults';
      break;
    case 'ExamSubjectsResults':
      selectedExamResult.value = null;
      currentComponent.value = 'results';
      break;
    case 'ExamRequest':
      selectedExam.value = null;
      currentComponent.value = 'exams';
      break;
    case 'ExamRequestConfirm':
      currentComponent.value = 'ExamRequest';
      break;
    default:
      currentComponent.value = 'dashboard';
  }
};

const handleNavigate = (page: string) => {
  switch (page) {
    case 'dashboard':
      currentComponent.value = 'dashboard';
      break;
    case 'exams':
      currentComponent.value = 'exams';
      break;
    case 'results':
      currentComponent.value = 'results';
      break;
  }
};

const handleApplyForExams = () => {
  currentComponent.value = 'exams';
};

const handleViewResults = () => {
  currentComponent.value = 'results';
};

const handleSelectExam = (examId: number) => {
  selectedExam.value = examId;
  currentComponent.value = examItems.value.find(e => e.id === examId)?.isApplied 
    ? 'ExamRequestConfirm' 
    : 'ExamRequest';
};

const handleSelectExamResult = (index: number) => {
  selectedExamResult.value = index;
  currentComponent.value = 'ExamSubjectsResults';
};

const handleSelectSubject = (subject: any) => {
  selectedSubject.value = subject;
  currentComponent.value = 'SubjectPerformanceViewer';
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header
      :user="user"
      :selected-student="selectedStudent"
      @logout="handleLogout"
      @back="handleBack"
    />

    <SignIn
      v-if="currentComponent === 'signin'"
      @set-user="handleSetUser"
      @set-current-page="handleSetCurrentPage"
    />

    <SignUp
      v-else-if="currentComponent === 'signup'"
      @set-current-page="handleSetCurrentPage"
    />

    <Dashboard
      v-else-if="currentComponent === 'dashboard'"
      :selected-student="selectedStudent"
      @edit-student="handleEditStudent"
      @delete-student="handleDeleteStudent"
      @apply-for-exams="handleApplyForExams"
      @view-results="handleViewResults"
    />

    <ExamList
      v-else-if="currentComponent === 'exams'"
      title="模試申込"
      :items="examItems"
      @select="handleSelectExam"
    />

    <ExamRequest
      v-else-if="currentComponent === 'ExamRequest'"
      :exam-id="selectedExam"
      exam-title="第1回 オンライン模試"
      exam-period="2024年4月1日（月）～ 4月3日（水）"
      :price="3800"
      @success="currentComponent = 'ExamRequestConfirm'"
      @back="handleBack"
    />

    <ExamRequestConfirm
      v-else-if="currentComponent === 'ExamRequestConfirm'"
      :exam-id="selectedExam"
      exam-title="第1回 オンライン模試"
      exam-date="2024年4月1日（月）"
      :price="3800"
      @success="currentComponent = 'dashboard'"
      @back="handleBack"
    />

    <ExamResults
      v-else-if="currentComponent === 'results'"
      :student-name="selectedStudent?.name"
      :student-grade="selectedStudent?.grade"
      :exams="examResults"
      @select-exam="handleSelectExamResult"
    />

    <ExamSubjectsResults
      v-else-if="currentComponent === 'ExamSubjectsResults'"
      :exam-number="selectedExamResult + 1"
      :exam-date="examResults[selectedExamResult]?.date"
      :subjects="subjects"
      pdf-url="/study-plans/overall.pdf"
      @select-subject="handleSelectSubject"
      @back="handleBack"
    />

    <SubjectPerformanceViewer
      v-else-if="currentComponent === 'SubjectPerformanceViewer' && selectedSubject"
      :subject="selectedSubject"
      :selected-tab="selectedTab"
      @back="handleBack"
      @select-tab="(tab) => selectedTab = tab"
    />

    <Footer
      :user="user"
      :selected-student="selectedStudent"
      @navigate="handleNavigate"
    />
  </div>
</template>