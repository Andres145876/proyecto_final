document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const productSection = document.getElementById("product-section");
    const productList = document.getElementById("product-list");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const response = await fetch("http://localhost:4000/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Inicio de sesión exitoso");
            showProducts();
        } else {
            alert("Error en el inicio de sesión: " + (data.message || "Intenta de nuevo"));
        }
    });

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const response = await fetch("http://localhost:4000/api/Usuarios/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
        } else {
            alert("Error en el registro: " + (data.message || "Intenta de nuevo"));
        }
    });

    async function showProducts() {
        productSection.classList.remove("hidden");
        const response = await fetch("http://localhost:4000/api/productos");
        const products = await response.json();
        
        productList.innerHTML = "";
        products.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = `${product.nombre} - $${product.precio}`;
            productList.appendChild(li);
        });
    }
});
