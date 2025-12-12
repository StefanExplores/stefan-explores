// ----------------------------------------------------
// CONTACT FORM SCRIPT — FORMSPREE + VALIDATION + SPAM PROTECTION
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const successMsg = document.getElementById("successMessage");

    // Create honeypot field (hidden spam trap)
    const honeypot = document.createElement("input");
    honeypot.type = "text";
    honeypot.name = "company";         // bots usually fill this
    honeypot.style.display = "none";   // human users never see it
    form.appendChild(honeypot);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        successMsg.textContent = "";  // reset

        const formData = new FormData(form);

        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------
        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const message = formData.get("message").trim();
        const botField = formData.get("company"); // honeypot

        // Honeypot spam block
        if (botField) {
            successMsg.textContent = "Spam detected. Message blocked.";
            return;
        }

        if (name.length < 2) {
            successMsg.textContent = "Please enter your name.";
            return;
        }

        if (!emailRegex.test(email)) {
            successMsg.textContent = "Please enter a valid email address.";
            return;
        }

        if (message.length < 5) {
            successMsg.textContent = "Your message is too short.";
            return;
        }

        // ----------------------------------------------------
        // LOADING STATE
        // ----------------------------------------------------
        const submitBtn = form.querySelector(".submit-btn");
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
        submitBtn.disabled = true;

        // ----------------------------------------------------
        // SEND TO FORMSPREE
        // ----------------------------------------------------
        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (res.ok) {
                successMsg.textContent =
                    "🎉 Your message has been sent! I’ll reply as soon as I can.";
                form.reset();
            } else {
                successMsg.textContent =
                    "Something went wrong. Please try again.";
            }
        } catch (err) {
            successMsg.textContent = "Network error. Please try again.";
        }

        // ----------------------------------------------------
        // RESET BUTTON
        // ----------------------------------------------------
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});
