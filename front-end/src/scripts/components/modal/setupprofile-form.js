class SetUpProfile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=man,woman"
      />      
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header p-4 bg-lightblue02">
            <h5 class="modal-title fs-5" id="setUpProfileLabel">
              Set Up Your Profile
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="container p-0">
              <form action="" class="modal-form">
                <div class="mb-3">
                  <label for="inputName" class="form-label" required
                    >Please enter your name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="inputName"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="" class="form-label"
                    >Please enter your gender</label
                  >
                  <div class="d-flex gap-1">
                    <div class="flex-1">
                      <input
                        type="radio"
                        class="btn-check select-gender"
                        id="gender-male"
                        name="selectGender"
                        required
                      />
                      <label
                        for="gender-male"
                        class="btn btn-outline-primary text-black d-flex justify-content-center align-items-center w-100"
                      >
                        <span class="material-symbols-rounded">man</span>
                        Male
                      </label>
                    </div>
                    <div class="flex-1">
                      <input
                        type="radio"
                        class="btn-check select-gender"
                        id="gender-female"
                        name="selectGender"
                        required
                      />
                      <label
                        for="gender-female"
                        class="btn btn-outline-primary text-black d-flex justify-content-center align-items-center w-100"
                      >
                        <span class="material-symbols-rounded">woman</span>
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="inputBirthDate" class="form-label" required
                    >Please enter your birth date</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    id="inputBirthDate"
                    required
                  />
                </div>
                <div class="mt-1">
                  <button
                    class="btn btn-primary fw-semibold btn-lg w-100"
                    type="submit"
                  >
                    Save Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("setupprofile-form", SetUpProfile);
