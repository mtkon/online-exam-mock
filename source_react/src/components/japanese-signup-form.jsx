"use client";
import React from "react";

function JapaneseSignupForm({
  signupSuccess,
  setCurrentPage,
  isSubmitting,
  handleStreamResponse,
}) {
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 font-roboto text-blue-600">
        アカウント作成
      </h1>
      {signupSuccess ? (
        <div className="text-center space-y-4">
          <div className="text-green-500 text-xl mb-4">
            <i className="fas fa-check-circle text-4xl mb-2"></i>
            <p className="font-bold">メールを送信しました</p>
          </div>
          <p className="text-gray-600">
            入力されたメールアドレスに案内メールを送信しました。
            メールの内容に従って、登録を完了してください。
          </p>
          <button
            onClick={() => setCurrentPage("signin")}
            className="text-blue-500 hover:underline font-bold"
          >
            ログインページに戻る
          </button>
        </div>
      ) : (
        <form
          className="space-y-8"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            const email = e.target.email.value;
            try {
              const response = await fetch(
                "/integrations/chat-gpt/conversationgpt4",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    messages: [
                      {
                        role: "user",
                        content: `メールアドレス ${email} に登録案内メールを送信してください。`,
                      },
                    ],
                    stream: true,
                  }),
                }
              );
              handleStreamResponse(response);
              setSignupSuccess(true);
            } catch (error) {
              console.error(error);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2">
              アカウント情報
            </h2>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                氏名
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                ふりがな
              </label>
              <input
                type="text"
                name="furigana"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                電話番号
              </label>
              <input
                type="tel"
                name="phone"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                パスワード(確認)
              </label>
              <input
                type="password"
                name="passwordConfirm"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-extrabold text-gray-800 border-b-2 border-blue-500 pb-2">
              住所
            </h2>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                郵便番号
              </label>
              <input
                type="text"
                name="postalCode"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                都道府県
              </label>
              <input
                type="text"
                name="prefecture"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                市区町村
              </label>
              <input
                type="text"
                name="city"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                番地
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                建物名・部屋番号
              </label>
              <input
                type="text"
                name="building"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="terms"
              required
              className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-3 text-sm font-bold text-gray-700">
              利用規約に同意します
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-bold mt-8 transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "アカウントを作成"
            )}
          </button>
        </form>
      )}
      <p className="mt-8 text-center text-sm text-gray-600">
        既にアカウントをお持ちの方は
        <button
          onClick={() => setCurrentPage("signin")}
          className="text-blue-600 font-bold hover:text-blue-700 ml-1 transition duration-200 ease-in-out"
        >
          ログイン
        </button>
      </p>
    </div>
  );
}

function JapaneseSignupFormStory() {
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setCurrentPage = (page) => {
    console.log(`Navigate to ${page}`);
  };

  const handleStreamResponse = (response) => {
    console.log(response);
  };

  return (
    <div>
      <JapaneseSignupForm
        signupSuccess={signupSuccess}
        setSignupSuccess={setSignupSuccess}
        setCurrentPage={setCurrentPage}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        handleStreamResponse={handleStreamResponse}
      />
    </div>
  );
}

export default JapaneseSignupForm;