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
      const button = document.createElement("big-button");
      button.label = "Load More Blogs";
      button.type = "btn-primary";
      button.btnId = "loadMoreBlogsButton";
      button.btnTagElement = "button";

      blogListDetail.insertAdjacentElement("beforeend", button);
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
