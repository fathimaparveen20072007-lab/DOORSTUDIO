
// Header and mobile navigation — same behaviour as index.html
const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>50));
function toggleMenu(){
  const nav=document.getElementById('navLinks');
  nav.classList.toggle('open');
  document.querySelector('.menu-btn').setAttribute('aria-expanded',String(nav.classList.contains('open')));
}
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));

// Scroll reveal
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'))}

// Shared product enquiry drawer behaviour (same functions as index.html)
let inquiries=[];
function addInquiry(product){if(!inquiries.includes(product))inquiries.push(product);updateInquiry();openInquiry()}
function removeInquiry(product){inquiries=inquiries.filter(item=>item!==product);updateInquiry()}
function updateInquiry(){
  document.getElementById('inquiryCount').textContent=inquiries.length;
  const list=document.getElementById('inquiryList');
  if(!inquiries.length){list.innerHTML='<p style="color:#88796b;font-size:13px;margin-top:20px">Your selected products will appear here.</p>';return}
  list.innerHTML=inquiries.map(item=>`<div class="inquiry-item"><span></span><button type="button">Remove</button></div>`).join('');
  [...list.querySelectorAll('.inquiry-item')].forEach((row,index)=>{
    row.querySelector('span').textContent=inquiries[index];
    row.querySelector('button').addEventListener('click',()=>removeInquiry(inquiries[index]));
  });
}
function openInquiry(){document.getElementById('inquiryPanel').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeInquiry(){document.getElementById('inquiryPanel').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
function sendInquiry(){
  if(!inquiries.length){alert('Please add at least one product first.');return}
  const subject=encodeURIComponent('Door Studio Product Enquiry');
  const body=encodeURIComponent('Hello Door Studio,\n\nI am interested in:\n'+inquiries.map(item=>'• '+item).join('\n')+'\n\nPlease share more details.');
  window.location.href=`mailto:hello@doorstudio.in?subject=${subject}&body=${body}`;
}
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeInquiry()});

// Product details from a link such as contact.html?product=Classic%20Door%20Handle
const params=new URLSearchParams(window.location.search);
const selectedProduct=params.get('product');
if(selectedProduct){
  document.getElementById('subject').value='Enquiry about '+selectedProduct;
  const product=selectedProduct.toLowerCase();
  const select=document.getElementById('enquiry');
  if(product.includes('door'))select.value='Doors';
  else if(product.includes('lock'))select.value='Locks';
  else if(product.includes('hinge'))select.value='Hinges';
  else if(product.includes('handle'))select.value='Handles';
}

// Contact form validation
const form=document.getElementById('contactForm');
const successMessage=document.getElementById('formSuccess');
function showError(input,message){
  input.classList.add('invalid');
  input.setAttribute('aria-invalid','true');
  input.closest('.form-group').querySelector('.error-message').textContent=message;
}
function clearError(input){
  input.classList.remove('invalid');
  input.setAttribute('aria-invalid','false');
  const error=input.closest('.form-group').querySelector('.error-message');
  if(error)error.textContent='';
}
function validateForm(){
  let valid=true;
  const name=document.getElementById('fullName');
  const phone=document.getElementById('phone');
  const email=document.getElementById('email');
  const enquiry=document.getElementById('enquiry');
  const message=document.getElementById('message');
  const digits=phone.value.replace(/\D/g,'');
  const checks=[
    [name,name.value.trim().length>=2,'Please enter your name.'],
    [phone,digits.length>=10&&digits.length<=15,'Please enter a valid phone number.'],
    [email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),'Please enter a valid email address.'],
    [enquiry,enquiry.value!=='','Please select an enquiry type.'],
    [message,message.value.trim().length>=10,'Please enter at least 10 characters.']
  ];
  checks.forEach(([input,ok,error])=>{if(ok)clearError(input);else{showError(input,error);valid=false}});
  return valid;
}
form.querySelectorAll('input,textarea,select').forEach(input=>{
  input.addEventListener('input',()=>clearError(input));
  input.addEventListener('change',()=>clearError(input));
});
form.addEventListener('submit',event=>{
  event.preventDefault();
  successMessage.classList.remove('show');
  if(!validateForm()){
    const firstInvalid=form.querySelector('.invalid');
    if(firstInvalid){firstInvalid.focus();firstInvalid.scrollIntoView({behavior:'smooth',block:'center'})}
    return;
  }
  const name=document.getElementById('fullName').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const email=document.getElementById('email').value.trim();
  const enquiry=document.getElementById('enquiry').value;
  const subject=document.getElementById('subject').value.trim();
  const message=document.getElementById('message').value.trim();
  const emailSubject=encodeURIComponent(subject||'New '+enquiry+' Enquiry - Door Studio');
  const emailBody=encodeURIComponent(`Hello Door Studio,\n\nI would like to make an enquiry.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nEnquiry Type: ${enquiry}\nSubject: ${subject}\n\nMessage:\n${message}\n\nThank you.`);
  successMessage.classList.add('show');
  successMessage.scrollIntoView({behavior:'smooth',block:'nearest'});
  window.location.href=`mailto:hello@doorstudio.com?subject=${emailSubject}&body=${emailBody}`;
});