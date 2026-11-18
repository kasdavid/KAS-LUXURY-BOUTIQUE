
/* =====================================================
   KAS LUXURY BOUTIQUE
   MAIN APPLICATION JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("KAS LUXURY BOUTIQUE is ready!");

    /* =========================================
       1. AUTOMATIC FOOTER YEAR
    ========================================= */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       2. BACK TO TOP BUTTON
    ========================================= */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       3. WEBSITE SEARCH
    ========================================= */

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("siteSearch");

    if (searchForm && searchInput) {

        searchForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const searchTerm = searchInput.value.trim();

            if (!searchTerm) {
                showNotification("Please enter a product name.");
                return;
            }

            const searchQuery = encodeURIComponent(searchTerm);

            window.location.href = "shop.html?search=" + searchQuery;

        });

    }


    /* =========================================
       4. NEWSLETTER FORM
    ========================================= */

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");

    if (newsletterForm && newsletterEmail) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email = newsletterEmail.value.trim();

            if (!email) {
                showNotification("Please enter your email address.");
                return;
            }

            if (!isValidEmail(email)) {
                showNotification("Please enter a valid email address.");
                return;
            }

            showNotification(
                "Thank you for your interest! Newsletter subscriptions are not connected yet."
            );

            newsletterForm.reset();

        });

    }


    /* =========================================
       5. EMAIL VALIDATION
    ========================================= */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =========================================
       6. NOTIFICATION SYSTEM
    ========================================= */

    window.showNotification = function(message) {

        let notification = document.getElementById("siteNotification");

        if (!notification) {

            notification = document.createElement("div");

            notification.id = "siteNotification";

            notification.style.position = "fixed";
            notification.style.bottom = "25px";
            notification.style.left = "50%";
            notification.style.transform = "translateX(-50%)";
            notification.style.background = "#D4AF37";
            notification.style.color = "#080808";
            notification.style.padding = "14px 22px";
            notification.style.borderRadius = "8px";
            notification.style.fontWeight = "600";
            notification.style.zIndex = "9999";
            notification.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
            notification.style.maxWidth = "90%";
            notification.style.textAlign = "center";

            document.body.appendChild(notification);

        }

        notification.textContent = message;

        notification.style.display = "block";

        clearTimeout(window.notificationTimer);

        window.notificationTimer = setTimeout(() => {

            notification.style.display = "none";

        }, 3500);

    };


    /* =========================================
       7. WEBSITE INITIALIZATION
    ========================================= */

    console.log("Website scripts loaded successfully.");

});

