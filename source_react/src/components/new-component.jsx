"use client";
import React from "react";

function RecommendedStudyPlan({
  pdfUrl,
  title = "今後の学習プランのおすすめ",
  description = "あなたに合わせた学習プランをご確認ください",
}) {
  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-green-50 rounded-lg p-4 text-left hover:bg-green-100 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold text-green-800">{title}</div>
          <div className="text-sm text-green-600">{description}</div>
        </div>
        <i className="fas fa-file-pdf text-green-600 text-xl"></i>
      </div>
    </a>
  );
}

function NewComponentStory() {
  const mockData = {
    title: "春期講習のおすすめプラン",
    description: "春休みの学習計画をご確認ください",
    pdfUrl: "/nextsteps/spring-plan.pdf",
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">デフォルト表示</h2>
      <RecommendedStudyPlan pdfUrl="/nextsteps/default.pdf" />

      <h2 className="text-xl font-bold mb-4 mt-8">カスタマイズ表示</h2>
      <RecommendedStudyPlan {...mockData} />
    </div>
  );
}

export default NewComponent;