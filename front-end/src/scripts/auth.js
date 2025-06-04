const API_BASE_URL = "http://localhost:5000"; // [NANTI MAU DI UBAH JADI API DEPLOY]

function auth() {
  function showNotification(message, type = "info") {
    console.log(`[${type.toUpperCase()}] ${message}`);

    Swal.fire({
      icon: type,
      title: `<div style="font-size: 1.2rem">${message}</div>`,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  async function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById("inputNameSignUp").value;
    const email = document.getElementById("inputEmailSignUp").value;
    const password = document.getElementById("inputPasswordSignUp").value;
    const reEnterPassword = document.getElementById(
      "reEnterPasswordSignUp"
    ).value;
    const agreeToTerms = document.getElementById("checkTnC").checked;

    if (!email || !password || !reEnterPassword) {
      showNotification("All fields must be filled!", "error");
      return;
    }

    if (password !== reEnterPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      showNotification("Password must be 8-20 characters!", "error");
      return;
    }

    if (!agreeToTerms) {
      showNotification("You must agree to the Terms of Service!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        showNotification("Registration successful! Please login.", "success");

        document.getElementById("inputEmailSignUp").value = "";
        document.getElementById("inputPasswordSignUp").value = "";
        document.getElementById("reEnterPasswordSignUp").value = "";
        document.getElementById("checkTnC").checked = false;

        const signUpModal = bootstrap.Modal.getInstance(
          document.getElementById("signUpModal")
        );
        const signInModal = new bootstrap.Modal(
          document.getElementById("signInModal")
        );
        signUpModal.hide();
        setTimeout(() => signInModal.show(), 300);
      } else {
        showNotification(result.message || "Registration failed!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("A connection error occurred!", "error");
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("inputEmailSignIn").value;
    const password = document.getElementById("inputPasswordSignIn").value;

    if (!email || !password) {
      showNotification("Email and password must be filled in!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        showNotification("Login successful!", "success");

        localStorage.setItem("currentUser", JSON.stringify(result.data));

        document.getElementById("inputEmailSignIn").value = "";
        document.getElementById("inputPasswordSignIn").value = "";

        const signInModal = bootstrap.Modal.getInstance(
          document.getElementById("signInModal")
        );
        signInModal.hide();

        window.dispatchEvent(new Event("authChange"));

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      } else {
        showNotification(result.message || "Login failed!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("A connection error occurred!", "error");
    }
  }
  function handleLogout() {
    localStorage.removeItem("currentUser");
    showNotification("Logout successful!", "success");
  }

  function getCurrentUser() {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const signInForm = document.querySelector("#signInModal .modal-form");
    if (signInForm) {
      signInForm.addEventListener("submit", handleSignIn);
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("User has logged in:", currentUser);
    }
  });
}

export default auth;
