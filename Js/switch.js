const switchs = document.querySelector(".switch-flexbox");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const body = document.querySelector("body");
const themeIcon = document.querySelector(".theme-icon");

//toggle between light and dark theme, add darkclicked for add the sun icone

switchs.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeIcon.classList.toggle("darkclicked");
});

/*
const preferLight = window.matchMedia("(prefers-color-scheme: light)");
const preferDark = window.matchMedia("(prefers-color-scheme: Dark)");

console.log(preferLight.matches);
console.log(preferDark.matches);

switchs.addEventListener("click", () => {
  if ((preferLight == true) & (preferDark == false)) {
    body.classList.add("dark");
    body.classList.remove("light");
    themeIcon.classList.add("darkclicked");
  } else {
    body.classList.add("light");
    body.classList.remove("dark");
  }
});
*/
