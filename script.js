document.addEventListener("DOMContentLoaded", () => {
  const cartDisplay = document.getElementById("cart-count");
  const modal = document.getElementById("cart-modal");
  const closeModal = document.getElementById("close-modal");
  const cartList = document.getElementById("cart-items-list");
  const cartIcon = document.querySelector(".cart");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const updateCartDisplay = () => {
    cartDisplay.textContent = cartItems.length;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

   const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  });

  const renderCart = () => {
    cartList.innerHTML = "";

    if (cartItems.length === 0) {
      cartList.innerHTML = "<li>Your cart is empty.</li>";
      return;
    }

    cartItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ${item.price}
        <button class="remove-item" data-index="${index}" style="margin-left: 10px;">Remove</button>
      `;
      cartList.appendChild(li);
    });

  
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cartItems.splice(index, 1); 
        updateCartDisplay();
        renderCart(); 
      });
    });
  };

   const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.previousElementSibling.previousElementSibling.textContent;
      const productPrice = button.previousElementSibling.textContent;

      cartItems.push({ name: productName, price: productPrice });
      updateCartDisplay();
      showToast(`${productName} added successfully`);
    });
  });

  const backBtn = document.getElementById("backToTop");

// Show after scrolling down 200px
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backBtn.classList.add("show");
  } else {
    backBtn.classList.remove("show");
  }
});

// Smooth scroll to top on click
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

  cartIcon.addEventListener("click", () => {
    renderCart();
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  
  updateCartDisplay();
});

function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  toastContainer.appendChild(toast);

  
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
