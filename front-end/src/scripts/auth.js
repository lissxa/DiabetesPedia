const API_BASE_URL = "http://localhost:5000"; // [NANTI MAU DI UBAH JADI API DEPLOY]
function auth() {
  function showNotification(message, type = "info") {
    console.log(`[${type.toUpperCase()}] ${message}`);

    if (type === "success") {
      alert(message);
    } else if (type === "error") {
      alert(message);
    } else {
      alert(message);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();

    const email = document.getElementById("inputEmailSignUp").value;
    const password = document.getElementById("inputPasswordSignUp").value;
    const reEnterPassword = document.getElementById(
      "reEnterPasswordSignUp",
    ).value;
    const agreeToTerms = document.getElementById("checkTnC").checked;

    if (!email || !password || !reEnterPassword) {
      showNotification("Semua field harus diisi!", "error");
      return;
    }

    if (password !== reEnterPassword) {
      showNotification("Password tidak cocok!", "error");
      return;
    }

    if (password.length < 8 || password.length > 20) {
      showNotification("Password harus 8-20 karakter!", "error");
      return;
    }

    if (!agreeToTerms) {
      showNotification("Anda harus menyetujui Terms of Service!", "error");
      return;
    }

    try {
      console.log(
        "Mengirim request register ke:",
        `${API_BASE_URL}/users/register`,
      );
      console.log("Data yang dikirim:", {
        name: email.split("@")[0],
        email: email,
        password: password,
      });

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: email.split("@")[0],
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok && result.status === "success") {
        showNotification("Registrasi berhasil! Silakan login.", "success");

        document.getElementById("inputEmailSignUp").value = "";
        document.getElementById("inputPasswordSignUp").value = "";
        document.getElementById("reEnterPasswordSignUp").value = "";
        document.getElementById("checkTnC").checked = false;

        const signUpModal = bootstrap.Modal.getInstance(
          document.getElementById("signUpModal"),
        );
        const signInModal = new bootstrap.Modal(
          document.getElementById("signInModal"),
        );
        signUpModal.hide();
        setTimeout(() => signInModal.show(), 300);
      } else {
        showNotification(result.message || "Registrasi gagal!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Terjadi kesalahan koneksi!", "error");
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("inputEmailSignIn").value;
    const password = document.getElementById("inputPasswordSignIn").value;

    if (!email || !password) {
      showNotification("Email dan password harus diisi!", "error");
      return;
    }

    try {
      console.log("Mengirim request login ke:", `${API_BASE_URL}/users/login`);
      console.log("Data yang dikirim:", {
        email: email,
        password: password,
      });

      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok && result.status === "success") {
        showNotification("Login berhasil!", "success");

        localStorage.setItem("currentUser", JSON.stringify(result.data));

        document.getElementById("inputEmailSignIn").value = "";
        document.getElementById("inputPasswordSignIn").value = "";

        const signInModal = bootstrap.Modal.getInstance(
          document.getElementById("signInModal"),
        );
        signInModal.hide();

        setTimeout(() => {
          window.location.href = "./dashboard.html";
        }, 500);
      } else {
        showNotification(result.message || "Login gagal!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Terjadi kesalahan koneksi!", "error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    showNotification("Logout berhasil!", "success");
  }

  function getCurrentUser() {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
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
      console.log("User sudah login:", currentUser);
    }
  });
}

//export default { handleSignUp, handleSignIn, handleLogout, getCurrentUser };
export default auth;
