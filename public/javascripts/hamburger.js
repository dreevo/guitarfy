const hamburgerLines = document.querySelectorAll(".menu line");
const navOpen = document.querySelector(".nav-open");
const contact = document.querySelector(".contact");
const social = document.querySelector(".social");
const logo = document.querySelector(".header-title");
const guitar = document.querySelector(".menu");

const tl1 = new TimelineMax({ paused: true, reversed: true });

tl1
  .to(navOpen, 0.5, { y: 0 })
  .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
  .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
  .fromTo(logo, 0.2, { color: "#bfc3c4" }, { color: "black" }, "-=1")
  .fromTo(hamburgerLines, 0.2, { stroke: "white" }, { stroke: "black" }, "-=1");

guitar.addEventListener("click", () => {
  tl1.reversed() ? tl1.play() : tl1.reverse();
});
