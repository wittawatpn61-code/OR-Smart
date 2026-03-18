
// Mobile menu toggle

const menuIcon = document.querySelector(".mobile-menu");
const navMenu = document.querySelector(".navbar ul");

menuIcon.addEventListener("click", () => {

if(navMenu.style.display === "flex"){

navMenu.style.display = "none";

}else{

navMenu.style.display = "flex";
navMenu.style.flexDirection = "column";

}

});
// HERO SLIDER

let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide(){

slides[index].classList.remove("active");

index++;

if(index >= slides.length){
index = 0;
}

slides[index].classList.add("active");

}

setInterval(changeSlide,5000);