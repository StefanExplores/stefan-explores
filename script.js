document.querySelector(".contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const successMsg = document.getElementById("successMessage");

    const data = new FormData(form);

    // Post to Formspree
    const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
    });

    if (res.ok) {
        successMsg.textContent = "🎉 Your message has been sent! I'll reply as soon as I can.";
        form.reset();
    } else {
        successMsg.textContent = "Something went wrong. Please try again.";
    }
});
