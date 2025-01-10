"use client";
import React from "react";

function StudentExamsResults({
  studentName,
  studentGrade,
  exams,
  onSelectExam,
}) {
  const getScoreDifference = (currentScore, index, subject, examIndex) => {
    if (examIndex === 0) return null;
    const previousExam = exams[examIndex - 1];
    const previousScore = previousExam.scores.find(
      (s) => s.subject === subject
    );
    if (!previousScore) return null;
    const difference = currentScore - previousScore.value;
    return difference;
  };

  const renderScoreDifference = (difference) => {
    if (difference === null) return null;
    const color =
      difference > 0
        ? "text-red-500"
        : difference < 0
        ? "text-blue-500"
        : "text-gray-500";
    const sign = difference > 0 ? "+" : "";
    return (
      <div className={`text-xs ${color}`}>
        {sign}
        {difference}
      </div>
    );
  };

  return (
    <div className="pt-16 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 font-roboto">成績一覧</h1>
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <div className="font-bold">{studentName}</div>
        <div className="text-sm text-gray-600">{studentGrade}年生</div>
      </div>
      <div className="space-y-4">
        {exams.map((exam, examIndex) => (
          <div key={examIndex} className="space-y-2">
            <button
              onClick={() => onSelectExam(examIndex)}
              className="w-full bg-white rounded-lg shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold">{exam.title}</div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
              <div className="text-sm text-gray-600">実施日: {exam.date}</div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {exam.scores.map((score, idx) => (
                  <div key={idx} className="text-center">
                    <div className="font-bold">{score.subject}</div>
                    <div className="flex flex-col items-center">
                      <div className="text-sm">{score.value}点</div>
                      {renderScoreDifference(
                        getScoreDifference(
                          score.value,
                          idx,
                          score.subject,
                          examIndex
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </button>
            <RecommendedStudyPlan pdfUrl={exam.nextStepsPdf} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentExamsResultsStory() {
  const handleSelectExam = (examIndex) => {
    console.log("Selected exam:", examIndex);
  };

  const mockData = {
    studentName: "山田太郎",
    studentGrade: 3,
    exams: [
      {
        title: "第1回 オンライン模試",
        date: "2024/01/01",
        scores: [
          { subject: "国語", value: 85 },
          { subject: "算数", value: 90 },
          { subject: "理科", value: 88 },
        ],
        nextStepsPdf: "/nextsteps/exam1.pdf",
      },
      {
        title: "第2回 オンライン模試",
        date: "2024/02/01",
        scores: [
          { subject: "国語", value: 78 },
          { subject: "算数", value: 82 },
          { subject: "理科", value: 80 },
        ],
        nextStepsPdf: "/nextsteps/exam2.pdf",
      },
      {
        title: "第3回 オンライン模試",
        date: "2024/03/01",
        scores: [
          { subject: "国語", value: 88 },
          { subject: "算数", value: 85 },
          { subject: "理科", value: 90 },
        ],
        nextStepsPdf: "/nextsteps/exam3.pdf",
      },
    ],
  };

  return (
    <div>
      <StudentExamsResults
        studentName={mockData.studentName}
        studentGrade={mockData.studentGrade}
        exams={mockData.exams}
        onSelectExam={handleSelectExam}
      />
    </div>
  );
}

export default StudentExamsResults;