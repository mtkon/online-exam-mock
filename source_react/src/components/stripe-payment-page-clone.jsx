"use client";
import React from "react";

function StripePaymentPageClone({
  examId,
  examTitle,
  examDate,
  price,
  onSuccess,
  onBack,
}) {
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg inline-flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          戻る
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 font-roboto">お支払い</h2>
            <p className="text-gray-600">{examTitle}</p>
            <p className="text-gray-600 text-sm">{examDate}</p>
            <div className="mt-4 text-2xl font-bold">
              ¥{price.toLocaleString()}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カード番号
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="19"
                />
                <i className="fas fa-credit-card absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  有効期限
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM / YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  セキュリティコード
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="CVC"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength="4"
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  処理中...
                </>
              ) : (
                <>
                  <i className="fas fa-lock mr-2"></i>¥{price.toLocaleString()}
                  を支払う
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-center space-x-4 text-gray-400">
            <i className="fab fa-cc-visa text-2xl"></i>
            <i className="fab fa-cc-mastercard text-2xl"></i>
            <i className="fab fa-cc-amex text-2xl"></i>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <i className="fas fa-shield-alt mr-1"></i>
            安全な決済を実現しています
          </div>
        </div>
      </div>
    </div>
  );
}

function StripePaymentPageCloneStory() {
  const handleSuccess = () => {
    alert("支払いが完了しました！");
  };

  const handleBack = () => {
    alert("前のページに戻ります");
  };

  return (
    <StripePaymentPageClone
      examId={1}
      examTitle="第1回 オンライン模試"
      examDate="2024年4月1日（月）"
      price={3800}
      onSuccess={handleSuccess}
      onBack={handleBack}
    />
  );
}

export default StripePaymentPageClone;