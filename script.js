document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("form-status").innerText =
        "Message sent! (This is a demo — you can hook Formspree or EmailJS here.)";
});
