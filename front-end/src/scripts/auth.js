const API_BASE_URL = "https://diabetes-pedia-be.onrender.com";

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
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById("inputNameSignUp").value.trim();
    const email = document.getElementById("inputEmailSignUp").value.trim();
    const password = document.getElementById("inputPasswordSignUp").value;
    const reEnterPassword = document.getElementById(
      "reEnterPasswordSignUp"
    ).value;
    const agreeToTerms = document.getElementById("checkTnC").checked;

    if (!name) {
      showNotification("Name is required!", "error");
      return;
    }

    if (!email || !password || !reEnterPassword) {
      showNotification("All fields must be filled!", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address!", "error");
      return;
    }

    if (password !== reEnterPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters!", "error");
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
        },
        body: JSON.stringify({
          name,
          email,
          password,
          reEnterPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showNotification(result.message || "Registration failed!", "error");
        return;
      }

      showNotification("Registration successful! Please login.", "success");

      document.getElementById("signUpForm").reset();

      const signUpModal = bootstrap.Modal.getInstance(
        document.getElementById("signUpModal")
      );
      const signInModal = new bootstrap.Modal(
        document.getElementById("signInModal")
      );
      signUpModal.hide();
      setTimeout(() => signInModal.show(), 300);
    } catch (error) {
      console.error("Error:", error);
      showNotification("A connection error occurred!", "error");
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("inputEmailSignIn").value.trim();
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
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        showNotification(result.message || "Login failed!", "error");
        return;
      }

      showNotification("Login successful!", "success");
      localStorage.setItem("currentUser", JSON.stringify(result.data));

      event.target.reset();

      const signInModal = bootstrap.Modal.getInstance(
        document.getElementById("signInModal")
      );
      signInModal.hide();

      window.dispatchEvent(new Event("authChange"));
      setTimeout(() => (window.location.href = "/dashboard"), 500);
    } catch (error) {
      console.error("Error:", error);
      showNotification("A connection error occurred!", "error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    showNotification("Logout successful!", "success");
    window.dispatchEvent(new Event("authChange"));
  }

  function getCurrentUser() {
    try {
      const userData = localStorage.getItem("currentUser");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector("#signUpModal .modal-form");
    if (signUpForm) {
      signUpForm.addEventListener("submit", handleSignUp);
    }

    const signInForm = document.querySelector("#signInModal .modal-form");
    if (signInForm) {
      signInForm.addEventListener("submit", handleSignIn);
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log("User is logged in:", currentUser.email);
    }
  });

  // Public API
  return {
    getCurrentUser,
    handleLogout,
  };
}

export default auth;
