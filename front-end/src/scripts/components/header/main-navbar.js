class MainNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container-fluid padding-common">
        <a class="navbar-brand" href="#">
          <img
            src="./src/public/images/logo/small logo.png"
            width="180"
            alt=""
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="blog.html">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about-us.html">About Us</a>
            </li>
          </ul>
          <div class="d-flex gap-2">
            <button
              class="btn text-primary fw-semibold text-decoration-underline"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#signInModal"
            >
              Sign In
            </button>
            <button
              class="btn btn-primary fw-semibold"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("main-navbar", MainNavbar);
