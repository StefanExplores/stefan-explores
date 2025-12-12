document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const successMsg = document.getElementById("successMessage");

    // Clear old message
    successMsg.textContent = "";
    successMsg.style.color = "";

    // Validate fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        successMsg.textContent = "Please fill out all fields.";
        successMsg.style.color = "red";
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        successMsg.textContent = "Please enter a valid email address.";
        successMsg.style.color = "red";
        return;
    }

    // Validate Google reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        successMsg.textContent = "Please confirm you're not a robot.";
        successMsg.style.color = "red";
        return;
    }

    // Prepare form data
    const data = new FormData(form);

    // Send POST request to Formspree
    try {
        const res = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" }
        });

        if (res.ok) {
            successMsg.textContent = "🎉 Your message has been sent! I'll reply as soon as I can.";
            successMsg.style.color = "green";
            form.reset();
            grecaptcha.reset();
        } else {
            successMsg.textContent = "Something went wrong. Please try again.";
            successMsg.style.color = "red";
        }
    } catch (error) {
        successMsg.textContent = "Network error. Please try again later.";
        successMsg.style.color = "red";
    }
});
