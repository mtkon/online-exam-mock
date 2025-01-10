"use client";
import React from "react";

function SubjectPerformanceViewer({
  subject,
  selectedTab,
  onBack,
  onSelectTab,
}) {
  const renderScoreChange = (current, previous) => {
    if (!previous) return null;
    const diff = current - previous;
    const color =
      diff > 0 ? "text-green-500" : diff < 0 ? "text-red-500" : "text-gray-500";
    const icon =
      diff > 0 ? "fa-arrow-up" : diff < 0 ? "fa-arrow-down" : "fa-minus";
    return (
      <div className={`text-sm ${color} flex items-center gap-1`}>
        <i className={`fas ${icon}`}></i>
        <span>{Math.abs(diff)}</span>
      </div>
    );
  };

  return (
    <div className="pt-16 pb-24 px-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-2 text-gray-600">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-2xl font-bold font-roboto">{subject.name}の成績</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">得点</div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-lg">{subject.score}点</div>
              {renderScoreChange(subject.score, subject.previousScore)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">平均点</div>
            <div className="font-bold text-lg">{subject.average}点</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">偏差値</div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-lg">{subject.deviation}</div>
              {renderScoreChange(subject.deviation, subject.previousDeviation)}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <RecommendedStudyPlan pdfUrl={subject.studyPlanPdf} />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex border-b">
          {["問題別", "領域別"].map((tab) => (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`px-4 py-2 ${
                selectedTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        {selectedTab === "問題別" && (
          <div>
            <div className="font-bold mb-4">問題別正答状況</div>
            <div className="space-y-4">
              {subject.questions.map((q, i) => (
                <div
                  key={i}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">問{q.id}</div>
                      <div className="text-sm text-gray-600">{q.type}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">{q.score}点</div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          q.correct
                            ? "bg-blue-100 text-blue-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        <i
                          className={`fas ${
                            q.correct ? "fa-check" : "fa-times"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "領域別" && (
          <div>
            <div className="font-bold mb-4">領域別分析</div>
            <div className="space-y-4">
              {subject.areas.map((area, i) => (
                <div
                  key={i}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{area.name}</div>
                      <div className="text-sm text-gray-600">
                        配点: {area.points}点
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        得点: {area.score}/{area.points}
                      </div>
                      <div className="text-sm text-gray-600">
                        平均: {area.average}
                      </div>
                      <div className="text-sm text-blue-500">
                        正答率: {area.rate}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubjectPerformanceViewerStory() {
  const [selectedTab, setSelectedTab] = React.useState("問題別");
  const mockSubject = {
    name: "数学",
    score: 14,
    previousScore: 12,
    average: 12,
    deviation: 55,
    previousDeviation: 52,
    studyPlanPdf: "/nextsteps/math-plan.pdf",
    questions: [
      { id: 1, type: "計算力", score: 2, correct: true },
      { id: 2, type: "計算力", score: 2, correct: true },
      { id: 3, type: "計算力", score: 2, correct: false },
      { id: 4, type: "図形", score: 2, correct: true },
      { id: 5, type: "図形", score: 2, correct: false },
      { id: 6, type: "図形", score: 2, correct: true },
      { id: 7, type: "文章題", score: 2, correct: true },
      { id: 8, type: "文章題", score: 2, correct: false },
      { id: 9, type: "文章題", score: 2, correct: true },
      { id: 10, type: "文章題", score: 2, correct: false },
    ],
    areas: [
      { name: "計算力", points: 6, score: 4, average: 4.2, rate: 67 },
      { name: "図形", points: 6, score: 4, average: 3.8, rate: 67 },
      { name: "文章題", points: 8, score: 6, average: 4.0, rate: 75 },
    ],
  };

  return (
    <div>
      <SubjectPerformanceViewer
        subject={mockSubject}
        selectedTab={selectedTab}
        onBack={() => console.log("Go back")}
        onSelectTab={setSelectedTab}
      />
    </div>
  );
}

export default SubjectPerformanceViewer;