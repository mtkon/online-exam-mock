"use client";
import React from "react";

function Dashboard({
  title = "生徒ダッシュボード",
  selectedStudent = { name: "山田太郎", grade: 3 },
  onEditStudent = () => {},
  onDeleteStudent = () => {},
  onApplyForExams = () => {},
  onViewResults = () => {},
  onAddMaterials = () => {},
}) {
  return (
    <div className="pt-16 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 font-roboto">{title}</h1>
      <div className="space-y-6 max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-bold text-lg">{selectedStudent.name}</div>
              <div className="text-sm text-gray-600">
                {selectedStudent.grade}年生
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onEditStudent(selectedStudent)}
                className="text-gray-600 hover:text-blue-600"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => onDeleteStudent(selectedStudent)}
                className="text-gray-600 hover:text-red-600"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={onApplyForExams}
            className="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <i className="fas fa-file-alt text-2xl text-blue-500 mb-2"></i>
                <div className="font-bold">模試申し込み</div>
                <div className="text-sm text-gray-600">
                  オンライン模試の申し込み
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </button>

          <button
            onClick={onViewResults}
            className="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <i className="fas fa-chart-bar text-2xl text-blue-500 mb-2"></i>
                <div className="font-bold">成績確認</div>
                <div className="text-sm text-gray-600">模試の成績を確認</div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </button>

          <button
            onClick={onAddMaterials}
            className="bg-white rounded-lg shadow-sm p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <i className="fas fa-book text-2xl text-blue-500 mb-2"></i>
                <div className="font-bold">学習教材追加</div>
                <div className="text-sm text-gray-600">学習教材の追加</div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardStory() {
  return <Dashboard />;
}

export default Dashboard;