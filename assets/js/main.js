<script>
document.addEventListener("DOMContentLoaded", function(){

/* =========================
   PERSON VIEWER
========================= */

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewer-img");
const viewerName = document.getElementById("viewer-name");
const viewerRole = document.getElementById("viewer-role");

const cards = document.querySelectorAll(".person-card");

let currentIndex = 0;

cards.forEach((card, index) => {
  card.addEventListener("click", () => {

    const img = card.querySelector("img");
    const name = card.querySelector("h3").innerText;
    const role = card.querySelector(".person-role").innerText;

    currentIndex = index;

    viewer.style.display = "flex";
    viewerImg.src = img.src;
    viewerName.innerText = name;
    viewerRole.innerText = role;

  });
});

// ปิด viewer
document.querySelector(".viewer-close").onclick = () => {
  viewer.style.display = "none";
};

// คลิกพื้นหลังปิด
viewer.addEventListener("click", (e) => {
  if(e.target === viewer){
    viewer.style.display = "none";
  }
});

// เลื่อนภาพ
function showImage(index){
  if(index < 0) index = cards.length - 1;
  if(index >= cards.length) index = 0;

  currentIndex = index;

  const card = cards[currentIndex];
  const img = card.querySelector("img");
  const name = card.querySelector("h3").innerText;
  const role = card.querySelector(".person-role").innerText;

  viewerImg.src = img.src;
  viewerName.innerText = name;
  viewerRole.innerText = role;
}

document.querySelector(".viewer-prev").onclick = () => {
  showImage(currentIndex - 1);
};

document.querySelector(".viewer-next").onclick = () => {
  showImage(currentIndex + 1);
};

// keyboard
document.addEventListener("keydown", (e) => {
  if(viewer.style.display === "flex"){
    if(e.key === "Escape") viewer.style.display = "none";
    if(e.key === "ArrowRight") showImage(currentIndex + 1);
    if(e.key === "ArrowLeft") showImage(currentIndex - 1);
  }
});


/* =========================
   KNOWLEDGE SLIDER
========================= */

const slides = document.querySelectorAll(".k-slide");
const dotsContainer = document.getElementById("kDots");

let index = 0;
let interval;

// สร้าง dot
slides.forEach((_,i)=>{
  const dot = document.createElement("div");
  dot.classList.add("k-dot");
  if(i===0) dot.classList.add("active");

  dot.addEventListener("click",()=>{
    index=i;
    showSlide();
    resetAuto();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".k-dot");

// แสดงสไลด์
function showSlide(){
  slides.forEach(s=>s.classList.remove("active"));
  dots.forEach(d=>d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// ถัดไป
function next(){
  index++;
  if(index>=slides.length) index=0;
  showSlide();
}

// auto 5 วิ
function startAuto(){
  interval = setInterval(next,5000);
}

function resetAuto(){
  clearInterval(interval);
  startAuto();
}

// ปุ่ม
document.querySelector(".k-next").addEventListener("click",()=>{
  next();
  resetAuto();
});

document.querySelector(".k-prev").addEventListener("click",()=>{
  index--;
  if(index<0) index=slides.length-1;
  showSlide();
  resetAuto();
});

// hover pause
const slider = document.getElementById("kSlider");

slider.addEventListener("mouseenter",()=>{
  clearInterval(interval);
});

slider.addEventListener("mouseleave",()=>{
  startAuto();
});

// เริ่มทำงาน
startAuto();

});
</script>