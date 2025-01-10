"use client";
import React from "react";

function StudentManagerDashboard({
  title = "ダッシュボード",
  students = [],
  selectedStudent = null,
  onStudentSelect,
  onAddStudent,
  onApplyForExams,
  onViewResults,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <NewComponent
      title={title}
      students={students}
      selectedStudent={selectedStudent}
      onStudentSelect={onStudentSelect}
      onAddStudent={onAddStudent}
      onApplyForExams={onApplyForExams}
      onViewResults={onViewResults}
      onEditStudent={onEditStudent}
      onDeleteStudent={onDeleteStudent}
    />
  );
}

function StudentManagerDashboardStory() {
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const students = [
    { id: 1, name: "山田太郎", grade: 6 },
    { id: 2, name: "山田花子", grade: 4 },
  ];

  return (
    <div>
      <StudentManagerDashboard
        title="学生管理"
        students={students}
        selectedStudent={selectedStudent}
        onStudentSelect={setSelectedStudent}
        onAddStudent={() => console.log("Add Student")}
        onApplyForExams={() => console.log("Apply for Exams")}
        onViewResults={() => console.log("View Results")}
        onEditStudent={(student) => console.log("Edit Student", student)}
        onDeleteStudent={(student) => console.log("Delete Student", student)}
      />
    </div>
  );
}

export default StudentManagerDashboard;