//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");

//Variable for get user informations display
const logoContainer = document.querySelector(".logo-container");
const profileName = document.querySelector(".profile-name");
const profileJoined = document.querySelector(".profile-joined");
const profileLogin = document.querySelector(".profile-login");
const profileBio = document.querySelector(".profile-bio");
const profileRepos = document.querySelector(".profile-repos");
const profileFollowers = document.querySelector(".profile-followers");
const profileFollowing = document.querySelector(".profile-following");
const profileCity = document.querySelector(".profile-city");
const profileTwitter = document.querySelector(".profile-twitter");
const profileWebsite = document.querySelector(".profile-website");
const profileGithub = document.querySelector(".profile-github");
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aou",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
});

//function getApi=> get api with fetch and display
function getApi() {
  fetch("https://api.github.com/users/octocat", { cache: "no-cache" })
    .then((responce) => responce.json())
    .then((responce) => {
      const data = responce;
      /*console.log(data);*/

      //variables for set joined date
      let dateChanger = data.created_at.split("T").shift().split("-");
      let trueMonth = dateChanger[1] - 1;

      //display profiles informations
      logoContainer.style.backgroundImage =
        "url(https://avatars.githubusercontent.com/u/583231?v=4)";
      profileName.textContent = data.name;
      profileJoined.textContent = `Joined ${dateChanger[2]} ${months[trueMonth]} ${dateChanger[0]}`;
      profileLogin.textContent = `@ ${data.login}`;
      profileBio.textContent = data.bio;
      profileRepos.textContent = data.public_repos;
      profileFollowers.textContent = data.followers;
      profileFollowing.textContent = data.following;
      profileCity.textContent = data.location;
      profileTwitter.textContent = data.twitter_username;
      profileWebsite.textContent = data.blog;
      profileGithub.textContent = data.company;
    });
}
