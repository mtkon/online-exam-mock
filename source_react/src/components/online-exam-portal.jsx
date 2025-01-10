"use client";
import React from "react";

function OnlineExamPortal({
  currentPage,
  renderHeader,
  renderFooter,
  renderSignIn,
  renderSignUp,
  renderDashboard,
  renderExams,
  renderResults,
}) {
  const [formData, setFormData] = useState({
    name: "",
    furigana: "",
    grade: "",
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderStudentForm = () => (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">生徒登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            氏名
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ふりがな
          </label>
          <input
            type="text"
            name="furigana"
            value={formData.furigana}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            学年
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">選択してください</option>
            <option value="小1">小学1年生</option>
            <option value="小2">小学2年生</option>
            <option value="小3">小学3年生</option>
            <option value="小4">小学4年生</option>
            <option value="小5">小学5年生</option>
            <option value="小6">小学6年生</option>
            <option value="中1">中学1年生</option>
            <option value="中2">中学2年生</option>
            <option value="中3">中学3年生</option>
            <option value="高1">高校1年生</option>
            <option value="高2">高校2年生</option>
            <option value="高3">高校3年生</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          登録
        </button>
      </form>
    </div>
  );

  let renderPageContent;

  if (currentPage === "signin") {
    renderPageContent = renderSignIn;
  } else if (currentPage === "signup") {
    renderPageContent = renderStudentForm;
  } else if (currentPage === "dashboard") {
    renderPageContent = renderDashboard;
  } else if (currentPage === "exams") {
    renderPageContent = renderExams;
  } else if (currentPage === "results") {
    renderPageContent = renderResults;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      {renderPageContent && renderPageContent()}
      {renderFooter()}
    </div>
  );
}

function OnlineExamPortalStory() {
  return (
    <div>
      <OnlineExamPortal
        currentPage="signup"
        renderHeader={() => <div>Header</div>}
        renderFooter={() => <div>Footer</div>}
        renderSignIn={() => <div>Sign In Content</div>}
        renderSignUp={() => <div>Sign Up Content</div>}
        renderDashboard={() => <div>Dashboard Content</div>}
        renderExams={() => <div>Exams Content</div>}
        renderResults={() => <div>Results Content</div>}
      />
    </div>
  );
}

export default OnlineExamPortal;