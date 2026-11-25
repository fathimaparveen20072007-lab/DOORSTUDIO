
// Header and mobile navigation
const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>50));
function toggleMenu(){document.getElementById('navLinks').classList.toggle('open')}
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));

// Scroll reveal, with a graceful fallback for browsers without IntersectionObserver
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('show'))}

// Door-like offer cards: the panel swings open from its left edge
function toggleOffer(button){
  const card=button.closest('.offer-card');
  const isOpen=card.classList.toggle('is-open');
  const trigger=card.querySelector('.offer-toggle');
  if(trigger){
    trigger.setAttribute('aria-expanded',String(isOpen));
    const name=trigger.getAttribute('aria-label').replace(/^(Open|Close) /,'');
    trigger.setAttribute('aria-label',(isOpen?'Close ':'Open ')+name);
    trigger.textContent=isOpen?'Close offer':'Open offer';
  }
}

// Product enquiry basket
let inquiries=[];
function addInquiry(product){if(!inquiries.includes(product))inquiries.push(product);updateInquiry();openInquiry()}
function removeInquiry(product){inquiries=inquiries.filter(item=>item!==product);updateInquiry()}
function updateInquiry(){
  document.getElementById('inquiryCount').textContent=inquiries.length;
  const list=document.getElementById('inquiryList');
  if(!inquiries.length){list.innerHTML='<p style="color:#88796b;font-size:13px;margin-top:20px">Your selected products will appear here.</p>';return}
  list.innerHTML=inquiries.map((item,index)=>`<div class="inquiry-item"><span>${item}</span><button type="button" onclick="removeInquiry(${JSON.stringify(item)})">Remove</button></div>`).join('');
}
function openInquiry(){document.getElementById('inquiryPanel').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeInquiry(){document.getElementById('inquiryPanel').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
function sendInquiry(){
  if(!inquiries.length){alert('Please add at least one product first.');return}
  const subject=encodeURIComponent('Door Studio Product Enquiry');
  const body=encodeURIComponent('Hello Door Studio,\n\nI am interested in:\n'+inquiries.map(item=>'• '+item).join('\n')+'\n\nPlease share more details.');
  window.location.href=`mailto:hello@doorstudio.in?subject=${subject}&body=${body}`;
}
// Close the enquiry drawer with Escape
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeInquiry()});
