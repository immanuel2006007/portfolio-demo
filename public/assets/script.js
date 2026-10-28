document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create background container
    const heroBackground = document.createElement('div');
    heroBackground.id = 'hero-background';
    heroBackground.className = 'hero-3d-background';
    heroSection.insertBefore(heroBackground, heroSection.firstChild);
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / heroSection.offsetHeight, 0.1, 1000);
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, heroSection.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroBackground.appendChild(renderer.domElement);
    
    // Add subtle fog for depth
    scene.fog = new THREE.FogExp2(0x001133, 0.02);
    
    // Create world container that will rotate
    const world = new THREE.Group();
    scene.add(world);
    
    // Central glowing sphere (focal point)
    const createCentralSphere = () => {
      const geometry = new THREE.SphereGeometry(3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00a2ff,
        transparent: true,
        opacity: 0.2,
        wireframe: true
      });
      const sphere = new THREE.Mesh(geometry, material);
      world.add(sphere);
      
      // Inner glow sphere
      const innerGeometry = new THREE.SphereGeometry(2.5, 32, 32);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.1
      });
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      sphere.add(innerSphere);
      
      return sphere;
    };
    
    const centralSphere = createCentralSphere();
    
    // Tech rings around the world
    const createTechRings = () => {
      const rings = [];
      const ringCount = 5;
      
      for (let i = 0; i < ringCount; i++) {
        const radius = 8 + (i * 3);
        const geometry = new THREE.TorusGeometry(radius, 0.05, 16, 100);
        const material = new THREE.MeshBasicMaterial({
          color: 0x00a2ff,
          transparent: true,
          opacity: 0.3,
          wireframe: i % 2 === 0
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = (i - ringCount/2) * 1.5;
        world.add(ring);
        rings.push(ring);
      }
      
      return rings;
    };
    
    const techRings = createTechRings();
    
    // Floating tech elements (circuits, chips, etc)
    const createTechElements = () => {
      const elements = [];
      const elementCount = 30;
      
      // Different tech shapes
      const shapes = [
        () => new THREE.BoxGeometry(0.8, 0.8, 0.1),  // Circuit board
        () => new THREE.CylinderGeometry(0.3, 0.3, 0.1, 6),  // Chip
        () => new THREE.TorusGeometry(0.4, 0.05, 8, 16),  // Ring
        () => new THREE.OctahedronGeometry(0.5)  // Diamond
      ];
      
      for (let i = 0; i < elementCount; i++) {
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const geometry = shapes[shapeIndex]();
        const material = new THREE.MeshBasicMaterial({
          color: 0x00a2ff,
          transparent: true,
          opacity: 0.8,
          wireframe: Math.random() > 0.7
        });
        
        const element = new THREE.Mesh(geometry, material);
        
        // Position in a spherical pattern
        const radius = 10 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        element.position.x = radius * Math.sin(phi) * Math.cos(theta);
        element.position.y = radius * Math.sin(phi) * Math.sin(theta);
        element.position.z = radius * Math.cos(phi);
        
        // Random rotation
        element.rotation.x = Math.random() * Math.PI;
        element.rotation.y = Math.random() * Math.PI;
        
        // Store original position for floating animation
        element.userData = {
          originalPosition: element.position.clone(),
          speed: 0.02 + Math.random() * 0.03,
          rotationSpeed: new THREE.Vector3(
            Math.random() * 0.01,
            Math.random() * 0.01,
            Math.random() * 0.01
          )
        };
        
        world.add(element);
        elements.push(element);
      }
      
      return elements;
    };
    
    const techElements = createTechElements();
    
    // Connection lines between elements
    const createConnections = () => {
      const lines = [];
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00a2ff,
        transparent: true,
        opacity: 0.2
      });
      
      // Connect some elements
      for (let i = 0; i < techElements.length; i += 2) {
        const nextIndex = (i + 1) % techElements.length;
        const geometry = new THREE.BufferGeometry().setFromPoints([
          techElements[i].position,
          techElements[nextIndex].position
        ]);
        
        const line = new THREE.Line(geometry, lineMaterial);
        world.add(line);
        lines.push({
          line,
          startIndex: i,
          endIndex: nextIndex
        });
      }
      
      return lines;
    };
    
    const connections = createConnections();
    
    // Digital particles floating around
    const createParticles = () => {
      const particlesCount = 500;
      const particles = new THREE.BufferGeometry();
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Random positions in a sphere
        const radius = 15 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = radius * Math.cos(phi);
        
        // Blue-ish colors
        colorArray[i] = 0.1 + Math.random() * 0.4; // R
        colorArray[i+1] = 0.5 + Math.random() * 0.5; // G
        colorArray[i+2] = 0.8 + Math.random() * 0.2; // B
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      world.add(particleSystem);
      
      return particleSystem;
    };
    
    const particleSystem = createParticles();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire world
      world.rotation.y += 0.002;
      world.rotation.x += 0.001;
      
      // Pulsing central sphere
      const pulse = Math.sin(Date.now() * 0.001) * 0.1 + 1;
      centralSphere.scale.set(pulse, pulse, pulse);
      
      // Animate tech elements
      techElements.forEach(element => {
        // Gentle floating motion
        const time = Date.now() * 0.001 * element.userData.speed;
        element.position.x = element.userData.originalPosition.x + Math.sin(time) * 0.5;
        element.position.y = element.userData.originalPosition.y + Math.cos(time * 0.7) * 0.5;
        element.position.z = element.userData.originalPosition.z + Math.sin(time * 0.3) * 0.5;
        
        // Rotation
        element.rotation.x += element.userData.rotationSpeed.x;
        element.rotation.y += element.userData.rotationSpeed.y;
        element.rotation.z += element.userData.rotationSpeed.z;
      });
      
      // Update connection lines
      connections.forEach(conn => {
        conn.line.geometry.dispose();
        conn.line.geometry = new THREE.BufferGeometry().setFromPoints([
          techElements[conn.startIndex].position,
          techElements[conn.endIndex].position
        ]);
      });
      
      // Rotate rings at different speeds
      techRings.forEach((ring, i) => {
        ring.rotation.z += 0.001 * (i + 1);
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / heroSection.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, heroSection.offsetHeight);
    });
  });

