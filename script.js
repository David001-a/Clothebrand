// document.addEventListener("DOMContentLoaded", () => {
//   let cartCount = 0;
//   const cartDisplay = document.getElementById("cart-count");
//   const buttons = document.querySelectorAll(".add-to-cart");

//   buttons.forEach(button => {
//     button.addEventListener("click", () => {
//       cartCount++;
//       cartDisplay.textContent = cartCount;
//       alert("Product added to cart!");
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const cartDisplay = document.getElementById("cart-count");
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartDisplay.textContent = cartCount;

  const buttons = document.querySelectorAll(".add-to-cart");

  const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      cartDisplay.textContent = cartCount;
      alert("Product added to cart!");
    });
  });
});