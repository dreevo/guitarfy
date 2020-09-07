const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const guitar = document.querySelector(".menu");
const headline = document.querySelector(".headline");

const tl = new TimelineMax();
tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "100%" },
    { width: "80%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(guitar, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");

const hamburgerLines = document.querySelectorAll(".menu line");
const navOpen = document.querySelector(".nav-open");
const contact = document.querySelector(".contact");
const social = document.querySelector(".social");

const tl1 = new TimelineMax({ paused: true, reversed: true });

tl1
  .to(navOpen, 0.5, { y: 0 })
  .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
  .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
  .fromTo(logo, 0.2, { color: "#bfc3c4" }, { color: "black" }, "-=1")
  .fromTo(
    hamburgerLines,
    0.2,
    { stroke: "#bfc3c4" },
    { stroke: "black" },
    "-=1"
  );

guitar.addEventListener("click", () => {
  tl1.reversed() ? tl1.play() : tl1.reverse();
});

headline.addEventListener("click", () => {
  tl.reversed() ? tl.play() : tl.reverse();
});