// Preloader
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.querySelector('.preloader').style.opacity = '0';
                setTimeout(function() {
                    document.querySelector('.preloader').style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        
        // Typewriter effect for name only
        function initTypewriter() {
        const name = "Immanuel Jayaruban P";
        const element = document.getElementById('typewriter-name');
        let i = 0;
        const speed = 120; // typing speed in ms
  
        function type() {
            if (i < name.length) {
            element.textContent += name.charAt(i);
            i++;
            setTimeout(type, speed);
            } else {
            // Remove cursor when done
            element.style.animation = 'none';
            element.style.borderRight = 'none';
            }
        }
  
        // Start typing after 0.5s delay
        setTimeout(type, 2000);
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', initTypewriter);


        // Mobile menu toggle
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('nav');
        const overlay = document.querySelector('.overlay');
        const navLinks = document.querySelectorAll('nav ul li a');

        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', function() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active menu item on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul li a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll animations
        function revealElements() {
            const elements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('show');
                }
            });
        }
        
        window.addEventListener('scroll', revealElements);
        window.addEventListener('load', revealElements);

        // Skill bars animation
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            });
        }
        
        // Trigger skill animation when about section is in view
        const aboutSection = document.getElementById('about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);

        // Portfolio filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        const slider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.testimonial-btn.prev');
        const nextBtn = document.querySelector('.testimonial-btn.next');

        let currentIndex = 0;
        const testimonialWidth = 100; // percentage width

        // Clone first and last testimonials for seamless looping
        const firstClone = testimonials[0].cloneNode(true);
        const lastClone = testimonials[testimonials.length - 1].cloneNode(true);
        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, testimonials[0]);

        // Update testimonials NodeList after cloning
        const allSlides = document.querySelectorAll('.testimonial');
        const totalSlides = allSlides.length;

        // Set initial position (to the first original slide)
        slider.style.transform = `translateX(-${testimonialWidth}%)`;

        function goToSlide(index) {
            // Add transition
            slider.style.transition = 'transform 0.5s ease-in-out';
    
            currentIndex = index;
            slider.style.transform = `translateX(-${(currentIndex + 1) * testimonialWidth}%)`;
        }

        // Reset position when reaching the clones (for infinite loop)
        slider.addEventListener('transitionend', () => {
            if (currentIndex >= totalSlides - 2) {
                // Jump to the second slide (first original) without animation
                slider.style.transition = 'none';
                currentIndex = 0;
                slider.style.transform = `translateX(-${(currentIndex + 1) * testimonialWidth}%)`;
            } else if (currentIndex < 0) {
             // Jump to the second last slide (last original) without animation
                slider.style.transition = 'none';
                currentIndex = totalSlides - 3;
                slider.style.transform = `translateX(-${(currentIndex + 1) * testimonialWidth}%)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Auto slide testimonials
        let testimonialInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Pause auto slide on hover
        document.querySelector('.testimonial-container').addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        document.querySelector('.testimonial-container').addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });

        // Project modals
        const modalLinks = document.querySelectorAll('[data-modal]');
        const modals = document.querySelectorAll('.modal');
        const modalCloses = document.querySelectorAll('.modal-close');
        
        modalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = document.getElementById(this.getAttribute('data-modal'));
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        modalCloses.forEach(close => {
            close.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        });
        
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        function copyLink(element) {
            const link = element.getAttribute("data-link");

            navigator.clipboard.writeText(link).then(() => {
                const toast = document.getElementById("copy-toast");
                toast.classList.add("show");
                setTimeout(() => {
                    toast.classList.remove("show");
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy link:", err);
            });
        }

        // Custom cursor
        const cursor = document.querySelector('.custom-cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Add hover effect for links and buttons
        const links = document.querySelectorAll('a, button, .burger');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Update your form submission handler
        const contactForm = document.querySelector('.contact-form');
        const successPopup = document.querySelector('.form-success-popup');
        const closeBtn = document.querySelector('.popup-close-btn');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
  
        // Show success popup
        successPopup.classList.add('active');
  
        // Add confetti effect
        createConfetti();
  
        // Reset form
            contactForm.reset();
        });

        closeBtn.addEventListener('click', function() {
            successPopup.classList.remove('active');
        });

        // Confetti creation function
        function createConfetti() {
            const container = document.querySelector('.popup-content');
            const colors = ['#00e5ff', '#00b4d8', '#0096c7', '#0077b6', '#48cae4'];
  
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.width = (Math.random() * 8 + 4) + 'px';
                confetti.style.height = confetti.style.width;
    
                container.appendChild(confetti);
    
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
                }, 3000);
            }
        }

        // extra
        let moreProjectsVisible = false;
        let currentFilter = 'all';

        // Initialize filter functionality
        function setupFilters() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    filterPortfolio(currentFilter);
                });
            });
        }

        function filterPortfolio(filter) {
            const items = document.querySelectorAll('.portfolio-item');
            items.forEach(item => {
                const shouldShow = filter === 'all' || item.dataset.category === filter;
                const isHidden = item.classList.contains('hidden');
                
                if (shouldShow && (!isHidden || moreProjectsVisible)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Copy link functionality
        function copyLink(element) {
            const link = element.dataset.link;
            navigator.clipboard.writeText(link).then(() => {
                // Show temporary feedback
                const originalHtml = element.innerHTML;
                element.innerHTML = '<i class="fas fa-check"></i>';
                element.style.background = 'rgba(76, 175, 80, 0.8)';
                
                setTimeout(() => {
                    element.innerHTML = originalHtml;
                    element.style.background = '';
                }, 1000);
            }).catch(() => {
                // Fallback for older browsers
                window.open(link, '_blank');
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            setupFilters();
        });