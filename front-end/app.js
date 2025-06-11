import TestimonialData from "./src/scripts/data/TESTIMONIAL.json";

import "./src/scripts/components/header/jumbotron/my-jumbotron.js";
import "./src/scripts/components/home/customer-rating.js";
import "./src/scripts/components/home/the-steps.js";
import "./src/scripts/components/home/learn-more.js";
import "./src/scripts/components/home/the-features.js";
import "./src/scripts/components/home/home-banner.js";
import "./src/scripts/components/home/testimonial-list.js";
import "./src/scripts/components/home/testimonial-card.js";
import "./src/scripts/components/home/blog-list.js";
import "./src/scripts/components/home/blog-card.js";
import "./src/scripts/components/modal/signin-form.js";
import "./src/scripts/components/modal/signup-form.js";
import "./src/scripts/components/modal/setupprofile-form.js";
import "./src/scripts/components/header/main-navbar.js";
import "./src/scripts/components/footer/my-footer.js";
import "./src/scripts/components/blogs/blog-list-detail.js";
import "./src/scripts/components/blogs/blog-card-detail.js";
import "./src/scripts/components/blogs/search-blog.js";
import "./src/scripts/components/information/information.js";

import "./src/scripts/components/about-us/about-us.js";

import "./src/scripts/auth.js";

import {
  renderTestimonials,
  renderBlogsHome,
  renderBlogsDetail,
  signUpForm,
  renderLoadBlogButton,
  auth,
} from "./src/scripts/index.js";

auth();
renderTestimonials();
renderBlogsHome();
renderBlogsDetail();
signUpForm();
renderLoadBlogButton();
