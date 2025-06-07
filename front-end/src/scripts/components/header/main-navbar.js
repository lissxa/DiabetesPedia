class MainNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("authChange", () => this.render());
  }

  getCurrentUser() {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  }

  async handleLogout() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("authChange"));

      await Swal.fire(
        "Logged Out",
        "You have successfully logged out.",
        "success"
      );

      window.location.href = "/";
    }
  }

  render() {
    const currentUser = this.getCurrentUser();
    const currentPath = window.location.pathname;
    const isActive = (path) => {
      if (path === "/home") {
        return currentPath === "/" || currentPath === "/home"
          ? "active fw-bold text-primary"
          : "";
      }
      return currentPath === path ? "active fw-bold text-primary" : "";
    };

    const template = document.createElement("template");

    if (currentUser) {
      template.innerHTML = `
        <div class="container-fluid padding-common">
          <a class="navbar-brand" href="/">
            <img src="./src/public/images/logo/logo_landscape_text.png" width="180" alt="Logo" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNavbar" aria-controls="mainNavbar"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link ${isActive("/home")}" href="/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive("/blog")}" href="/blog">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive(
                  "/about-us"
                )}" href="/about-us">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive(
                  "/dashboard"
                )}" href="/dashboard">Dashboard</a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button class="btn btn-light border border-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="src/public/images/dashboard/profile.png" alt="User Profile" width="24" height="24" />
                </button>
                <ul class="dropdown-menu ">
                  <li><a class="dropdown-item" href="/settings" style="font-weight: bold;">Settings</a></li>
                  <li><a class="dropdown-item" href="#" id="logoutButton" style="color: red; font-weight: bold;">Sign Out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      `;
    } else {
      template.innerHTML = `
        <div class="container-fluid padding-common">
          <a class="navbar-brand" href="/">
            <img src="./src/public/images/logo/logo_landscape_text.png" width="180" alt="Logo" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#mainNavbar" aria-controls="mainNavbar"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link ${isActive("/home")}" href="/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive("/blog")}" href="/blog">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${isActive(
                  "/about-us"
                )}" href="/about-us">About Us</a>
              </li>
            </ul>
            <div class="d-flex gap-2">
              <button class="btn text-primary fw-semibold text-decoration-underline"
                type="button" data-bs-toggle="modal" data-bs-target="#signInModal">
                Sign In
              </button>
              <button class="btn btn-primary fw-semibold"
                type="button" data-bs-toggle="modal" data-bs-target="#signUpModal">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      `;
    }

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));

    const logoutButton = this.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }
  }
}

customElements.define("main-navbar", MainNavbar);
