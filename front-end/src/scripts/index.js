import auth from "./auth.js";
import TestimonialData from "./data/TESTIMONIAL.json";
import BlogData from "./data/BLOGS.json";
import "./components/ui-components/big-button";

// Render Testimonial
function renderTestimonials() {
  const testimonialList = document.querySelector("testimonial-list");

  const getTestimonialData = async () => {
    try {
      const result = TestimonialData.testimonials;
      testimonialList.testimonials = result;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const testimonialList = document.querySelector("testimonial-list");
    const result = await getTestimonialData();

    if (testimonialList && result) {
      testimonialList.testimonials = result;
    }
  });
}

// Render Blog in Homepage
function renderBlogsHome() {
  const blogList = document.querySelector("blog-list");

  const getBlogData = async () => {
    try {
      const result = BlogData.blogs;
      blogList.blogs = result;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const result = await getBlogData();

    if (blogList && result) {
      blogList.blogs = result;
    }
  });
}

// Render Blog in Blog Page
function renderBlogsDetail() {
  const blogListDetail = document.querySelector("blog-list-detail");

  const getBlogData = async () => {
    try {
      const result = BlogData.blogs;
      blogListDetail.blogs = result;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    const result = await getBlogData();

    if (blogListDetail && result) {
      blogListDetail.blogs = result;
    }
  });
}

function initializeSignUpForm() {
  const signUpForm = document.getElementById("signUpForm");

  if (signUpForm) {
    signUpForm.style.display = "block";
  }
}

function renderLoadBlogButton() {
  document.addEventListener("DOMContentLoaded", () => {
    const blogListDetail = document.querySelector("blog-list-detail");

    if (blogListDetail) {
      const loadMoreButton = document.createElement("big-button");
      loadMoreButton.label = "Load More Blogs";
      loadMoreButton.type = "btn-primary";
      loadMoreButton.btnId = "loadMoreBlogsButton";
      loadMoreButton.btnTagElement = "button";

      blogListDetail.insertAdjacentElement("beforeend", loadMoreButton);

      loadMoreButton.addEventListener("click", () => {
        blogListDetail.showAllBlogs();
        loadMoreButton.remove();

        const showLessBlogButton = document.createElement("big-button");
        showLessBlogButton.label = "Show Less Blogs";
        showLessBlogButton.type = "btn-primary";
        showLessBlogButton.btnId = "showLessBlogsButton";
        showLessBlogButton.btnTagElement = "button";

        blogListDetail.insertAdjacentElement("beforeend", showLessBlogButton);

        showLessBlogButton.addEventListener("click", () => {
          blogListDetail.showInitialBlogs();
          showLessBlogButton.remove();
          blogListDetail.appendChild(loadMoreButton);
        });
      });
    }
  });
}

export {
  renderTestimonials,
  renderBlogsHome,
  renderBlogsDetail,
  initializeSignUpForm as signUpForm,
  renderLoadBlogButton,
  auth,
};
