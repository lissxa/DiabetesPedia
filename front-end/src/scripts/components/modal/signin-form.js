class SignInForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupPasswordToggle();
    this.setupFormSubmit();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `     

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"
    />
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header p-4 bg-lightblue02">
            <h5 class="modal-title fs-5" id="signInModalLabel">Sign In</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="container">
              <div class="row row-gap-4 justify-content-between">
                <div class="col-sm-12 col-md-12 col-lg-5 p-0 pe-4">
                  <div
                    class="modal-desc card bg-lightblue02 rounded-3 p-4 h-100 d-flex flex-column justify-content-center border-0 gap-3"
                  >
                    <h2 class="fw-bold text-primary">Welcome Back!</h2>
                    <p>
                      Log in to track your diabetes risk and health records
                    </p>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-7 p-0">
                  <form id="signInForm" class="modal-form">
                    <div class="mb-3">
                      <label
                        for="inputEmailSignIn"
                        class="form-label"
                        required
                        >Email</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmailSignIn"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="inputPasswordSignIn"
                        class="form-label"
                        required
                        >Password</label
                      >
                      <div class="password-container">
                        <input
                          type="password"
                          class="form-control"
                          id="inputPasswordSignIn"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          class="password-toggle"
                          id="togglePassword"
                        >
                          <i class="bi bi-eye-slash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="mb-3">
                      <button
                        id="signInButton"
                        class="btn btn-primary fw-semibold btn-lg w-100"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                    
                    <div class="mb-3">
                      <div class="horizontal-divider bg-body-secondary"></div>
                    </div>
                    <div>
                      <p
                        class="caption d-flex justify-content-center align-items-baseline column-gap-2 flex-wrap"
                      >
                        Don't have account?
                        <a
                          type="button"
                          class="btn btn-sm p-0 text-primary fw-semibold caption text-decoration-underline"
                          data-bs-toggle="modal"
                          data-bs-target="#signUpModal"
                          >Sign Up</a
                        >
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }

  setupPasswordToggle() {
    requestAnimationFrame(() => {
      const passwordInput = this.querySelector("#inputPasswordSignIn");
      const toggleButton = this.querySelector("#togglePassword");
      const toggleIcon = toggleButton.querySelector("i");

      if (passwordInput && toggleButton) {
        toggleButton.addEventListener("click", () => {
          const isPassword = passwordInput.type === "password";
          passwordInput.type = isPassword ? "text" : "password";

          toggleIcon.classList.toggle("bi-eye", isPassword);
          toggleIcon.classList.toggle("bi-eye-slash", !isPassword);
        });
      }
    });
  }

  setupFormSubmit() {
    const form = this.querySelector("#signInForm");
    const button = this.querySelector("#signInButton");

    if (form && button) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.showLoading(true);

        setTimeout(() => {
          this.showLoading(false);
        }, 2000);
      });
    }
  }

  showLoading(show) {
    const button = this.querySelector("#signInButton");
    if (button) {
      if (show) {
        button.disabled = true;
        button.classList.add("btn-loading-state");
        button.innerHTML =
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing In...';
      } else {
        button.disabled = false;
        button.classList.remove("btn-loading-state");
        button.textContent = "Sign In";
      }
    }
  }
}

customElements.define("signin-form", SignInForm);
