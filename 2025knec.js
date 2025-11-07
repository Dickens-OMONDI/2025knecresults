// List of students with their fixed schools and marks
const students = [
  {
    index: "42738105055",
    name: "Omondi Dickens",
    school: "Sunrise High School",
    subjects: {
      "Mathematics": 72,
      "Kiswahili": 45,
      "English": 80,
      "Geography": 67,
      "History": 58,
      "Business": 49
    }
  },
  {
    index: "427015002",
    name: "Achieng Mary",
    school: "Green Valley Academy",
    subjects: {
      "Mathematics": 5,
      "Kiswahili": 74,
      "English": 6,
      "Geography": 9,
      "History": 7,
      "Business": 0
    }
  },
  {
    index: "427015003",
    name: "Otieno Brian",
    school: "St. Mary’s Secondary School",
    subjects: {
      "Mathematics": 38,
      "Kiswahili": 55,
      "English": 47,
      "Geography": 41,
      "History": 60,
      "Business": 36
    }
  },
  {
    index: "427015004",
    name: "Aoko Faith",
    school: "Hope Valley Mixed",
    subjects: {
      "Mathematics": 88,
      "Kiswahili": 92,
      "English": 85,
      "Geography": 77,
      "History": 81,
      "Business": 90
    }
  }
];

// Convert mark to grade
function markToGrade(mark) {
  if (mark >= 80) return { grade: "A", points: 12 };
  if (mark >= 75) return { grade: "A-", points: 11 };
  if (mark >= 70) return { grade: "B+", points: 10 };
  if (mark >= 65) return { grade: "B", points: 9 };
  if (mark >= 60) return { grade: "B-", points: 8 };
  if (mark >= 55) return { grade: "C+", points: 7 };
  if (mark >= 50) return { grade: "C", points: 6 };
  if (mark >= 45) return { grade: "C-", points: 5 };
  if (mark >= 40) return { grade: "D+", points: 4 };
  if (mark >= 35) return { grade: "D", points: 3 };
  if (mark >= 30) return { grade: "D-", points: 2 };
  return { grade: "E", points: 1 };
}

// Handle search form
document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const index = document.getElementById("index").value.trim();
  const name = document.getElementById("fullname").value.trim();

  const student = students.find(
    s => s.index === index && s.name.toLowerCase() === name.toLowerCase()
  );

  if (student) {
    showResults(student);
  } else {
    alert("Student not found. Please check index number and name.");
  }
});

// Display results
function showResults(student) {
  document.querySelector(".container").classList.add("hidden");
  document.getElementById("resultsSection").classList.remove("hidden");

  document.getElementById("studentInfo").innerHTML = `
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>Index:</strong> ${student.index}</p>
    <p><strong>School:</strong> ${student.school}</p>
  `;

  const tbody = document.getElementById("resultsTable");
  tbody.innerHTML = "";

  let totalPoints = 0;
  let count = 0;

  for (const [subject, mark] of Object.entries(student.subjects)) {
    const { grade, points } = markToGrade(mark);
    totalPoints += points;
    count++;
    tbody.innerHTML += `
      <tr>
        <td>${count}</td>
        <td>${subject}</td>
        <td>${grade}</td>
        <td>${points}</td>
      </tr>
    `;
  }

  const meanPoints = totalPoints / count;
  const meanGrade = getMeanGrade(meanPoints);

  document.getElementById("meanGrade").textContent = `${meanGrade}`;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    location.reload();
  });
}

// Determine mean grade from points
function getMeanGrade(meanPoints) {
  if (meanPoints >= 11.5) return "A";
  if (meanPoints >= 10.5) return "A-";
  if (meanPoints >= 9.5) return "B+";
  if (meanPoints >= 8.5) return "B";
  if (meanPoints >= 7.5) return "B-";
  if (meanPoints >= 6.5) return "C+";
  if (meanPoints >= 5.5) return "C";
  if (meanPoints >= 4.5) return "C-";
  if (meanPoints >= 3.5) return "D+";
  if (meanPoints >= 2.5) return "D";
  if (meanPoints >= 1.5) return "D-";
  return "E";
}