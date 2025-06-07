const greetingElement = document.querySelector(".fs-3.fw-bold");

function displayUserName() {
  const storedUser = localStorage.getItem("currentUser");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    const formattedName =
      user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();
    greetingElement.textContent = `Hello, ${formattedName}!`;
  } else {
    greetingElement.textContent = "Hello, Guest!";
  }
}

document.addEventListener("DOMContentLoaded", displayUserName);
