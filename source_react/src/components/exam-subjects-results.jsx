"use client";
import React from "react";

function ExamSubjectsResults({
  examNumber,
  examDate,
  subjects,
  onSelectSubject,
  onBack,
  pdfUrl,
}) {
  const renderScoreChange = (current, previous) => {
    if (!previous) return null;
    const diff = current - previous;
    if (diff === 0) return null;

    return (
      <span
        className={`ml-2 text-xs ${
          diff > 0 ? "text-red-500" : "text-blue-500"
        }`}
      >
        <i className={`fas fa-${diff > 0 ? "arrow-up" : "arrow-down"}`}></i>
        {Math.abs(diff)}
      </span>
    );
  };

  return (
    <div className="pt-16 pb-24 px-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-2 text-gray-600">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-2xl font-bold font-roboto">成績詳細</h1>
      </div>
      <div className="mb-6">
        <div className="font-bold mb-2">第{examNumber}回 オンライン模試</div>
        <div className="text-sm text-gray-600">実施日: {examDate}</div>
      </div>
      <RecommendedStudyPlan pdfUrl={pdfUrl} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {subjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => onSelectSubject(subject)}
            className="bg-white rounded-lg shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg">{subject.name}</div>
                <div className="text-sm space-y-1">
                  <div>
                    得点: {subject.score}点
                    {renderScoreChange(subject.score, subject.previousScore)}
                  </div>
                  <div>
                    偏差値: {subject.deviation}
                    {renderScoreChange(
                      subject.deviation,
                      subject.previousDeviation
                    )}
                  </div>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExamSubjectsResultsStory() {
  const exampleSubjects = [
    {
      name: "算数",
      score: 85,
      previousScore: 80,
      deviation: 65,
      previousDeviation: 60,
    },
    {
      name: "理科",
      score: 78,
      previousScore: 82,
      deviation: 58,
      previousDeviation: 62,
    },
    {
      name: "国語",
      score: 88,
      previousScore: 88,
      deviation: 68,
      previousDeviation: 68,
    },
  ];

  return (
    <div>
      <ExamSubjectsResults
        examNumber={1}
        examDate="2024/01/01"
        subjects={exampleSubjects}
        onSelectSubject={(subject) => console.log("Selected subject:", subject)}
        onBack={() => console.log("Back button clicked")}
        pdfUrl="/nextsteps/exam1.pdf"
      />
    </div>
  );
}

export default ExamSubjectsResults;