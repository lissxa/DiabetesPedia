import "./blog-card-detail.js";

class BlogListDetail extends HTMLElement {
  constructor() {
    super();
  }

  set blogs(blogs) {
    this._blogs = blogs;
    this.render();
  }

  renderBlogs(blogArray) {
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
        </div>
      </div>
    </section>
  `;

    const section = template.content.cloneNode(true);
    const contentContainer = section.querySelector(
      "#recent-blogs-content > .row"
    );

    blogArray.forEach((blog) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("col-sm-12", "col-md-6", "col-xl-4");

      const card = document.createElement("blog-card-detail");
      card.blog = blog;

      wrapper.appendChild(card);
      contentContainer.appendChild(wrapper);
    });

    this.appendChild(section);
    this.className = "d-flex flex-column gap-4";
  }

  showAllBlogs() {
    this.renderBlogs(this._blogs);
  }

  showInitialBlogs() {
    this.render();
  }

  render() {
    let blogsToRender;

    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    mediaQuery.matches
      ? (blogsToRender = this._blogs.slice(0, 3))
      : (blogsToRender = this._blogs.slice(0, 4));

    this.renderBlogs(blogsToRender);
  }
}

customElements.define("blog-list-detail", BlogListDetail);
