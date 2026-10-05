/* =========================================================
   PORTFOLIO WEBSITE
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const body = document.body;

const menuBtn = document.getElementById("menuBtn");

const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");

const typingElement = document.getElementById("typing");

const yearElement = document.getElementById("year");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const navLinks = document.querySelectorAll(".navbar a");

const sections = document.querySelectorAll("section");

const revealElements = document.querySelectorAll(".reveal");

const statNumbers = document.querySelectorAll("[data-target]");

const heroImage = document.querySelector(".hero-image");


/* =========================================================
   2. MOBILE MENU
   ========================================================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   3. CLOSE MOBILE MENU
   WHEN CLICKING NAVIGATION
   ========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {

            navbar.classList.remove("open");

        }

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   4. DARK / LIGHT MODE
   ========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    body.classList.add("light");

}


function updateThemeIcon() {

    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    if (body.classList.contains("light")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

    }

}


updateThemeIcon();


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("light");

        const theme = body.classList.contains("light")
            ? "light"
            : "dark";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

    });

}


/* =========================================================
   5. TYPING ANIMATION
   ========================================================= */

const typingWords = [

    "System Administrator",
    "Linux System Administrator",
    "Network Administrator",
    "Cloud Infrastructure Engineer"

];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    if (!typingElement) return;


    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        characterIndex++;

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1600
            );

            return;

        }


    } else {

        characterIndex--;

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                typingWords.length
            ) {

                wordIndex = 0;

            }

        }

    }


    const speed = deleting
        ? 45
        : 90;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();


/* =========================================================
   6. CURRENT YEAR
   ========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   7. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold: 0.12

        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   8. ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   9. ANIMATED STATISTICS
   ========================================================= */

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    statNumbers.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );


        let current = 0;


        const increment =
            Math.max(
                1,
                Math.ceil(target / 50)
            );


        const timer =
            setInterval(() => {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }


                counter.textContent =
                    current;

            }, 35);

    });

}


const statsSection =
    document.querySelector(".stats");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        startCounters();

                    }

                });

            },

            {

                threshold: 0.4

            }

        );


    statsObserver.observe(
        statsSection
    );

}


/* =========================================================
   10. CONTACT FORM
   ========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    "Please fill in all fields.",
                    true
                );

                return;

            }


            if (!validateEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    true
                );

                return;

            }


            /*
                This is a frontend-only form.

                It does NOT send an email yet.

                Later you can connect it to:
                - PHP
                - Formspree
                - EmailJS
                - Node.js
                - Your own backend
            */


            showFormMessage(
                `Thanks ${name}! Your message is ready to send.`,
                false
            );


            contactForm.reset();

        }

    );

}


/* =========================================================
   11. EMAIL VALIDATION
   ========================================================= */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* =========================================================
   12. FORM MESSAGE
   ========================================================= */

function showFormMessage(
    message,
    error = false
) {

    if (!formMessage) return;


    formMessage.textContent =
        message;


    formMessage.classList.add(
        "show"
    );


    if (error) {

        formMessage.style.color =
            "#ff6b9d";

    } else {

        formMessage.style.color =
            "#00d5ff";

    }


    setTimeout(() => {

        formMessage.classList.remove(
            "show"
        );

    }, 5000);

}


/* =========================================================
   13. PROFILE IMAGE MOUSE EFFECT
   ========================================================= */

if (
    heroImage &&
    window.innerWidth > 800
) {

    heroImage.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroImage.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -5;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                5;


            heroImage.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    heroImage.addEventListener(
        "mouseleave",
        () => {

            heroImage.style.transform =
                "perspective(700px) rotateX(0) rotateY(0)";

        }
    );

}


/* =========================================================
   14. PARALLAX BACKGROUND
   ========================================================= */

const blobs =
    document.querySelectorAll(".blob");


window.addEventListener(
    "scroll",
    () => {

        const scrollY =
            window.scrollY;


        blobs.forEach(
            (blob, index) => {

                const speed =
                    (index + 1) * 0.04;


                blob.style.transform =
                    `translateY(${scrollY * speed}px)`;

            }
        );

    }
);


/* =========================================================
   15. BUTTON RIPPLE EFFECT
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".btn, .cv-btn"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement(
                    "span"
                );


            ripple.classList.add(
                "ripple"
            );


            const rect =
                button.getBoundingClientRect();


            ripple.style.left =
                `${event.clientX - rect.left}px`;


            ripple.style.top =
                `${event.clientY - rect.top}px`;


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   16. PREVENT EMPTY LINKS
   ========================================================= */

const emptyLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


emptyLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

        }
    );

});


/* =========================================================
   17. HEADER SCROLL EFFECT
   ========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 40px rgba(0, 0, 0, 0.25)";

        } else {

            header.style.boxShadow =
                "0 0 35px rgba(0, 190, 255, 0.14)";

        }

    }
);


/* =========================================================
   18. ESC KEY CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navbar
        ) {

            navbar.classList.remove(
                "open"
            );


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                icon.classList.remove(
                    "fa-xmark"
                );


                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   19. WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            Close mobile menu when
            returning to desktop.
        */

        if (
            window.innerWidth > 800 &&
            navbar
        ) {

            navbar.classList.remove(
                "open"
            );


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


                icon.classList.remove(
                    "fa-xmark"
                );


                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================================================
   20. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cWelcome to my portfolio!",
    "color:#00d5ff;font-size:18px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS and JavaScript.",
    "color:#9fb8c5;font-size:13px;"
);