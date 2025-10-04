const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const fields = {
  title: document.getElementsByName('title'),
  firstName: document.getElementById('firstName'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('emailId'),
  phone: document.getElementById('phoneNumber'),
  zip: document.getElementById('zipcode'),
  street1: document.getElementById('street1'),
  street2: document.getElementById('street2'),
  select: document.getElementById('infoSelect'),
  comments: document.getElementById('comments')
};

const emailRegex = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const zipRegex = /^\d{5}$/;

function validateField(field){
  const val = field.value.trim();
  const errorEl = document.getElementById(field.id + 'Error');
  let valid = true;

  if(field.id==='firstName'||field.id==='lastName'){
    valid=/^[A-Za-z0-9]+$/.test(val) && val.length>=2 && val.length<=20;
    errorEl.textContent = valid?'':'Alphanumeric only, 2-20 chars';
  } else if(field.id==='emailId'){
    valid=emailRegex.test(val);
    errorEl.textContent = valid?'':'Use @northeastern.edu email';
  } else if(field.id==='phoneNumber'){
    valid=phoneRegex.test(val);
    errorEl.textContent = valid?'':'Format: (XXX) XXX-XXXX';
  } else if(field.id==='zipcode'){
    valid=zipRegex.test(val);
    errorEl.textContent = valid?'':'5 digits only';
  } else if(field.id==='street1'){
    valid=val.length>=5;
    errorEl.textContent = valid?'':'Minimum 5 characters';
  } else if(field.id==='comments'){
    valid=val.length>=5;
    errorEl.textContent = valid?'':'At least 5 characters';
  }

  errorEl.style.display = valid?'none':'block';
  return valid;
}

function formatPhone(e){
  let x=e.target.value.replace(/\D/g,'').substring(0,10);
  let formatted='';
  if(x.length>0) formatted='('+x.substring(0,3);
  if(x.length>=4) formatted+=') '+x.substring(3,6);
  if(x.length>=7) formatted+='-'+x.substring(6,10);
  e.target.value=formatted;
  validateField(fields.phone);
  checkFormValidity();
}

function checkFormValidity(){
  let valid=Array.from(fields.title).some(r=>r.checked);
  document.getElementById('titleError').style.display = valid?'none':'block';

  valid = valid && validateField(fields.firstName);
  valid = valid && validateField(fields.lastName);
  valid = valid && validateField(fields.email);
  valid = valid && validateField(fields.phone);
  valid = valid && validateField(fields.zip);
  valid = valid && validateField(fields.street1);
  valid = valid && validateField(fields.comments);

  const selectValid = fields.select.value!=='';
  document.getElementById('selectError').style.display = selectValid?'none':'block';
  valid = valid && selectValid;

  const dynamicCheckbox=document.getElementById('dynamicCheckbox');
  const dynamicText=document.getElementById('dynamicText');
  if(dynamicCheckbox && dynamicCheckbox.checked){
    valid = valid && dynamicText.value.trim()!=='';
  }

  submitBtn.disabled = !valid;
  return valid;
}

function createDynamicField(){
  const container=document.getElementById('dynamicCheckboxContainer');
  container.innerHTML='';
  if(fields.select.value){
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.id='dynamicCheckbox';
    const label=document.createElement('label');
    label.textContent=` Enable extra input for ${fields.select.value}`;
    const textField=document.createElement('input');
    textField.type='text';
    textField.id='dynamicText';
    textField.placeholder='Dynamic field';
    textField.style.display='none';
    textField.required=true;
    checkbox.addEventListener('change',()=>{
      textField.style.display=checkbox.checked?'inline-block':'none';
      checkFormValidity();
    });
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
    container.appendChild(textField);
  }
  checkFormValidity();
}

// Event Listeners
fields.phone.addEventListener('input', formatPhone);
fields.street2.addEventListener('input', ()=> {
  document.getElementById('street2Counter').textContent=`${fields.street2.value.length}/20 characters used`;
  checkFormValidity();
});

[fields.firstName, fields.lastName, fields.email, fields.zip, fields.street1, fields.comments].forEach(f=>{
  f.addEventListener('input', ()=>{validateField(f); checkFormValidity();});
});
Array.from(fields.title).forEach(r=>r.addEventListener('change', checkFormValidity));
fields.select.addEventListener('change', createDynamicField);

form.addEventListener('submit', e=>{
  e.preventDefault();
  if(!checkFormValidity()) return;

  const dynamicCheckbox=document.getElementById('dynamicCheckbox');
  const dynamicText=document.getElementById('dynamicText');

  const row=document.createElement('tr');
  const getTitle=()=>Array.from(fields.title).find(r=>r.checked)?.value||'';
  [getTitle(), fields.firstName.value, fields.lastName.value, fields.email.value,
   fields.phone.value, fields.zip.value, fields.street1.value, fields.street2.value,
   fields.select.value, dynamicCheckbox?.checked?dynamicText.value:'', fields.comments.value]
  .forEach(v=>{
    const td=document.createElement('td');
    td.textContent=v;
    row.appendChild(td);
  });
  document.querySelector('#resultTable tbody').appendChild(row);
  form.reset();
  document.getElementById('street2Counter').textContent='0/20 characters used';
  document.getElementById('dynamicCheckboxContainer').innerHTML='';
  submitBtn.disabled=true;
});

// Chatbot
const chatbotBtn=document.getElementById('chatbot');
const chatWindow=document.getElementById('chatWindow');
const chatMessages=document.getElementById('chatMessages');
const sendChat=document.getElementById('sendChat');

const faqs={
  email:'You must use your Northeastern email (example: student@northeastern.edu).',
  phone:'The phone number must be in the format (XXX) XXX-XXXX.',
  zip:'The zip code must be exactly 5 digits.',
  required:'All fields are required except Street Address 2.',
  address:'Street Address 2 is optional. If left blank, it will remain empty in the results table.'
};

chatbotBtn.addEventListener('click', ()=>chatWindow.style.display=chatWindow.style.display==='block'?'none':'block');

sendChat.addEventListener('click', ()=>handleChat());
document.getElementById('chatQuestion').addEventListener('keypress', e=>{
  if(e.key==='Enter') handleChat();
});

function handleChat(){
  const q=document.getElementById('chatQuestion').value.trim().toLowerCase();
  if(!q) return;
  addChatMessage('You: '+q);
  let answered=false;
  for(const key in faqs){
    if(q.includes(key)){
      addChatMessage('Bot: '+faqs[key]);
      answered=true;
      break;
    }
  }
  if(!answered) addChatMessage('Bot: Sorry, I don’t know that yet. Please check the instructions.');
  document.getElementById('chatQuestion').value='';
}

function addChatMessage(text){
  const div=document.createElement('div');
  div.textContent=text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop=chatMessages.scrollHeight;
}

