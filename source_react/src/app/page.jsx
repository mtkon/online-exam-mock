"use client";
import React from "react";

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

function MainComponent() {
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [students, setStudents] = React.useState([
    { id: 1, name: "山田太郎", grade: 6 },
    { id: 2, name: "佐藤花子", grade: 5 },
    { id: 3, name: "鈴木一郎", grade: 4 },
  ]);
  const [user, setUser] = React.useState(null);
  const [newStudent, setNewStudent] = React.useState(false);
  const [editStudent, setEditStudent] = React.useState(null);
  const [selectedExam, setSelectedExam] = React.useState(null);
  const [selectedResult, setSelectedResult] = React.useState(null);
  const [selectedSubject, setSelectedSubject] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState("問題別");
  const [streamingMessage, setStreamingMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("signin");
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [subjects] = React.useState([
    {
      name: "国語",
      score: 85,
      previousScore: 78,
      deviation: 65,
      previousDeviation: 60,
      average: 75,
      questions: [
        { id: 1, type: "読解", score: 10, correct: true },
        { id: 2, type: "文法", score: 8, correct: false },
      ],
      thinkingCodes: [
        { type: "知識・理解", application: "55%", average: "63%" },
        { type: "応用・操作", application: "75%", average: "36%" },
        { type: "比較・創造", application: "-", average: "-" },
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
      questions: [
        { id: 1, type: "計算", score: 10, correct: true },
        { id: 2, type: "文章題", score: 8, correct: false },
      ],
      thinkingCodes: [
        { type: "知識・理解", application: "100%", average: "70%" },
        { type: "応用・操作", application: "0%", average: "25%" },
        { type: "比較・創造", application: "-", average: "-" },
      ],
      areas: [
        { name: "計算力", points: 40, score: 35, average: 30, rate: 88 },
        { name: "図形", points: 30, score: 28, average: 25, rate: 93 },
        { name: "文章題", points: 30, score: 27, average: 25, rate: 90 },
      ],
    },
  ]);

  const handleFinish = React.useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const renderHeader = () => {
    if (!user) return null;
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {selectedStudent && (
            <button
              onClick={() => {
                setSelectedStudent(null);
                setCurrentPage("dashboard");
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <div className="text-xl font-bold font-roboto">オンライン模試</div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setUser(null);
              setCurrentPage("signin");
            }}
            className="text-sm px-3 py-1 hover:bg-gray-100 rounded"
          >
            <i className="fas fa-sign-out-alt mr-1"></i>
            ログアウト
          </button>
        </div>
      </header>
    );
  };

  const renderFooter = () => {
    if (!user || !selectedStudent) return null;
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md px-4 py-2">
        <nav className="flex justify-around">
          <button
            onClick={() => {
              setCurrentPage("dashboard");
            }}
            className="text-center px-2 py-1 hover:bg-gray-100 rounded"
          >
            <i className="fas fa-home text-lg"></i>
            <div className="text-xs mt-1">ホーム</div>
          </button>
          <button
            onClick={() => setCurrentPage("exams")}
            className="text-center px-2 py-1 hover:bg-gray-100 rounded"
          >
            <i className="fas fa-file-alt text-lg"></i>
            <div className="text-xs mt-1">模試申込</div>
          </button>
          <button
            onClick={() => setCurrentPage("results")}
            className="text-center px-2 py-1 hover:bg-gray-100 rounded"
          >
            <i className="fas fa-chart-bar text-lg"></i>
            <div className="text-xs mt-1">成績確認</div>
          </button>
          <button
            onClick={() => setCurrentPage("subsc")}
            className="text-center px-2 py-1 hover:bg-gray-100 rounded"
          >
            <i className="fas fa-book text-lg"></i>
            <div className="text-xs mt-1">学習教材</div>
          </button>
        </nav>
      </footer>
    );
  };

  const renderSignIn = () => (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 md:py-0 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 font-roboto text-blue-600">
          オンライン模試
        </h1>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              メールアドレス
            </label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              パスワード
            </label>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            onClick={() => {
              setUser({ email: "test@example.com" });
              setCurrentPage("dashboard");
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            ログイン
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          アカウントをお持ちでない方は
          <button
            onClick={() => setCurrentPage("signup")}
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            新規登録
          </button>
        </p>
      </div>
    </div>
  );

  const renderSignUp = () => (
    <JapaneseSignupForm
      signupSuccess={signupSuccess}
      setSignupSuccess={setSignupSuccess}
      setCurrentPage={setCurrentPage}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      handleStreamResponse={handleStreamResponse}
    />
  );

  const renderDashboard = () => {
    if (!selectedStudent) {
      return renderStudentSelection("dashboard");
    }
    return (
      <Dashboard
        title="ダッシュボード"
        selectedStudent={selectedStudent}
        onEditStudent={(student) => {
          setEditStudent(student);
          setCurrentPage("editStudent");
        }}
        onDeleteStudent={(student) => {
          setStudents(students.filter((s) => s.id !== student.id));
        }}
        onApplyForExams={() => setCurrentPage("exams")}
        onViewResults={() => setCurrentPage("results")}
      />
    );
  };

  const renderStudentSelection = (nextPage) => (
    <div className="pt-16 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 font-roboto">受験生を選択</h1>
      <div className="space-y-4">
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => {
              setSelectedStudent(student);
              setCurrentPage(nextPage);
            }}
            className="w-full bg-white rounded-lg shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="font-bold">{student.name}</div>
            <div className="text-sm text-gray-600">{student.grade}年生</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStudentForm = (isEdit = false) => (
    <div className="pt-16 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 font-roboto">
        {isEdit ? "受験生情報編集" : "新規受験生登録"}
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">氏名</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded"
            defaultValue={editStudent?.name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">学年</label>
          <select
            name="grade"
            className="w-full px-3 py-2 border rounded"
            defaultValue={editStudent?.grade}
          >
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <option key={grade} value={grade}>
                {grade}年生
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setNewStudent(false);
            setEditStudent(null);
            setCurrentPage("dashboard");
          }}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {isEdit ? "更新" : "登録"}
        </button>
      </form>
    </div>
  );

  const renderResult = () => {
    if (!selectedStudent) {
      return renderStudentSelection("results");
    }
    return (
      <StudentExamsResults
        studentName={selectedStudent.name}
        studentGrade={selectedStudent.grade}
        exams={[
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
        ]}
        onSelectExam={(index) => {
          setSelectedResult(index + 1);
          setCurrentPage("resultDetail");
        }}
      />
    );
  };

  const renderResultDetail = () => {
    if (!selectedSubject) {
      return (
        <ExamSubjectsResults
          examNumber={selectedResult}
          examDate={`2024/0${selectedResult}/01`}
          subjects={subjects}
          onSelectSubject={setSelectedSubject}
          onBack={() => {
            setSelectedResult(null);
            setCurrentPage("results");
          }}
          pdfUrl={`/nextsteps/exam${selectedResult}.pdf`}
        />
      );
    }

    return (
      <SubjectPerformanceViewer
        subject={selectedSubject}
        selectedTab={selectedTab}
        onBack={() => setSelectedSubject(null)}
        onSelectTab={setSelectedTab}
      />
    );
  };

  const renderExams = () => {
    if (!selectedStudent) {
      return renderStudentSelection("exams");
    }
    if (selectedExam) {
      if (currentPage === "payment") {
        return (
          <StripePaymentPageClone
            examId={selectedExam}
            examTitle="第1回 オンライン模試"
            examDate="2024年4月1日（月）"
            price={3800}
            onSuccess={() => {
              setPaymentSuccess(true);
              setSelectedExam(null);
              setCurrentPage("dashboard");
            }}
            onBack={() => {
              setCurrentPage("examDetail");
            }}
          />
        );
      }
      if (currentPage === "examDetail") {
        const exam = [
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
        ].find((e) => e.id === selectedExam);

        if (exam?.isApplied) {
          return (
            <ExamRequestConfirm
              examId={selectedExam}
              examTitle="第1回 オンライン模試"
              examDate="2024年4月1日（月）"
              price={3800}
              onSuccess={() => setCurrentPage("dashboard")}
              onBack={() => {
                setSelectedExam(null);
                setCurrentPage("exams");
              }}
            />
          );
        }
        return (
          <ExamRequest
            examId={selectedExam}
            examTitle="第1回 オンライン模試"
            examDate="2024年4月1日（月）"
            price={3800}
            onSuccess={() => setCurrentPage("payment")}
            onBack={() => {
              setSelectedExam(null);
              setCurrentPage("exams");
            }}
          />
        );
      }
    }
    return (
      <Exams
        title="模試申込"
        items={[
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
        ]}
        onSelect={(examId) => {
          setSelectedExam(examId);
          setCurrentPage("examDetail");
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {renderHeader()}
      {currentPage === "signin" && renderSignIn()}
      {currentPage === "signup" && renderSignUp()}
      {currentPage === "dashboard" && renderDashboard()}
      {currentPage === "createStudent" && renderStudentForm(false)}
      {currentPage === "editStudent" && renderStudentForm(true)}
      {currentPage === "exams" && renderExams()}
      {currentPage === "examDetail" && renderExams()}
      {currentPage === "payment" && renderExams()}
      {currentPage === "results" && renderResult()}
      {currentPage === "resultDetail" && renderResultDetail()}
      {renderFooter()}
      <style jsx global>{`
        .animate-scale {
          transform: scale(1);
          transition: transform 0.2s ease-in-out;
        }
        .hover\\:animate-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default MainComponent;