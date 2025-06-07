import "./blog-card-detail.js";

class BlogListDetail extends HTMLElement {
  constructor() {
    super();
  }

  set blogs(blogs) {
    this._blogs = blogs;
    this.render();
  }

  render() {
    this.innerHTML = "";

    const template = document.createElement("template");
    template.innerHTML = `
      <section
        id="recent-blogs"
        class="padding-common mt-5 d-flex flex-column gap-5"
      >
        <h2 class="fw-bold text-center">Recent Blog Posts</h2>
        <div class="container" id="recent-blogs-content">
          <div class="row row-gap-4">
            <!-- Blog cards will be inserted here -->
          </div>
        </div>
      </section>
    `;

    const section = template.content.cloneNode(true);
    const contentContainer = section.querySelector(
      "#recent-blogs-content > .row",
    );

    this._blogs.forEach((blog) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("col-sm-12", "col-md-6", "col-xl-4");

      const card = document.createElement("blog-card-detail");
      card.blog = blog;

      wrapper.appendChild(card); // <div class="col-*"><blog-card-detail>...</blog-card-detail></div>
      contentContainer.appendChild(wrapper);
    });

    this.appendChild(section);
  }
}

customElements.define("blog-list-detail", BlogListDetail);
