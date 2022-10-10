const switchs = document.querySelector(".switch-flexbox");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const body = document.querySelector("body");
const themeIcon = document.querySelector(".theme-icon");

//start with prefer theme of user, if no prefer theme start with light.
function starterTheme() {
  const preferLight = window.matchMedia("(prefers-color-scheme: light)");
  const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
  const noPreference = window.matchMedia(
    "(prefers-color-scheme: no-preference)"
  );
  /*
  console.log(preferLight.matches);
  console.log(preferDark.matches);
  console.log(noPreference.matches);*/

  if (preferLight.matches == true) {
    body.classList.add("light");
  } else if (preferDark.matches == true) {
    body.classList.add("dark");
  } else {
    body.classList.add("light");
  }
}
starterTheme();

//toogle light and dark & icon
switchs.addEventListener("click", () => {
  if (body.classList == "dark") {
    body.classList.remove("dark");
    body.classList.add("light");
    themeIcon.classList.remove("darkclicked");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeIcon.classList.add("darkclicked");
  }
});
