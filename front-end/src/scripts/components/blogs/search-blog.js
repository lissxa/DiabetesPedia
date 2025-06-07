class SearchBlog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `      
      <div
        id="search-blog-section"
        class="card p-2 rounded-3 w-75 mx-auto border-0 position-absolute start-50 bottom-0" style="max-width: 1320px"
      >
        <div class="card-body">
          <div class="row row-gap-3">
            <div class="col-sm-12 col-md-5">
              <h5 class="card-title fs-3 fw-bold text-nowrap">Search articles</h5>
            </div>
            <div class="col-sm-12 col-md-7">
              <div class="d-flex gap-3">
                <input
                  type="search"
                  class="form-control"
                  id="search-blog"
                  placeholder="Search anything ..."
                  style="border-color: rgba(0,0,0,.4)"
                />
                <button class="btn btn-secondary">Search</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("search-blog", SearchBlog);
