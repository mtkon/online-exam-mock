"use client";
import React from "react";

function ExamRequestConfirm({
  examId,
  examTitle,
  examDate,
  price,
  onSuccess,
  onBack,
}) {
  const [agreed, setAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleProceed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1000);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg inline-flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        戻る
      </button>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 font-roboto">
          {examTitle} 申込確認
        </h1>
        <div className="space-y-8">
          <section className="border-b pb-6">
            <h2 className="text-lg font-bold mb-4">試験情報</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">試験日</span>
                <span>{examDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">受験科目</span>
                <span>国語・算数</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">試験時間</span>
                <span>各科目40分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">受験料</span>
                <span>¥{price.toLocaleString()} (支払い済み)</span>
              </div>
            </div>
          </section>
          <section className="border-b pb-6">
            <h2 className="text-lg font-bold mb-4">受験に関する注意事項</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-info-circle text-blue-600 mr-2"></i>
                  <span className="font-bold">試験当日の持ち物</span>
                </div>
                <p className="text-sm">試験当日の持ち物は不要です。</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-clock text-yellow-600 mr-2"></i>
                  <span className="font-bold">試験開始時刻</span>
                </div>
                <p className="text-sm">
                  試験開始10分前までにログインを完了してください。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ExamRequestConfirmStory() {
  const handleSuccess = () => {
    console.log("Payment process started");
  };
  const handleBack = () => {
    console.log("Going back");
  };
  return (
    <div className="bg-gray-50 min-h-screen p-4 space-y-8">
      <ExamRequestConfirm
        examId={1}
        examTitle="第1回 オンライン模試"
        examDate="2024年4月1日（月）"
        price={3800}
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    </div>
  );
}

export default ExamRequestConfirm;