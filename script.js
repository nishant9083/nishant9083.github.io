// Modern Portfolio JavaScript - 2025
class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupCustomCursor();
        this.setupThemeToggle();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupTypingEffect();
        this.setupCounterAnimation();
        this.setupProjectFilter();
        this.setupFormHandling();
        this.setupParticleAnimation();
        this.setup3DCardEffects();
        this.initializeLucideIcons();
    }

    setupEventListeners() {
        window.addEventListener('load', () => {
            this.handlePageLoad();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handlePageLoad() {
        // Remove loading state from images
        const images = document.querySelectorAll('img[data-loading="true"]');
        images.forEach(img => {
            img.removeAttribute('data-loading');
        });

        // Initialize animations
        this.animateOnScroll();
    }

    handleScroll() {
        this.updateActiveNavLink();
        this.updateHeaderBackground();
    }

    handleResize() {
        // Handle responsive adjustments
        this.updateCustomCursor();
    }

    // Custom Cursor
    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }

    updateCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        } else {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
        }
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add transition effect
            document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Mobile Navigation
    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Update Active Navigation Link
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update Header Background
    updateHeaderBackground() {
        const nav = document.querySelector('.nav');
        
        if (window.scrollY > 50) {
            nav.style.background = 'var(--color-bg-glass)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'var(--color-bg-glass)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.hero-text, .hero-visual, .about-text, .about-stats, .timeline-item, .project-card, .skills-category, .contact-item, .stat-item'
        );

        elementsToAnimate.forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.classList.contains('hero-text')) {
            element.style.animation = 'fadeInLeft 0.8s ease-out forwards';
        } else if (element.classList.contains('hero-visual')) {
            element.style.animation = 'fadeInRight 0.8s ease-out forwards';
        } else if (element.classList.contains('timeline-item')) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
        
        // Remove from observer after animation
        this.observer.unobserve(element);
    }

    animateOnScroll() {
        // Initial state for animated elements
        const elements = document.querySelectorAll(
            '.hero-text, .hero-visual, .about-text, .about-stats, .timeline-item, .project-card, .skills-category, .contact-item'
        );
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const roleTexts = document.querySelectorAll('.role-text');
        if (roleTexts.length === 0) return;

        const roles = ['AI/ML Engineer', 'Full Stack Developer', 'Mobile Developer', 'Tech Enthusiast'];
        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const typeEffect = () => {
            const currentText = roles[currentRole];
            const roleElement = roleTexts[0]; // Assuming first role text element

            if (!isDeleting && currentChar < currentText.length) {
                roleElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
                setTimeout(typeEffect, typeSpeed);
            } else if (isDeleting && currentChar > 0) {
                roleElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
                setTimeout(typeEffect, deleteSpeed);
            } else if (!isDeleting && currentChar === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, pauseTime);
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                setTimeout(typeEffect, typeSpeed);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }

    // Counter Animation
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                
                if (target >= 100) {
                    counter.textContent = Math.floor(current);
                } else {
                    counter.textContent = Math.floor(current * 10) / 10;
                }
                
                requestAnimationFrame(updateCounter);
            };
            
            // Start animation when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Project Filter
    setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    this.showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                this.showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-${type === 'success' ? 'success' : 'error'});
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close button
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Particle Animation
    setupParticleAnimation() {
        const particleContainer = document.querySelector('.hero-particles');
        if (!particleContainer) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--color-primary);
                border-radius: 50%;
                opacity: 0.3;
                animation: float 3s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            particleContainer.appendChild(particle);
            particles.push(particle);
        }

        // Animate particles
        setInterval(() => {
            particles.forEach(particle => {
                const x = parseFloat(particle.style.left);
                const y = parseFloat(particle.style.top);
                
                particle.style.left = (x + Math.random() * 2 - 1) + '%';
                particle.style.top = (y + Math.random() * 2 - 1) + '%';
                
                // Reset position if out of bounds
                if (parseFloat(particle.style.left) < 0) particle.style.left = '100%';
                if (parseFloat(particle.style.left) > 100) particle.style.left = '0%';
                if (parseFloat(particle.style.top) < 0) particle.style.top = '100%';
                if (parseFloat(particle.style.top) > 100) particle.style.top = '0%';
            });
        }, 100);
    }

    // Initialize Lucide Icons
    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Utility method to debounce functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization: lazy load images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Keyboard navigation support
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
            
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // 3D Card Effects with Mouse Tracking
    setup3DCardEffects() {
        const cards = document.querySelectorAll('.project-card, .floating-card, .skill-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });

        // Enhanced floating cards interaction
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.animation = 'none';
                card.style.transform = 'rotateY(360deg) scale(1.2)';
                
                setTimeout(() => {
                    card.style.animation = '';
                    card.style.transform = '';
                }, 600);
            });
        });

        // 3D Progress bars for skills
        this.enhance3DProgressBars();
    }

    enhance3DProgressBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(skill => {
            const progressBar = skill.querySelector('.skill-progress');
            if (progressBar) {
                const progress = progressBar.style.width || '0%';
                progressBar.style.background = 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))';
                progressBar.style.borderRadius = '10px';
                progressBar.style.position = 'relative';
                progressBar.style.overflow = 'hidden';
                
                // Add animated shine effect
                const shine = document.createElement('div');
                shine.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    animation: shine 2s infinite;
                `;
                progressBar.appendChild(shine);
            }
        });

        // Add shine animation to CSS
        const shineStyle = document.createElement('style');
        shineStyle.textContent = `
            @keyframes shine {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `;
        document.head.appendChild(shineStyle);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px;
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
    
    // Initialize 3D system after a short delay to ensure Three.js is loaded
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            new Portfolio3D();
        }
    }, 500);
});

// 3D Engine for Portfolio Enhancements
class Portfolio3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.geometricShapes = [];
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createScene();
        this.createGeometricBackground();
        this.createInteractiveParticles();
        this.setupEventListeners();
        this.animate();
    }

    createScene() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // Add to hero background
        const heroBackground = document.querySelector('.hero-particles');
        if (heroBackground) {
            heroBackground.innerHTML = '';
            heroBackground.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = 'absolute';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '-1';
        }
    }

    createGeometricBackground() {
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 32, 32),
            new THREE.TetrahedronGeometry(0.4),
            new THREE.OctahedronGeometry(0.4),
            new THREE.IcosahedronGeometry(0.3)
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.6,
                wireframe: false
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x8b5cf6, 
                transparent: true, 
                opacity: 0.4,
                wireframe: true
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x0ea5e9, 
                transparent: true, 
                opacity: 0.5
            })
        ];

        // Create floating geometric shapes
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)].clone();
            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 10;

            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            // Physics properties
            mesh.userData = {
                velocity: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05,
                    z: (Math.random() - 0.5) * 0.05
                }
            };

            this.geometricShapes.push(mesh);
            this.scene.add(mesh);
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    createInteractiveParticles() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            // Colors
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i3] = 0.39; colors[i3 + 1] = 0.40; colors[i3 + 2] = 0.94; // Primary
            } else if (colorChoice < 0.66) {
                colors[i3] = 0.55; colors[i3 + 1] = 0.36; colors[i3 + 2] = 0.96; // Purple
            } else {
                colors[i3] = 0.05; colors[i3 + 1] = 0.65; colors[i3 + 2] = 0.91; // Blue
            }

            // Velocities
            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            this.renderer.domElement.style.display = 'none';
        }
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        // Animate geometric shapes
        this.geometricShapes.forEach((shape) => {
            // Physics movement
            shape.position.x += shape.userData.velocity.x;
            shape.position.y += shape.userData.velocity.y;
            shape.position.z += shape.userData.velocity.z;

            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Boundary checks
            if (Math.abs(shape.position.x) > 10) shape.userData.velocity.x *= -1;
            if (Math.abs(shape.position.y) > 10) shape.userData.velocity.y *= -1;
            if (Math.abs(shape.position.z) > 5) shape.userData.velocity.z *= -1;

            // Mouse interaction
            const distance = shape.position.distanceTo(new THREE.Vector3(this.mouse.x * 10, this.mouse.y * 10, 0));
            if (distance < 3) {
                const force = 0.1 / (distance + 0.1);
                shape.userData.velocity.x += (shape.position.x - this.mouse.x * 10) * force * 0.001;
                shape.userData.velocity.y += (shape.position.y - this.mouse.y * 10) * force * 0.001;
            }
        });

        // Animate particles with mouse interaction
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                // Magnetic effect towards mouse
                const px = positions[i];
                const py = positions[i + 1];
                const mouseWorldX = this.mouse.x * 10;
                const mouseWorldY = this.mouse.y * 10;
                
                const dx = mouseWorldX - px;
                const dy = mouseWorldY - py;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 5) {
                    const force = 0.05 / (distance + 0.1);
                    velocities[i] += dx * force * 0.001;
                    velocities[i + 1] += dy * force * 0.001;
                }

                // Apply velocities
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Damping
                velocities[i] *= 0.98;
                velocities[i + 1] *= 0.98;
                velocities[i + 2] *= 0.98;

                // Boundary wrapping
                if (positions[i] > 10) positions[i] = -10;
                if (positions[i] < -10) positions[i] = 10;
                if (positions[i + 1] > 10) positions[i + 1] = -10;
                if (positions[i + 1] < -10) positions[i + 1] = 10;
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.geometry.attributes.velocity.needsUpdate = true;
        }

        // Camera gentle movement
        this.camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5;
        this.camera.position.y = Math.cos(elapsedTime * 0.15) * 0.3;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Service Worker for offline support (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
        }
    }
});

try {
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
} catch (e) {
    // Fallback for browsers that don't support these metrics
    console.log('Performance observer not supported');
}
