class SignInForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
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
                      <input
                        type="password"
                        class="form-control"
                        id="inputPasswordSignIn"
                        placeholder="Enter your password"
                        required
                      />
                      <div class="form-check mt-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="showHidePassword"
                        />
                        <label
                          class="form-check-label"
                          for="showHidePassword"
                        >
                          Show Password
                        </label>
                      </div>
                      <a
                        type="button"
                        class="btn text-primary fw-semibold btn-sm text-decoration-underline p-0 text-center w-100 mt-2"
                        >Forget Password?</a
                      >
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
                      <p
                        class="caption d-flex justify-content-center align-items-baseline column-gap-1 flex-wrap"
                      >
                        By login, I agree to GlucoTrack's
                        <a
                          type="button"
                          class="btn btn-sm p-0 text-primary fw-semibold caption text-decoration-underline"
                          >Terms of Service</a
                        >
                        and
                        <a
                          type="button"
                          class="btn btn-sm p-0 text-primary fw-semibold caption text-decoration-underline"
                          >Privacy Policy</a
                        >
                      </p>
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
}

customElements.define("signin-form", SignInForm);
