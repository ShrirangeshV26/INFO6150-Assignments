const USER_FULL_NAME = "Shrirangesh Vedanarayanan";
const USER_NUID = "2110110887";
const INITIAL_COUNT = 3;

// Table state
const tableBody = document.getElementById('tableBody');
const addBtn = document.getElementById('addBtn');
const submitBtn = document.getElementById('submitBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalInput = document.getElementById('modalInput');
const modalOk = document.getElementById('modalOk');
const modalCancel = document.getElementById('modalCancel');

let rows = [];
let availableIds = [];
let selectedSet = new Set();
let editingId = null;


function createArrowButton(){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'arrow-btn';
  btn.setAttribute('aria-label', 'expand row');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5l8 7-8 7" stroke="#1fab2a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  return btn;
  }


function renderTable(){
  tableBody.innerHTML = '';
  rows.sort((a,b)=>a.id-b.id);

  for (const r of rows){
    const tr = document.createElement('tr');
    tr.dataset.id = r.id;

    const tdIndex = document.createElement('td');
    tdIndex.textContent = r.id;
    tr.appendChild(tdIndex);

    const tdArrow = document.createElement('td');
    const arrowBtn = createArrowButton();
    arrowBtn.addEventListener('click', ()=>toggleDetail(r.id, arrowBtn));
    tdArrow.appendChild(arrowBtn);
    tr.appendChild(tdArrow);

    const tdName = document.createElement('td'); tdName.textContent = r.name; tr.appendChild(tdName);
    const tdTeacher = document.createElement('td'); tdTeacher.textContent = r.teacher; tr.appendChild(tdTeacher);
    const tdClass = document.createElement('td'); tdClass.textContent = r.className; tr.appendChild(tdClass);

    const tdCheck = document.createElement('td');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.dataset.id = r.id;
    cb.addEventListener('change', onCheckboxChange);
    tdCheck.appendChild(cb);
    tr.appendChild(tdCheck);

    const tdEdit = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn hidden';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', ()=>onEditClick(r.id));
    tdEdit.appendChild(editBtn);
    tr.appendChild(tdEdit);

    const tdDelete = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.className = 'action-btn hidden';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', ()=>onDeleteClick(r.id));
    tdDelete.appendChild(delBtn);
    tr.appendChild(tdDelete);

      tableBody.appendChild(tr);
    }
  }
  if (rows.length === 0){
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 8;
    td.style.textAlign = 'center';
    td.style.padding = '18px';
    td.textContent = 'No student records';
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
  updateSubmitState();


function toggleDetail(id, arrowBtn){
  const tr = tableBody.querySelector(`tr[data-id="${id}"]`);
  if (!tr) return;
  const next = tr.nextElementSibling;
  if (next && next.classList.contains('detail-row')){
    next.remove();
    arrowBtn.classList.remove('expanded');
  } else {
    const detail = document.createElement('tr');
    detail.className = 'detail-row';
    const td = document.createElement('td');
    td.colSpan = 8;
    const rowData = rows.find(r=>r.id===id);
    td.innerHTML = `<strong>Details for ${rowData.name}:</strong> Teacher: ${rowData.teacher}. Class: ${rowData.className}.`;
    detail.appendChild(td);
    tr.parentNode.insertBefore(detail, tr.nextSibling);
    arrowBtn.classList.add('expanded');
  }
}

function findNextId(){
  if (availableIds.length>0){
    availableIds.sort((a,b)=>a-b);
    return availableIds.shift();
  }
  const max = rows.reduce((m,r)=>Math.max(m,r.id), 0);
  return max+1;
}

function addNewStudent(){
  try {
    const id = findNextId();
    const newRow = {
      id: id,
      name: `Student ${id}`,
      teacher: `Teacher ${id}`,
      className: `Class ${id}`
    };
    rows.push(newRow);
    renderTable();
    alert(`${newRow.name} Record added successfully`);
  } catch (err){
    alert('Error: could not add record');
    console.error(err);
  }
}

function onCheckboxChange(e){
  const id = Number(e.target.dataset.id);
  const tr = tableBody.querySelector(`tr[data-id="${id}"]`);
  const editBtn = tr.querySelector('td:nth-last-child(2) > button');
  const delBtn = tr.querySelector('td:last-child > button');

  if (e.target.checked){
    tr.classList.add('selected');
    selectedSet.add(id);
    editBtn.classList.remove('hidden');
    delBtn.classList.remove('hidden');
  } else {
    tr.classList.remove('selected');
    selectedSet.delete(id);
    editBtn.classList.add('hidden');
    delBtn.classList.add('hidden');
  }
  updateSubmitState();
}
function updateSubmitState(){
  if (selectedSet.size > 0){
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');
    submitBtn.classList.add('enabled');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enabled');
    submitBtn.classList.add('disabled');
  }
}
function onDeleteClick(id){
  const row = rows.find(r=>r.id===id);
  if (!row) return;
  rows = rows.filter(r=>r.id!==id);
  if (!availableIds.includes(id)) availableIds.push(id);
  selectedSet.delete(id);
  renderTable();
  alert(`${row.name} Record deleted successfully`);
}

function onEditClick(id){
  editingId = id;
  modalTitle.textContent = `Edit details of Student ${id}`;
  modalInput.value = '';
  modalBackdrop.style.display = 'flex';
  modalInput.focus();
}

modalOk.addEventListener('click', ()=>{
  const val = modalInput.value.trim();
  const id = editingId;
  modalBackdrop.style.display = 'none';
  if (val.length > 0){
    alert(`Student ${id} data updated successfully`);
  } else {
    alert('No data entered. Update cancelled.');
  }
  editingId = null;
});
modalCancel.addEventListener('click', ()=>{
  modalBackdrop.style.display = 'none';
  editingId = null;
});
modalBackdrop.addEventListener('click', (e)=>{
  if (e.target === modalBackdrop){
    modalBackdrop.style.display = 'none';
    editingId = null;
  }
});

function init(){
  document.getElementById('fullName').textContent = `Full Name: ${USER_FULL_NAME}`;
  document.getElementById('nuid').textContent = `NUID: ${USER_NUID}`;

  for (let i=1;i<=INITIAL_COUNT;i++){
    rows.push({
      id:i,
      name:`Student ${i}`,
      teacher:`Teacher ${i}`,
      className:`Class ${i}`
    });
  }
  renderTable();

  addBtn.addEventListener('click', addNewStudent);
  submitBtn.addEventListener('click', ()=>{
    if (selectedSet.size === 0) return;
    const list = Array.from(selectedSet).sort((a,b)=>a-b).map(id=>{
      const r = rows.find(rr=>rr.id===id);
      return r ? r.name : `Student ${id}`;
    });
    alert('Submitting selected: ' + list.join(', '));
  });
}
document.addEventListener('DOMContentLoaded', init);