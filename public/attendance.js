const semSubjects = {
  sem1: ["Math", "English", "Physics", "Kannada", "Electronics"],
  sem2: ["Chemistry", "Biology", "Environmental Studies", "Kannada", "Computer Fundamentals"],
  sem3: ["Python", "Data Structures", "Discrete Math", "Linear Algebra", "Statistics"],
  sem4: ["Java", "DBMS", "Operating Systems", "Networks", "Software Engineering"],
  sem5: ["Machine Learning", "AI", "Web Development", "Cloud Computing", "Cyber Security"]
};

const semRanges = {
  sem1: { start: "2023-01-01", end: "2023-06-30" },
  sem2: { start: "2023-07-01", end: "2023-12-31" },
  sem3: { start: "2024-01-01", end: "2024-06-30" },
  sem4: { start: "2024-07-01", end: "2024-12-31" },
  sem5: { start: "2025-01-01", end: "2025-06-30" }
};

const attendanceData = {};
function genSemester(semKey) {
  const { start, end } = semRanges[semKey];
  const subjects = semSubjects[semKey];
  let cur = new Date(start);
  const last = new Date(end);
  attendanceData[semKey] = {};
  while (cur <= last) {
    const yyyyMMdd = cur.toISOString().slice(0, 10);
    attendanceData[semKey][yyyyMMdd] = {};
    subjects.forEach(sub => {
      attendanceData[semKey][yyyyMMdd][sub] = Math.random() < 0.8 ? "P" : "A";
    });
    cur.setDate(cur.getDate() + 1);
  }
}
Object.keys(semRanges).forEach(genSemester);

const semesterButtons = document.querySelectorAll(".semester-btn");
const semesterPanels = document.querySelectorAll(".semester-panel");
const datePicker = document.getElementById("att-date");

let currentSemester = "sem1";

function renderAttendance(sem, selectedDate) {
  const container = document.getElementById(`${sem}-data`);
  const subjects = semSubjects[sem];
  if (!attendanceData[sem][selectedDate]) {
    container.innerHTML = `<p>No classes on this date.</p>`;
    return;
  }

  const daily = attendanceData[sem][selectedDate];
  const dailyRow = subjects.map(s => {
    const status = daily[s];
    const cls = status === "P" ? "present" : "absent";
    return `<td class="${cls}">${status}</td>`;
  }).join("");

  const subjectTotals = subjects.map(sub => {
    let p = 0;
    Object.keys(attendanceData[sem]).forEach(date => {
      if (date <= selectedDate && attendanceData[sem][date][sub] === "P") p++;
    });
    return `<td><div>Total: ${p}</div></td>`;
  }).join("");

  let presentTotal = 0, absentTotal = 0, totalClasses = 0;
  Object.keys(attendanceData[sem]).forEach(date => {
    if (date <= selectedDate) {
      subjects.forEach(sub => {
        if (attendanceData[sem][date][sub] === "P") presentTotal++;
        else absentTotal++;
        totalClasses++;
      });
    }
  });

  const percent = totalClasses ? ((presentTotal / totalClasses) * 100).toFixed(1) : "0.0";

  container.innerHTML = `
    <table>
      <tr><th>Date</th>${subjects.map(s => `<th>${s}</th>`).join("")}</tr>
      <tr><td>${selectedDate}</td>${dailyRow}</tr>
      <tr><td><strong>Total Present</strong></td>${subjectTotals}</tr>
    </table>
    <div class="summary">
      ✅ Total Present: ${presentTotal} &nbsp; | &nbsp;
      ❌ Total Absent: ${absentTotal} &nbsp; | &nbsp;
      📊 Attendance: ${percent}%
    </div>
  `;
}

function setDatePickerBounds(sem) {
  datePicker.min = semRanges[sem].start;
  datePicker.max = semRanges[sem].end;
  if (datePicker.value < datePicker.min || datePicker.value > datePicker.max) {
    datePicker.value = semRanges[sem].start;
  }
}

setDatePickerBounds(currentSemester);
renderAttendance(currentSemester, datePicker.value);

semesterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    semesterButtons.forEach(b => b.classList.remove("active"));
    semesterPanels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const sem = btn.dataset.sem;
    document.getElementById(sem).classList.add("active");
    currentSemester = sem;
    setDatePickerBounds(currentSemester);
    renderAttendance(currentSemester, datePicker.value);
  });
});

datePicker.addEventListener("change", () => {
  renderAttendance(currentSemester, datePicker.value);
});

