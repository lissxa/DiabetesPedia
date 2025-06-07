class BlogCard extends HTMLElement {
  constructor() {
    super();
  }

  set blog(blog) {
    this._blog = blog;
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="card bg-white rounded-4 border-0 p-4 flex-row gap-4" id="${this._blog.id}">
          <div
            class="card-body h-fit-content d-flex flex-column gap-3 justify-content-center"
          >
            <div class="row row-gap-4">
              <div class="col-sm-12 col-md-6">
                <div
                  class="h-100 blog-image bg-image-settings rounded-3"
                ></div>
              </div>
              <div class="col-sm-12 col-md-6 d-flex flex-column gap-3">
                <h6 class="upload-datetime">${this._blog.datetime}</h6>
                <div class="d-flex flex-column gap-2">
                  <h5 class="card-title fw-semibold fs-4">
                    ${this._blog.title}
                  </h5>
                  <p class="card-text">
                    ${this._blog.desc}
                  </p>
                </div>
                <a
                  href="#"
                  class="card-button btn btn-secondary fw-semibold fs-6 mt-2"
                  >Read More</a
                >
              </div>
            </div>
          </div>
        </div>
    `;
    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("blog-card", BlogCard);
