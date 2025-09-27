const USER_FULL_NAME = "Shrirangesh Vedanarayanan";
const USER_NUID = "2110110887";
const INITIAL_COUNT = 3;

const fullNameDiv = document.getElementById("fullName");
const nuidDiv = document.getElementById("nuid");
const addBtn = document.getElementById("addBtn");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("tableBody");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById("modalInput");
const modalCancel = document.getElementById("modalCancel");
const modalOk = document.getElementById("modalOk");

let studentCount = 0;

window.addEventListener("DOMContentLoaded", () => {
  fullNameDiv.textContent = "Full Name: " + USER_FULL_NAME;
  nuidDiv.textContent = "NUID: " + USER_NUID;

  for (let i = 1; i <= INITIAL_COUNT; i++) addStudentRow(i);
  studentCount = INITIAL_COUNT;

  submitBtn.disabled = true;
  submitBtn.classList.add("disabled");
});

function addStudentRow(num) {
  const tr = document.createElement("tr");

  const numTd = document.createElement("td");
  numTd.textContent = num;
  tr.appendChild(numTd);

  const expandTd = document.createElement("td");
  const arrow = document.createElement("span");
  arrow.textContent = "➤";
  arrow.style.cursor = "pointer";
  arrow.addEventListener("click", () => toggleExpandRow(tr));
  expandTd.appendChild(arrow);
  tr.appendChild(expandTd);

  const nameTd = document.createElement("td");
  nameTd.textContent = "Student " + num;
  tr.appendChild(nameTd);

  const teacherTd = document.createElement("td");
  teacherTd.textContent = "Teacher " + num;
  tr.appendChild(teacherTd);

  const classTd = document.createElement("td");
  classTd.textContent = "Class " + num;
  tr.appendChild(classTd);

  const checkTd = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () =>
    handleCheckboxChange(checkbox, tr, nameTd.textContent)
  );
  checkTd.appendChild(checkbox);
  tr.appendChild(checkTd);

  tr.appendChild(document.createElement("td"));
  tr.appendChild(document.createElement("td"));

  tableBody.appendChild(tr);
}

function renumberStudents() {
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, i) => {
    row.children[0].textContent = i + 1;
    row.children[2].textContent = "Student " + (i + 1);
    row.children[3].textContent = "Teacher " + (i + 1);
    row.children[4].textContent = "Class " + (i + 1);
  });
  studentCount = rows.length;
}

function toggleExpandRow(row) {
  row.classList.toggle("expanded");
  if (row.classList.contains("expanded")) {
    alert(`${row.children[2].textContent} expanded`);
  } else {
    alert(`${row.children[2].textContent} collapsed`);
  }
}

function handleCheckboxChange(checkbox, row, studentName) {
  const editTd = row.children[6];
  const delTd = row.children[7];

  if (checkbox.checked) {
    row.style.backgroundColor = "yellow";
    submitBtn.disabled = false;
    submitBtn.classList.remove("disabled");
    submitBtn.style.backgroundColor = "orange";

    if (!editTd.firstChild) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEditModal(studentName));
      editTd.appendChild(editBtn);
    }
    if (!delTd.firstChild) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        tableBody.removeChild(row);
        renumberStudents();
        alert(`${studentName} Record deleted successfully`);
        checkIfAnySelected();
      });
      delTd.appendChild(delBtn);
    }
  } else {
    row.style.backgroundColor = "white";
    editTd.innerHTML = "";
    delTd.innerHTML = "";
    checkIfAnySelected();
  }
}

function checkIfAnySelected() {
  const anyChecked = tableBody.querySelector("input[type=checkbox]:checked");
  if (!anyChecked) {
    submitBtn.disabled = true;
    submitBtn.classList.add("disabled");
    submitBtn.style.backgroundColor = "gray";
  }
}

function openEditModal(studentName) {
  if (!modalBackdrop || !modalInput || !modalOk || !modalCancel) return;

  modalTitle.textContent = `Edit details of ${studentName}`;
  modalInput.value = "";
  modalBackdrop.style.display = "flex";

  modalOk.onclick = () => {
    if (modalInput.value.trim()) {
      alert(`${studentName} data updated successfully`);
    }
    modalBackdrop.style.display = "none";
  };

  modalCancel.onclick = () => {
    modalBackdrop.style.display = "none";
  };
}

addBtn.addEventListener("click", () => {
  const newNum = studentCount + 1;
  addStudentRow(newNum);
  studentCount++;
  renumberStudents();
  alert(`Student ${newNum} Record added successfully`);
});

