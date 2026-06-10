
// ================================
const homePage = document.getElementById("page-home");
const loginPage = document.getElementById("page-login");
const registerPage = document.getElementById("page-register");

const navLoginBtn = document.getElementById("nav-login-btn");


function showPage(pageName) {

  homePage.classList.add("hidden");
  loginPage.classList.add("hidden");
  registerPage.classList.add("hidden");

  if (pageName === "home") {
    homePage.classList.remove("hidden");
    navLoginBtn.classList.remove("hidden");
  }

  if (pageName === "login") {
    loginPage.classList.remove("hidden");
    navLoginBtn.classList.add("hidden");
  }

  if (pageName === "register") {
    registerPage.classList.remove("hidden");
    navLoginBtn.classList.add("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}


let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    fullname: "Moussa Diop",
    email: "moussa@ucad.edu.sn",
    password: "1234",
    universite: "UCAD"
  }
];


const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function () {

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("pass-login").value.trim();

  const userFound = users.find(user =>
    user.email === email && user.password === password
  );

  if (userFound) {
    alert("Connexion réussie 👌 Bienvenue " + userFound.fullname);

    localStorage.setItem("currentUser", JSON.stringify(userFound));

    showPage("home");
  } else {
    alert("Email ou mot de passe incorrect ❌");
  }
});

const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", function () {

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email-reg").value.trim();
  const universite = document.getElementById("universite").value;
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("pass-reg").value.trim();

  // validation
  if (!fullname || !email || !password || !universite || !phone) {
    alert("❌ Tous les champs sont obligatoires !");
    return;
  }

  // vérif email existant
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    alert("❌ Cet email est déjà utilisé !");
    return;
  }

  // création user
  const newUser = {
    id: Date.now(),
    fullname,
    email,
    password,
    universite,
    phone
  };

  users.push(newUser);


  localStorage.setItem("users", JSON.stringify(users));

  alert("🎉 Compte créé avec succès !");

  // reset form
  document.getElementById("fullname").value = "";
  document.getElementById("email-reg").value = "";
  document.getElementById("universite").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("pass-reg").value = "";

  showPage("login");
});