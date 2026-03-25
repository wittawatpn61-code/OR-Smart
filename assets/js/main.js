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

/* ปิด viewer */
document.querySelector(".viewer-close").onclick = () => {
  viewer.style.display = "none";
};

viewer.addEventListener("click", (e) => {
  if(e.target === viewer){
    viewer.style.display = "none";
  }
});

/* เลื่อนภาพ */
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

document.querySelector(".viewer-prev").onclick = () => showImage(currentIndex - 1);
document.querySelector(".viewer-next").onclick = () => showImage(currentIndex + 1);

/* keyboard */
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
const kSlides = document.querySelectorAll(".k-slide");
const dotsContainer = document.getElementById("kDots");

let kIndex = 0;
let kInterval;

/* create dots */
kSlides.forEach((_,i)=>{
  const dot = document.createElement("div");
  dot.classList.add("k-dot");
  if(i===0) dot.classList.add("active");

  dot.onclick = ()=>{
    kIndex = i;
    showKSlide();
    resetKAuto();
  };

  dotsContainer.appendChild(dot);
});

const kDots = document.querySelectorAll(".k-dot");

function showKSlide(){
  kSlides.forEach(s=>s.classList.remove("active"));
  kDots.forEach(d=>d.classList.remove("active"));

  kSlides[kIndex].classList.add("active");
  kDots[kIndex].classList.add("active");
}

function nextK(){
  kIndex = (kIndex + 1) % kSlides.length;
  showKSlide();
}

function startKAuto(){
  kInterval = setInterval(nextK,5000);
}

function resetKAuto(){
  clearInterval(kInterval);
  startKAuto();
}

/* buttons */
document.querySelector(".k-next").onclick = ()=>{
  nextK();
  resetKAuto();
};

document.querySelector(".k-prev").onclick = ()=>{
  kIndex = (kIndex - 1 + kSlides.length) % kSlides.length;
  showKSlide();
  resetKAuto();
};

/* hover pause */
const kSlider = document.getElementById("kSlider");
kSlider.onmouseenter = ()=> clearInterval(kInterval);
kSlider.onmouseleave = startKAuto;

startKAuto();


/* =========================
   HERO SLIDER
========================= */
const hSlides = document.querySelectorAll("#heroSlider .slide");
const heroDotsContainer = document.getElementById("heroDots");

let hIndex = 0;
let hInterval;

/* create dots */
hSlides.forEach((_,i)=>{
  const d = document.createElement("div");
  d.classList.add("dot");
  if(i===0) d.classList.add("active");

  d.onclick = ()=>{
    hIndex = i;
    showHero();
    resetHero();
  };

  heroDotsContainer.appendChild(d);
});

const heroDots = document.querySelectorAll("#heroDots .dot");

function showHero(){
  hSlides.forEach(s=>s.classList.remove("active"));
  heroDots.forEach(d=>d.classList.remove("active"));

  hSlides[hIndex].classList.add("active");
  heroDots[hIndex].classList.add("active");
}

function nextHero(){
  hIndex = (hIndex + 1) % hSlides.length;
  showHero();
}

function prevHero(){
  hIndex = (hIndex - 1 + hSlides.length) % hSlides.length;
  showHero();
}

function startHero(){
  hInterval = setInterval(nextHero,5000);
}

function resetHero(){
  clearInterval(hInterval);
  startHero();
}

/* buttons */
document.querySelector(".next").onclick = ()=>{ nextHero(); resetHero(); };
document.querySelector(".prev").onclick = ()=>{ prevHero(); resetHero(); };

/* hover pause */
const heroSlider = document.getElementById("heroSlider");
heroSlider.onmouseenter = ()=> clearInterval(hInterval);
heroSlider.onmouseleave = startHero;

/* swipe mobile */
let startX = 0;

heroSlider.addEventListener("touchstart",e=>{
  startX = e.touches[0].clientX;
});

heroSlider.addEventListener("touchend",e=>{
  let end = e.changedTouches[0].clientX;

  if(startX - end > 50) nextHero();
  if(end - startX > 50) prevHero();

  resetHero();
});

startHero();

});
</script>
<script>
let kSlides = document.querySelectorAll(".knowledge-slider img");
let kIndex = 0;

setInterval(()=>{
kSlides[kIndex].classList.remove("active");
kIndex = (kIndex + 1) % kSlides.length;
kSlides[kIndex].classList.add("active");
},6000);
</script>
<script>
document.addEventListener("DOMContentLoaded", function(){

let slides = document.querySelectorAll(".knowledge-slider.single img");
let index = 0;

setInterval(()=>{
    slides[index].classList.remove("active");

    index++;
    if(index >= slides.length){
        index = 0;
    }

    slides[index].classList.add("active");

},6000); // 6 วินาที

});
</script>

<script>
const slides = document.querySelectorAll(".slider-track img");
let currentIndex = 0;

// ฟังก์ชันแสดงภาพ
function showSlide(index){
slides.forEach(slide => slide.classList.remove("active"));
slides[index].classList.add("active");
}

// auto slide ทุก 5 วินาที
setInterval(() => {
currentIndex = (currentIndex + 1) % slides.length;
showSlide(currentIndex);
}, 5000);

// ปุ่ม next
document.querySelector(".next").addEventListener("click", () => {
currentIndex = (currentIndex + 1) % slides.length;
showSlide(currentIndex);
});

// ปุ่ม prev
document.querySelector(".prev").addEventListener("click", () => {
currentIndex = (currentIndex - 1 + slides.length) % slides.length;
showSlide(currentIndex);
});
</script>

document.addEventListener('DOMContentLoaded', () => {
  let slides = document.querySelectorAll('.news-slide');
  let currentIndex = 0;
  const intervalTime = 6000; // 6 วินาที

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if(i === index) slide.classList.add('active');
    });
  }

  // ปุ่มเลื่อน
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // สไลด์อัตโนมัติ
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, intervalTime);
});

document.addEventListener('DOMContentLoaded', () => {
  let slides = document.querySelectorAll('.news-slide');
  let currentIndex = 0;
  const intervalTime = 6000; // 6 วินาที

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if(i === index) slide.classList.add('active');
    });
  }

  // ปุ่มเลื่อน
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // สไลด์อัตโนมัติ
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, intervalTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.news-slide');
  let currentIndex = 0;
  const intervalTime = 6000; // 6 วินาที

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if(i === index) slide.classList.add('active');
    });
  }

  // ปุ่มเลื่อน
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // สไลด์อัตโนมัติ
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, intervalTime);
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.news-slide');
  let currentIndex = 0;
  const intervalTime = 6000; // 6 วินาที

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if(i === index) slide.classList.add('active');
    });
  }

  // ปุ่มเลื่อน
  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // สไลด์อัตโนมัติ
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, intervalTime);
});

<script>
let slides = document.querySelectorAll(".news-slide");
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
}

document.querySelector(".next").onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};

document.querySelector(".prev").onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};

/* Auto Slide */
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);
</script>

<script>
const slides = document.querySelectorAll(".slider img");
let index = 0;

function showSlide(i) {
  slides.forEach(img => img.classList.remove("active"));
  slides[i].classList.add("active");
}

/* เริ่มต้น */
showSlide(index);

/* สไลด์ทุก 5 วินาที */
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slider img");
  let index = 0;

  function showSlide(i) {
    slides.forEach(img => img.classList.remove("active"));
    slides[i].classList.add("active");
  }

  /* เริ่มต้น */
  showSlide(index);

  /* Auto Slide ทุก 5 วินาที */
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);

});
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  showSlide(index);

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 5000);

});
</script>