class BlogCardDetail extends HTMLElement {
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
        <div class="card bg-white rounded-4 border-0 p-3 justify-content-center h-100" id="${this._blog.id}">
          <div class="card-body d-flex flex-column gap-3 justify-content-center order-1">
            <img class="rounded-3" src="${this._blog.imageUrl}" alt="" />
            <h6 class="upload-datetime">${this._blog.datetime}</h6>
            <h5 class="card-title fw-semibold fs-4">${this._blog.title}</h5>
            <p class="card-text multi-line-ellipsis--mask h-100">${this._blog.desc}</p>
            <a href="/blog-detail" class="card-button btn btn-secondary fw-semibold fs-6 mt-2"
              id="${this._blog.id}-button">Read More</a>
          </div>
        </div>
    `;
    this.innerHTML = "";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("blog-card-detail", BlogCardDetail);
