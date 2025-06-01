import auth from "./auth.js";
import TestimonialData from "./data/TESTIMONIAL.json";
import BlogData from "./data/BLOGS.json";

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
    const result = await getTestimonialData(); // fetch data

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
    const result = await getBlogData(); // fetch data

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
    const result = await getBlogData(); // fetch data

    if (blogListDetail && result) {
      blogListDetail.blogs = result;
    }
  });
}

function signUpForm() {
  const signUpForm = document.getElementById("signUpForm");

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("inputEmailSignUp").value;
    const password = document.getElementById("inputPasswordSignUp").value;

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Email and password must be filled in!",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "User Default",
          email,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: result.message || "An error occurred during registration.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been successfully created. Please login..",
      });
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "There is an error",
        text: "Failed to contact server.",
      });
    }
  });
}

export {
  renderTestimonials,
  renderBlogsHome,
  renderBlogsDetail,
  signUpForm,
  auth,
};
