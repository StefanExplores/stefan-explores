// ----------------------------------------------------
// CONTACT FORM HANDLING (Formspree)
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const successMsg = document.getElementById("successMessage");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        successMsg.textContent = ""; // clear previous messages

        const name = form.querySelector("input[name='name']").value.trim();
        const email = form.querySelector("input[name='email']").value.trim();
        const message = form.querySelector("textarea[name='message']").value.trim();

        // ----------------------------------------------------
        // BASIC VALIDATION
        // ----------------------------------------------------
        if (!name || !email || !message) {
            successMsg.textContent = "Please fill in all fields.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            successMsg.textContent = "Please enter a valid email.";
            return;
        }

        // ----------------------------------------------------
        // SUBMIT TO FORMSPREE
        // ----------------------------------------------------
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                successMsg.textContent = "🎉 Your message has been sent! I'll reply as soon as I can.";
                form.reset();
            } else {
                successMsg.textContent = "Something went wrong — please try again.";
            }
        } catch (error) {
            successMsg.textContent = "Network error. Please try again.";
        }
    });
});
