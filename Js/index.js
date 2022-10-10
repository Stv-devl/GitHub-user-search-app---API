//Variables
const input = document.querySelector("input");
const form = document.querySelector("form");
const errorDisplay = document.querySelector(".error");

//submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    errorDisplay.textContent = "Please write something";
    return;
  } else {
    getApi(input.value);
  }
});

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

//function getApi=> get api with fetch and display user information
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

  //function for set empty data
  function setNull(set1, set2) {
    if (set1 === null || set1 === "") {
      set2.style.opacity = 0.5;
      set2.previousSibling.style.opacity = 0.5;
      set2.textContent = "Not Available";
      return;
    } else {
      return set1;
    }
  }

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

  profileCompany.textContent = setNull(data.company, profileCompany); //ok
  profileBlog.textContent = setNull(data.blog, profileBlog);
  profileLocation.textContent = setNull(data.location, profileLocation); //ok
  profileTwitter.textContent = setNull(data.twitter_username, profileTwitter); //ok???

  errorDisplay.textContent = "";
}
