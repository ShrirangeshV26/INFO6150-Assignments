const form = document.getElementById('feedbackForm');
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
const submitBtn = document.getElementById('submitBtn');

const emailRegex = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const zipRegex = /^\d{5}$/;

function validateField(field) {
  let valid = true;
  const val = field.value.trim();
  const errorEl = document.getElementById(field.id + 'Error');

  if(field.id === 'firstName' || field.id === 'lastName'){
    valid = /^[A-Za-z0-9]+$/.test(val) && val.length >= 2 && val.length <= 20;
    errorEl.textContent = valid ? '' : 'Alphanumeric only, 2-20 chars';
  } else if(field.id === 'emailId'){
    valid = emailRegex.test(val);
    errorEl.textContent = valid ? '' : 'Use @northeastern.edu email';
  } else if(field.id === 'phoneNumber'){
    valid = phoneRegex.test(val);
    errorEl.textContent = valid ? '' : 'Format: (XXX) XXX-XXXX';
  } else if(field.id === 'zipcode'){
    valid = zipRegex.test(val);
    errorEl.textContent = valid ? '' : '5 digits only';
  } else if(field.id === 'street1'){
    valid = val.length >= 5;
    errorEl.textContent = valid ? '' : 'Minimum 5 characters';
  } else if(field.id === 'comments'){
    valid = val.length >= 5;
    errorEl.textContent = valid ? '' : 'At least 5 characters';
  }

  errorEl.style.display = valid ? 'none' : 'block';
  return valid;
}

fields.phone.addEventListener('input', (e)=>{
  let x = e.target.value.replace(/\D/g,'').substring(0,10);
  let formatted = '';
  if(x.length > 0) formatted = '(' + x.substring(0,3);
  if(x.length >= 4) formatted += ') ' + x.substring(3,6);
  if(x.length >= 7) formatted += '-' + x.substring(6,10);
  e.target.value = formatted;
  validateField(fields.phone);
});


fields.street2.addEventListener('input', ()=>{
  document.getElementById('street2Counter').textContent =
    `${fields.street2.value.length}/20 characters used`;
});


[fields.firstName, fields.lastName, fields.email, fields.zip, fields.street1, fields.comments].forEach(f=>{
  f.addEventListener('input', ()=>checkFormValidity());
});
fields.phone.addEventListener('input', ()=>checkFormValidity());


Array.from(fields.title).forEach(r=>{
  r.addEventListener('change', ()=>checkFormValidity());
});

