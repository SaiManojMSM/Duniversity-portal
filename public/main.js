/*──────────────────────────────────────────────
  HAMBURGER TOGGLE – works on every page
──────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu  = document.getElementById("nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});

/*──────────────────────────────────────────────
  BACKGROUND ZOOM FOLLOW
──────────────────────────────────────────────*/
document.addEventListener("mousemove", (e) => {
  const bg = document.querySelector(".background");
  if (bg) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.backgroundPosition = `${x}% ${y}%`;
  }
});

/*──────────────────────────────────────────────
  PASSWORD VISIBILITY
──────────────────────────────────────────────*/
function togglePassword(id) {
  const inp = document.getElementById(id);
  if (inp) inp.type = inp.type === "password" ? "text" : "password";
}

/*──────────────────────────────────────────────
  SMALL POP‑UP MESSAGE (NO OK BUTTON)
──────────────────────────────────────────────*/
function showSuccessMessage(msg, ok = true) {
  let box = document.getElementById("login-success-popup");
  if (!box) return;                     // if popup element missing, fail silently
  box.textContent = msg;
  box.style.backgroundColor = ok ? "#4CAF50" : "#f44336";
  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), 2000);
}

/*──────────────────────────────────────────────
  MODAL HELPERS
──────────────────────────────────────────────*/
function openModal(id)  { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) e.target.style.display = "none";
});

/*──────────────────────────────────────────────
  LOGIN VALIDATION
──────────────────────────────────────────────*/
function validateStudentLogin() {
  const user = document.getElementById("student-username")?.value.trim();
  const pass = document.getElementById("student-password")?.value;

  if (user === "1dt20ai016@dsatm.edu.in" && pass === "dsatm#12345") {
    closeModal("studentModal");
    showSuccessMessage("Deeksha R successfully logged in");
    setTimeout(() => (window.location.href = "home.html"), 700);
  } else {
    showSuccessMessage("❌ Invalid Student Username or Password.", false);
  }
  return false; // always prevent default form submit
}

function validateAdminLogin() {
  const user = document.getElementById("admin-username")?.value.trim();
  const pass = document.getElementById("admin-password")?.value;

  if (user === "deekshareddy1001@gmail.com" && pass === "Deeksha@123") {
    closeModal("adminModal");
    showSuccessMessage("Admin successfully logged in");
    setTimeout(() => (window.location.href = "home1.html"), 700);
  } else {
    showSuccessMessage("❌ Invalid Admin Username or Password.", false);
  }
  return false;
}
