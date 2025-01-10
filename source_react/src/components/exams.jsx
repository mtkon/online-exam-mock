"use client";
import React from "react";

function Exams({ title, items, onSelect }) {
  return (
    <div className="pt-16 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 font-roboto">{title}</h1>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.date}</div>
                {item.isApplied && (
                  <div className="text-sm text-green-600 mt-1">
                    申し込み済み
                  </div>
                )}
              </div>
              <button
                onClick={() => onSelect(item.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                {item.isApplied ? "申込内容の確認" : "申し込む"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamsStory() {
  const handleSelect = (id) => {
    console.log("Selected Exam: ", id);
  };

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
      onSelect={handleSelect}
    />
  );
}

export default Exams;