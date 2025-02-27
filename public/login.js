document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const formTitle = document.getElementById("form-title");

  document.getElementById("show-signup").addEventListener("click", function (event) {
      event.preventDefault();
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      formTitle.innerText = "Sign Up";
  });

  document.getElementById("show-login").addEventListener("click", function (event) {
      event.preventDefault();
      signupForm.style.display = "none";
      loginForm.style.display = "block";
      formTitle.innerText = "Login";
  });

  // Handle Signup
  signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("signup-username").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
          alert("Signup successful! Please login.");
          signupForm.style.display = "none";
          loginForm.style.display = "block";
          formTitle.innerText = "Login";
      } else {
          alert("Signup failed.");
      }
  });

  // Handle Login
  if (!loginForm) {
    console.error("❌ Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    if (!emailInput || !passwordInput) {
      console.error("❌ Email or Password input not found!");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // ✅ Debugging

      if (response.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("token", data.token);
    
        // ✅ Redirect using absolute URL
        window.location.href = "http://localhost:3000/dashboard";
      } 
      else {
          alert(data.message || "❌ Login failed.");
      }
    
    } catch (error) {
      console.error("Login Error:", error);
      alert("❌ Error logging in. Please try again later.");
    }
  });
});
