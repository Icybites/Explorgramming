// Navbar scroll
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
        });

        // Hamburger
        const hamburger = document.getElementById('hamburger');
        const navMenu   = document.getElementById('navMenu');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(l =>
            l.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            })
        );

        // Scroll-reveal for all .reveal elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el, i) => {
            el.style.transitionDelay = `${(i % 4) * 0.08}s`;
            observer.observe(el);
        });
        