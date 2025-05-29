class SignUpForm extends HTMLElement {
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
            <h5 class="modal-title fs-5" id="signInModalLabel">Sign Up</h5>
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
                    <h2 class="fw-bold text-primary">
                      Sign Up for Diabetes Risk Assessment
                    </h2>
                    <p>Monitor and predict your risk -- get started now</p>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-7 p-0">
                  <form action="" class="modal-form" id="signUpForm">
                    <div class="mb-3">
                      <label
                        for="inputEmailSignUp"
                        class="form-label"
                        required
                        >Email</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmailSignUp"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label
                        for="inputPasswordSignUp"
                        class="form-label"
                        required
                        >Password</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="inputPasswordSignUp"
                        placeholder="Enter your password"
                        aria-describedby="passwordHelpInline"
                        required
                      />
                      <span id="passwordHelpInline" class="form-text">
                        Must be 8-20 characters long.
                      </span>
                      <div class="form-check">
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
                    </div>
                    <div class="mb-3">
                      <label
                        for="reEnterPasswordSignUp"
                        class="form-label"
                        required
                        >Re-enter password</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        id="reEnterPasswordSignUp"
                        placeholder="Re-enter your password"
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
                    </div>
                    <div class="mb-3 form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkTnC"
                        required
                      />
                      <label class="form-check-label" for="checkTnC">
                        <p
                          class="caption d-flex justify-content-center align-items-baseline column-gap-1 flex-wrap"
                        >
                          I agree to
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
                      </label>
                    </div>
                    <div class="mb-3">
                      <button
                        class="btn btn-primary fw-semibold btn-lg w-100"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div>
                      <p
                        class="caption d-flex justify-content-center align-items-baseline column-gap-2 flex-wrap"
                      >
                        Already have account?
                        <a
                          type="button"
                          class="btn btn-sm p-0 text-primary fw-semibold caption text-decoration-underline"
                          data-bs-toggle="modal"
                          data-bs-target="#signInModal"
                          >Sign In</a
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

customElements.define("signup-form", SignUpForm);
