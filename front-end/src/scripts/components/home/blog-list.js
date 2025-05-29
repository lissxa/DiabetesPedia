import "./blog-card.js";

class BlogList extends HTMLElement {
  constructor() {
    super();
  }

  set blogs(blogs) {
    this._blogs = blogs;
    this.render();
  }

  render() {
    this.innerHTML = ""; // light DOM clear

    // Limit to first 3 blogs
    const blogsToRender = this._blogs.slice(0, 3);

    blogsToRender.forEach((blog, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item";
      if (index === 0) carouselItem.classList.add("active");
      carouselItem.setAttribute("data-bs-interval", "5000");

      const card = document.createElement("blog-card");
      card.blog = blog;

      carouselItem.appendChild(card);
      this.appendChild(carouselItem);
    });
  }
}

customElements.define("blog-list", BlogList);
