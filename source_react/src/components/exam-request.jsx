"use client";
import React from "react";

function ExamRequest({
  examId,
  examTitle,
  examPeriod,
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
          {examTitle} お申し込み
        </h1>

        <div className="space-y-8">
          <section className="border-b pb-6">
            <h2 className="text-lg font-bold mb-4">試験情報</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">実施期間</span>
                <span>{examPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">受験科目</span>
                <span>国語・算数</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">受験料</span>
                <span className="font-bold">¥{price.toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section className="border-b pb-6">
            <h2 className="text-lg font-bold mb-4">支払い方法</h2>
            <p className="text-gray-600 mb-4">
              クレジットカード決済をご利用いただけます。
              以下のカードブランドに対応しています：
            </p>
            <div className="flex gap-4 mb-6">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-cc-amex text-2xl"></i>
            </div>
          </section>

          <section className="border-b pb-6">
            <h2 className="text-lg font-bold mb-4">利用規約と同意事項</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                <div className="space-y-4">
                  <h3 className="font-bold">第1条（利用規約）</h3>
                  <p>
                    本規約は、当社が提供するオンライン模試サービス（以下「本サービス」といいます）の利用に関する条件を定めるものです。
                  </p>

                  <h3 className="font-bold">第2条（サービスの内容）</h3>
                  <p>
                    1.
                    本サービスは、インターネットを通じて受験できる模擬試験を提供します。
                    2.
                    試験時間は各科目40分とし、制限時間を超過した場合は自動的に終了となります。
                    3. 採点結果は試験終了後、5営業日以内に提供されます。
                  </p>

                  <h3 className="font-bold">第3条（禁止事項）</h3>
                  <p>
                    以下の行為を禁止します： 1. 不正行為（カンニング等） 2.
                    システムへの不正アクセス 3. 試験内容の複製・転載 4.
                    第三者への受験権利の譲渡
                  </p>

                  <h3 className="font-bold">第4条（免責事項）</h3>
                  <p>
                    1. 通信環境による不具合について、当社は責任を負いません。 2.
                    不可抗力による試験中止の場合、後日振替受験を実施します。
                  </p>

                  <h3 className="font-bold">同意事項</h3>
                  <ul className="list-disc ml-5 space-y-2">
                    <li>お申し込み後のキャンセルは試験日の7日前まで可能です</li>
                    <li>
                      返金時は事務手数料として20%を差し引かせていただきます
                    </li>
                    <li>試験当日の欠席による返金は致しかねます</li>
                    <li>
                      システムトラブルによる受験不可の場合は、後日振替受験を実施します
                    </li>
                    <li>個人情報は試験運営の目的にのみ使用します</li>
                    <li>成績データは統計的な分析に使用することがあります</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-1"
                  checked={agreed}
                  onChange={(e) => setAgrued(e.target.checked)}
                />
                <label htmlFor="agreement">
                  利用規約と同意事項の内容を確認し、同意します
                </label>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button
              onClick={handleProceed}
              disabled={!agreed || loading}
              className={`w-full py-3 rounded-lg text-white font-bold ${
                agreed && !loading
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : (
                <i className="fas fa-lock mr-2"></i>
              )}
              決済画面へ進む（¥{price.toLocaleString()}）
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamRequestStory() {
  const handleSuccess = () => {
    console.log("Payment process started");
  };

  const handleBack = () => {
    console.log("Going back");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <ExamRequest
        examId={1}
        examTitle="第1回 オンライン模試"
        examPeriod="2024年4月1日（月）～ 4月3日（水）"
        price={3800}
        onSuccess={handleSuccess}
        onBack={handleBack}
      />
    </div>
  );
}

export default ExamRequest;