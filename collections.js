
/* Product data */
const products = [
  {name:"Wooden Classic Door",category:"doors",description:"Elegant natural wood finish for modern interiors.",tag:"Popular",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"},
  {name:"Modern Minimal Door",category:"doors",description:"Clean lines and a sophisticated contemporary look.",tag:"",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"},
  {name:"Luxury Entrance Door",category:"doors",description:"A bold entrance with a premium architectural finish.",tag:"Premium",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"},
  {name:"Classic Panel Door",category:"doors",description:"Timeless panel detailing for elegant spaces.",tag:"",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"},
  {name:"Contemporary Door",category:"doors",description:"Modern styling with a warm and welcoming finish.",tag:"",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"},
  {name:"Natural Finish Door",category:"doors",description:"Natural textures that add warmth to your home.",tag:"",image:"https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=900&q=85"},
  {name:"Smart Digital Lock",category:"locks",description:"Modern access technology for added convenience.",tag:"Trending",image:"https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=900&q=85"},
  {name:"Premium Door Lock",category:"locks",description:"Reliable locking solutions with a refined finish.",tag:"",image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85"},
  {name:"Security Mortise Lock",category:"locks",description:"Practical security with a clean modern design.",tag:"",image:"https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85"},
  {name:"Contemporary Lock Set",category:"locks",description:"A stylish locking set for everyday use.",tag:"",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85"},
  {name:"Minimal Lever Lock",category:"locks",description:"Simple styling for a coordinated door design.",tag:"",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"},
  {name:"Classic Cylinder Lock",category:"locks",description:"Everyday functionality with a classic appearance.",tag:"",image:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"},
  {name:"Stainless Steel Hinge",category:"hinges",description:"Durable hardware for smooth everyday movement.",tag:"",image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85"},
  {name:"Brass Finish Hinge",category:"hinges",description:"A warm metallic finish for elegant interiors.",tag:"Premium",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"},
  {name:"Heavy Duty Hinge",category:"hinges",description:"Designed for dependable support and stability.",tag:"",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"},
  {name:"Concealed Hinge",category:"hinges",description:"A discreet solution for a seamless appearance.",tag:"",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"},
  {name:"Antique Finish Hinge",category:"hinges",description:"Traditional character with a decorative finish.",tag:"",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"},
  {name:"Bearing Hinge",category:"hinges",description:"Smooth operation for frequently used doors.",tag:"",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"},
  {name:"Gold Modern Handle",category:"handles",description:"A luxurious gold accent for modern doors.",tag:"Popular",image:"https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=900&q=85"},
  {name:"Matte Black Handle",category:"handles",description:"Bold minimalism with a smooth matte finish.",tag:"",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"},
  {name:"Brushed Steel Handle",category:"handles",description:"Understated elegance for contemporary spaces.",tag:"",image:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85"},
  {name:"Classic Brass Handle",category:"handles",description:"Classic detailing with a rich brass appearance.",tag:"",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"},
  {name:"Long Pull Handle",category:"handles",description:"A statement design for larger entrance doors.",tag:"",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85"},
  {name:"Minimal Lever Handle",category:"handles",description:"Simple and functional with a refined silhouette.",tag:"",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85"}
];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("productSearch");
const wishlistFilter = document.getElementById("wishlistFilter");
const wishlistCount = document.getElementById("wishlistCount");
const emptyState = document.getElementById("emptyState");

let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem("doorStudioWishlist") || "[]"); }
catch(error) { wishlist = []; }

let inquiries = [];
let activeCategory = "all";
let wishlistOnly = false;

function renderProducts(){
  productGrid.innerHTML = products.map((product,index) => {
    const saved = wishlist.includes(product.name);
    return `
      <article class="product-card" data-category="${product.category}" style="animation-delay:${Math.min(index*.025,.3)}s">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <button class="wishlist-btn ${saved ? "saved" : ""}" type="button"
            data-wishlist="${product.name}" aria-label="${saved ? "Remove" : "Add"} ${product.name} ${saved ? "from" : "to"} wishlist"
            aria-pressed="${saved}">
            <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <small>${product.category}</small>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-bottom">
            <span>Selected collection</span>
            <button type="button" data-enquire="${product.name}">ENQUIRE NOW <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </article>`;
  }).join("");
  filterProducts();
}

function saveWishlist(){
  try { localStorage.setItem("doorStudioWishlist", JSON.stringify(wishlist)); }
  catch(error) { console.warn("Wishlist could not be saved in this browser."); }
  wishlistCount.textContent = wishlist.length;
}

function filterProducts(){
  const searchText = searchInput.value.toLowerCase().trim();
  let visible = 0;

  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector(".product-info p").textContent.toLowerCase();
    const category = card.dataset.category;
    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch = name.includes(searchText) || description.includes(searchText) || category.includes(searchText);
    const matchesWishlist = !wishlistOnly || wishlist.includes(card.querySelector("h3").textContent.trim());
    const show = matchesCategory && matchesSearch && matchesWishlist;
    card.classList.toggle("hide", !show);
    card.style.display = show ? "" : "none";
    if(show) visible++;
  });

  productGrid.style.display = visible ? "grid" : "none";
  emptyState.style.display = visible ? "none" : "block";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    wishlistOnly = false;
    wishlistFilter.classList.remove("active");
    filterProducts();
  });
});

searchInput.addEventListener("input", filterProducts);

wishlistFilter.addEventListener("click", () => {
  wishlistOnly = !wishlistOnly;
  wishlistFilter.classList.toggle("active", wishlistOnly);
  filterProducts();
});

productGrid.addEventListener("click", event => {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const enquiryButton = event.target.closest("[data-enquire]");

  if(wishlistButton){
    const name = wishlistButton.dataset.wishlist;
    wishlist = wishlist.includes(name) ? wishlist.filter(item => item !== name) : [...wishlist, name];
    saveWishlist();
    const saved = wishlist.includes(name);
    wishlistButton.classList.toggle("saved", saved);
    wishlistButton.setAttribute("aria-pressed", String(saved));
    wishlistButton.setAttribute("aria-label", `${saved ? "Remove" : "Add"} ${name} ${saved ? "from" : "to"} wishlist`);
    wishlistButton.innerHTML = `<i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
    filterProducts();
  }

  if(enquiryButton) addInquiry(enquiryButton.dataset.enquire);
});

/* URL category support */
const requestedCategory = new URLSearchParams(window.location.search).get("category");
if(requestedCategory){
  const matchingButton = [...filterButtons].find(button => button.dataset.category === requestedCategory.toLowerCase());
  if(matchingButton) matchingButton.click();
}

/* Header scroll + mobile navigation */
const header = document.getElementById("header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 50));
function toggleMenu(){
  const links = document.getElementById("navLinks");
  const button = document.querySelector(".menu-btn");
  const open = links.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
  button.textContent = open ? "×" : "☰";
}
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
    document.querySelector(".menu-btn").setAttribute("aria-expanded","false");
    document.querySelector(".menu-btn").textContent = "☰";
  });
});

/* Enquiry drawer — mirrors index page */
function addInquiry(product){
  if(!inquiries.includes(product)) inquiries.push(product);
  updateInquiry();
  openInquiry();
}
function removeInquiry(product){
  inquiries = inquiries.filter(item => item !== product);
  updateInquiry();
}
function updateInquiry(){
  document.getElementById("inquiryCount").textContent = inquiries.length;
  const list = document.getElementById("inquiryList");
  if(!inquiries.length){
    list.innerHTML = '<p style="color:#88796b;font-size:13px;margin-top:20px">Your selected products will appear here.</p>';
    return;
  }
  list.innerHTML = inquiries.map(item =>
    `<div class="inquiry-item"><span>${item}</span><button type="button" data-remove="${item}">Remove</button></div>`
  ).join("");
}
document.getElementById("inquiryList").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if(button) removeInquiry(button.dataset.remove);
});
function openInquiry(){
  document.getElementById("inquiryPanel").classList.add("open");
  document.getElementById("overlay").classList.add("show");
  document.getElementById("inquiryPanel").setAttribute("aria-hidden","false");
}
function closeInquiry(){
  document.getElementById("inquiryPanel").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("inquiryPanel").setAttribute("aria-hidden","true");
}
function sendInquiry(){
  if(!inquiries.length){alert("Please add at least one product first.");return;}
  const subject = encodeURIComponent("Door Studio Product Enquiry");
  const body = encodeURIComponent("Hello Door Studio,\n\nI am interested in:\n" + inquiries.map(item => "• " + item).join("\n") + "\n\nPlease share more details.");
  window.location.href = `mailto:hello@doorstudio.in?subject=${subject}&body=${body}`;
}
window.addEventListener("keydown", event => { if(event.key === "Escape") closeInquiry(); });

renderProducts();
saveWishlist();
updateInquiry();
