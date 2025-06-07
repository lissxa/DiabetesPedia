class SignUpForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupPasswordToggles();
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

        #inputPasswordSignUp,
        #reEnterPasswordSignUp {
          padding-right: 40px;
        }

        .form-check-label {
          margin-left: 0.25rem;
        }
      </style>

      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header p-4 bg-lightblue02">
            <h5 class="modal-title fs-5" id="signInModalLabel">Sign Up</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="container">
              <div class="row row-gap-4 justify-content-between">
                <div class="col-lg-5 p-0 pe-4">
                  <div class="modal-desc card bg-lightblue02 rounded-3 p-4 h-100 d-flex flex-column justify-content-center border-0 gap-3">
                    <h2 class="fw-bold text-primary">Sign Up for Diabetes Risk Assessment</h2>
                    <p>Monitor and predict your risk -- get started now</p>
                  </div>
                </div>
                <div class="col-lg-7 p-0">
                  <form id="signUpForm" class="modal-form">
                    <div class="mb-3">
                      <label for="inputNameSignUp" class="form-label">Name</label>
                      <input type="text" class="form-control" id="inputNameSignUp" placeholder="Enter your full name" required />
                    </div>
                    <div class="mb-3">
                      <label for="inputEmailSignUp" class="form-label">Email</label>
                      <input type="email" class="form-control" id="inputEmailSignUp" placeholder="Enter your email" required />
                    </div>

                    <div class="mb-3 position-relative">
                      <label for="inputPasswordSignUp" class="form-label">Password</label>
                      <div class="password-container">
                        <input type="password" class="form-control" id="inputPasswordSignUp" placeholder="Enter your password" required />
                        <button type="button" class="password-toggle" id="togglePassword1">
                          <i class="bi bi-eye-slash"></i>
                        </button>
                      </div>
                      <div class="form-text">Must be 8–20 characters long.</div>
                    </div>

                    <div class="mb-3 position-relative">
                      <label for="reEnterPasswordSignUp" class="form-label">Re-enter password</label>
                      <div class="password-container">
                        <input type="password" class="form-control" id="reEnterPasswordSignUp" placeholder="Re-enter your password" required />
                        <button type="button" class="password-toggle" id="togglePassword2">
                          <i class="bi bi-eye-slash"></i>
                        </button>
                      </div>
                    </div>

                    <div class="mb-3 form-check">
                      <input class="form-check-input" type="checkbox" id="checkTnC" required />
                      <label class="form-check-label" for="checkTnC">
                        I agree to
                        <a class="text-primary fw-semibold text-decoration-underline" href="#">Terms of Service</a>
                        and
                        <a class="text-primary fw-semibold text-decoration-underline" href="#">Privacy Policy</a>
                      </label>
                    </div>

                    <div class="mb-3">
                      <button class="btn btn-primary fw-semibold btn-lg w-100" type="submit">Sign Up</button>
                    </div>

                    <div class="text-center">
                      <p class="caption">
                        Already have an account?
                        <a type="button" class="btn btn-sm p-0 text-primary fw-semibold caption text-decoration-underline" data-bs-toggle="modal" data-bs-target="#signInModal">Sign In</a>
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

  setupPasswordToggles() {
    requestAnimationFrame(() => {
      const toggle = (inputId, toggleBtnId) => {
        const input = this.querySelector(inputId);
        const btn = this.querySelector(toggleBtnId);
        const icon = btn?.querySelector("i");

        if (input && btn && icon) {
          btn.addEventListener("click", () => {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            icon.classList.toggle("bi-eye", isPassword);
            icon.classList.toggle("bi-eye-slash", !isPassword);
          });
        }
      };

      toggle("#inputPasswordSignUp", "#togglePassword1");
      toggle("#reEnterPasswordSignUp", "#togglePassword2");
    });
  }
}

customElements.define("signup-form", SignUpForm);
