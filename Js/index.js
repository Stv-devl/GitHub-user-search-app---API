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

//async function for get the API. Search the input.value, if its match with a profile we create a Json file and launch profil display (with the data). If have no profil match we will get the error message.
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

//Function for display the profiles informations from API.
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

  // variables for blogAdress =>  we deletes the "https://"" from website, the blogChanger[2] format will be "www.monsite.com"
  let blogChanger = data.blog.split("/");
  let blogAdress = blogChanger[2];

  //if bio is empty get the empty message, else display the bio
  if (data.bio == null) {
    profileBio.textContent = "This profile has no bio";
  } else {
    profileBio.textContent = `${data.bio.substr(0, 80)}`;
  }

  //display profiles informations
  logoContainer.style.backgroundImage = `url(${data.avatar_url})`;
  profileName.textContent = `${data.name.substr(0, 15)}`;
  profileJoined.textContent = `Joined ${dateChanger[2]} ${months[trueMonth]} ${dateChanger[0]}`;
  profileLogin.textContent = `@${data.login}`;
  profileRepos.textContent = `${data.public_repos}`;
  profileFollowers.textContent = `${data.followers}`;
  profileFollowing.textContent = `${data.following}`;

  //if company is empty get the empty message and opacity 0.5, else display the company name
  if (data.company == null || data.company == "") {
    profileCompany.textContent = "Not Available";
    profileCompany.style.opacity = 0.5;
    iconcompany.style.opacity = 0.5;
  } else {
    profileCompany.style.opacity = 1;
    iconcompany.style.opacity = 1;
    profileCompany.textContent = data.company;
  }
  //if location is empty get the empty message and opacity 0.5, else display the city name
  if (data.location == "" || data.location == null) {
    profileLocation.textContent = "Not Available";
    profileLocation.style.opacity = 0.5;
    iconlocation.style.opacity = 0.5;
  } else {
    profileLocation.style.opacity = 1;
    iconlocation.style.opacity = 1;
    profileLocation.textContent = data.location;
  }
  //if blog is empty get the empty message and opacity 0.5, else display the blog adress
  if (data.blog == "" || data.blog == null) {
    profileBlog.textContent = "Not Available";
    profileBlog.style.opacity = 0.5;
    iconblog.style.opacity = 0.5;
  } else {
    profileBlog.style.opacity = 1;
    iconblog.style.opacity = 1;
    profileBlog.textContent = data.blog.substr(0, 20);

    //for fix link problem (some peoples have an "https://" some dont write it). If the blogAdress variable is undefined its mean the website adress have no "https://" so we will add it manually. Else, the website have an "https://" so we split and create an array at "/" and we had an "https://" again to the array.
    if (blogAdress === undefined) {
      profileBlog.href = `https://${data.blog}`;
    } else {
      profileBlog.href = `https://${blogChanger[2]}`;
    }
  }

  //if twitter is empty get the empty message and opacity 0.5, else display the twitter name
  if (data.twitter_username == null) {
    profileTwitter.textContent = "Not Available";
    profileTwitter.style.opacity = 0.5;
    icontwitter.style.opacity = 0.5;
  } else {
    profileTwitter.style.opacity = 1;
    icontwitter.style.opacity = 1;
    profileTwitter.textContent = data.twitter_username;
  }
  errorDisplay.textContent = "";
}
