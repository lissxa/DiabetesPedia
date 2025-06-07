class SignInForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupPasswordToggle();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
      <style>
        .password-container {
          position: relative;
        }
        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          padding: 0 5px;
        }
        .password-toggle:hover {
          color: #495057;
        }
        #inputPasswordSignIn {
          padding-right: 40px; 
        }
      </style>
      
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
                  <form action="" class="modal-form">
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
}

customElements.define("signin-form", SignInForm);
