//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const errorDisplay = document.querySelector(".error");

//submit event, if nothing is write in the input => error display, else launch getApy function (with the input value)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    errorDisplay.textContent = "Please write something";
    return;
  } else {
    getApi(input.value);
  }
});

//async function for get the API. Search the input.value, if its match we create a Json file and launch profil display (with the data). If have no profil match with the input.value we get the error message.

async function getApi() {
  try {
    const response = await fetch(`https://api.github.com/users/${input.value}`);

    if (!response.ok) {
      throw new Error(
        `${(errorDisplay.textContent = "Nobody with this name")}`
      );
    }
    const data = await response.json();

    console.log(data);

    profilDisplay(data);
  } catch (error) {
    return;
  }
}

//Function for display the profile informations fro API.
function profilDisplay(data) {
  //Variable for display user information
  const logoContainer = document.querySelector(".logo-container");
  const profileName = document.querySelector(".profile-name");
  const profileJoined = document.querySelector(".profile-joined");
  const profileLogin = document.querySelector(".profile-login");
  const profileBio = document.querySelector(".profile-bio");
  const profileRepos = document.querySelector(".profile-repos");
  const profileFollowers = document.querySelector(".profile-followers");
  const profileFollowing = document.querySelector(".profile-following");
  const profileLocation = document.querySelector(".profile-location");
  const profileTwitter = document.querySelector(".profile-twitter");
  const profileBlog = document.querySelector(".profile-blog");
  const profileCompany = document.querySelector(".profile-company");
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
  //variables for set joined date
  let dateChanger = data.created_at.split("T").shift().split("-");
  let trueMonth = dateChanger[1] - 1;

  //if bio is empty get the empty message, else display the bio
  if (data.bio == null) {
    profileBio.textContent = "This profile has no bio"; // c'est le texte content qui marche pas
  } else {
    profileBio.textContent = `${data.bio}`;
  }

  //display profiles informations
  logoContainer.style.backgroundImage = `url(${data.avatar_url})`;
  profileName.textContent = `${data.name}`;
  profileJoined.textContent = `Joined ${dateChanger[2]} ${months[trueMonth]} ${dateChanger[0]}`;
  profileLogin.textContent = `@${data.login}`;
  profileRepos.textContent = `${data.public_repos}`;
  profileFollowers.textContent = `${data.followers}`;
  profileFollowing.textContent = `${data.following}`;

  //if company is empty get the empty message and opacity 0.5, else display the company name
  if (data.company == null) {
    profileCompany.textContent = "Not Available";
    profileCompany.style.opacity = 0.5;
    iconcompany.style.opacity = 0.5;
  } else {
    profileBlog.textContent = data.company;
  }
  //if location is empty get the empty message and opacity 0.5, else display the city name
  if (data.location == null) {
    profileLocation.textContent = "Not Available";
    profileLocation.style.opacity = 0.5;
    iconlocation.style.opacity = 0.5;
  } else {
    profileBlog.textContent = data.location;
  }
  //if blog is empty get the empty message and opacity 0.5, else display the blog adress
  if (data.blog === "") {
    profileBlog.textContent = "Not Available";
    profileBlog.style.opacity = 0.5;
    iconblog.style.opacity = 0.5;
  } else {
    profileBlog.textContent = data.blog;
  }
  //if twitter is empty get the empty message and opacity 0.5, else display the twitter name
  if (data.twitter == null) {
    profileTwitter.textContent = "Not Available";
    profileTwitter.style.opacity = 0.5;
    icontwitter.style.opacity = 0.5;
  } else {
    profileTwitter.textContent = data.twitter_username;
  }
  errorDisplay.textContent = "";
}
