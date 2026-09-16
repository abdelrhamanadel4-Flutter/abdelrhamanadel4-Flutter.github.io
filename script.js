/* ============================================================
   Flutter Developer Portfolio — script.js
   ------------------------------------------------------------
   A data-driven portfolio experience that renders entirely from
   a single projects data source. Includes:

   1.  Dark / light theme toggle (persisted to localStorage)
   2.  Sticky navbar with scroll state + active-section highlight
   3.  Filterable project gallery (All / Featured / Flutter /
       Firebase / UI/UX / Other)
   4.  Rich project detail modal (features, tech, meta, links)
   5.  Scroll-reveal animations (IntersectionObserver based)
   6.  Typing effect in the hero section
   7.  Smooth scrolling for anchor links
   8.  Mobile hamburger menu with slide-in panel
   9.  Back-to-top button
   10. Client-side validated contact form

   NO external libraries are used. Everything is vanilla ES6+.

   -----------------------------------------------------------------
   MARKUP HOOKS EXPECTED IN THE HTML (index.html)
   -----------------------------------------------------------------
   <html data-theme="dark">                     theme attribute
   #theme-toggle  .icon-sun .icon-moon          theme toggle icons
   .navbar                                      sticky nav bar
   .nav-menu   a[href^="#"]                     nav links + active link
   .hamburger                                   mobile menu trigger
   section[id]                                  sections for highlighting
   .filter-btn[data-filter="..."]               project filter buttons
   .projects-grid                               grid JS fills with cards
   .project-modal  .project-modal-content       detail modal shell
   #hero-role                                   typing target
   .back-to-top                                 back-to-top button
   #contactForm  [name="email"] [name="message"] [...]
   .reveal                                      scroll-reveal elements
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     PROJECT DATA
     Single source of truth for the entire portfolio. The HTML
     contains empty containers; all cards/modal content are
     generated from this array.
     ========================================================== */

  const projects = [
    {
      id: 'lady-driver',
      name: 'Lady Driver',
      shortName: 'Lady Driver',
      description: "A ride-hailing platform designed exclusively for women, connecting female passengers with verified female drivers. Currently available in Alexandria, Egypt with 10,000+ downloads on Google Play.",
      longDescription: "Lady Driver is a revolutionary ride-sharing platform designed exclusively for women by women, ensuring a safe, secure, and comfortable experience for both female drivers and passengers. The app provides women-only rides, flexible earning opportunities for drivers, seamless booking with real-time tracking, and dedicated 24/7 support. All drivers are verified and trained to provide a comfortable experience.",
      category: ['flutter', 'firebase'],
      featured: true,
      status: 'Published',
      statusColor: '#22c55e',
      image: 'assets/projects/lady_driver/cover.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Google Maps', 'Real-time Tracking'],
      features: [
        'Women-only ride matching',
        'Real-time GPS tracking',
        'Driver verification & training system',
        'Flexible scheduling for drivers',
        '24/7 customer support',
        'Secure payment processing',
        'Rating and review system',
        'Ride booking and management'
      ],
      architecture: 'Clean Architecture',
      stateManagement: 'Provider',
      backend: 'Firebase',
      links: {
        googlePlay: 'https://play.google.com/store/apps/details?id=com.ladydriver.eg&hl=ar',
        github: 'https://github.com/KerollosMoheb/App_LadyPassenger_V2'
      }
    },
    {
      id: 'plus90',
      name: '+90',
      shortName: '+90',
      description: 'A location-based platform connecting users with nearby discounted offers and time-sensitive deals from different businesses. Includes a complete UI design built in Figma.',
      longDescription: 'A location-based platform connecting users with nearby discounted offers and time-sensitive deals from different businesses. The app leverages geolocation to show nearby deals available for limited time windows, helping users discover savings in their area. I designed the full UI for this project in Figma and built the Flutter implementation with Firebase as the backend.',
      category: ['flutter', 'firebase', 'uiux'],
      featured: true,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/plus90/cover.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Geolocation', 'REST APIs', 'Push Notifications', 'Figma'],
      features: [
        'Location-based nearby offers',
        'Time-limited deal tracking',
        'User and store accounts',
        'Geolocation services',
        'Push notifications for deals',
        'Product and service browsing',
        'Custom UI design in Figma'
      ],
      architecture: 'Clean Architecture',
      stateManagement: 'BLoC/Cubit',
      backend: 'Firebase',
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/plus90_application',
        figma: 'https://www.figma.com/design/EKtJyJ4Ss6Y6yfwB99dRSx/3rd?node-id=0-1&p=f&t=Yq63X1LfRHlwawhw-0'
      }
    },
    {
      id: 'salla7ly',
      name: 'Salla7ly',
      shortName: 'Salla7ly',
      description: "A home services platform where AI analyzes the user's problem, estimates the expected cost, and helps connect users with suitable technicians.",
      longDescription: "A home services platform that leverages AI to analyze user problems, estimate expected costs, and connect users with suitable technicians. The platform streamlines the process of finding and booking home repair and maintenance services.",
      category: ['flutter', 'firebase'],
      featured: true,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/salla7ly/cover.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'AI Integration', 'Clean Architecture', 'REST APIs'],
      features: [
        'AI-powered problem analysis',
        'Cost estimation system',
        'Technician matching',
        'Service booking workflow',
        'User and technician accounts',
        'Clean Architecture implementation'
      ],
      architecture: 'Clean Architecture',
      stateManagement: 'BLoC/Cubit',
      backend: 'Firebase',
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/salla7ly_01'
      }
    },
    {
      id: 'news-app',
      name: 'NewsApp',
      shortName: 'NewsApp',
      description: 'A Flutter news application that fetches and displays the latest news from various sources with a clean, modern interface.',
      longDescription: 'A Flutter news application that fetches and displays the latest news from various sources. Built with a focus on clean UI design, smooth navigation, and efficient data handling from REST APIs.',
      category: ['flutter'],
      featured: false,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/news_app/cover.jpg',
      technologies: ['Flutter', 'Dart', 'REST API', 'HTTP'],
      features: [
        'News feed from multiple sources',
        'Category-based filtering',
        'Clean modern UI',
        'Smooth navigation',
        'Responsive layout'
      ],
      architecture: null,
      stateManagement: null,
      backend: 'REST API',
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/NewsApp'
      }
    },
    {
      id: 'evently',
      name: 'Evently App',
      shortName: 'Evently',
      description: 'A Flutter application for discovering, creating, and managing events with Firebase integration and localization support.',
      longDescription: 'A Flutter application for discovering, creating, and managing events. Features Firebase integration for backend services and supports localization for multilingual experiences. Includes custom splash screen and modern UI design.',
      category: ['flutter', 'firebase'],
      featured: false,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/evently/cover.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Localization', 'Custom Splash Screen'],
      features: [
        'Event discovery and browsing',
        'Event creation and management',
        'Firebase backend integration',
        'Multi-language support (l10n)',
        'Custom native splash screen',
        'Modern event card UI'
      ],
      architecture: null,
      stateManagement: null,
      backend: 'Firebase',
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/EventlyApp'
      }
    },
    {
      id: 'islamilproject',
      name: 'Islami Project',
      shortName: 'Islami',
      description: 'A Flutter Islamic application providing religious content and features in a beautiful, user-friendly interface.',
      longDescription: 'A Flutter Islamic application providing religious content and features in a beautiful, user-friendly interface. Built with attention to UI design and includes custom splash screen for a polished experience.',
      category: ['flutter'],
      featured: false,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/islamilproject/cover.jpg',
      technologies: ['Flutter', 'Dart', 'Custom Splash Screen'],
      features: [
        'Islamic content display',
        'Beautiful themed UI',
        'Custom native splash screen',
        'Responsive design',
        'Smooth animations'
      ],
      architecture: null,
      stateManagement: null,
      backend: null,
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/islamilproject'
      }
    },
    {
      id: 'appointment',
      name: 'Appointment',
      shortName: 'Appointment',
      description: 'A Flutter appointment booking application with clean system design and multi-platform support.',
      longDescription: 'A Flutter appointment booking application featuring a clean system design. Supports multiple platforms including web, desktop, and mobile. Includes custom splash screen and a well-structured codebase.',
      category: ['flutter'],
      featured: false,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/appointment/placeholder.svg',
      technologies: ['Flutter', 'Dart', 'Custom Splash Screen', 'Multi-platform'],
      features: [
        'Appointment booking system',
        'Multi-platform support (Web, Desktop, Mobile)',
        'Clean system design',
        'Custom native splash screen',
        'Cross-platform UI'
      ],
      architecture: null,
      stateManagement: null,
      backend: null,
      links: {
        github: 'https://github.com/abdelrhamanadel4-Flutter/appointemnt'
      }
    },
    {
      id: 'movies-app',
      name: 'Movies App',
      shortName: 'Movies',
      description: 'A collaborative Flutter application for browsing, searching, and exploring movies with a modern, polished interface.',
      longDescription: 'A collaborative Flutter movies application that lets users discover and explore movies. Built with a focus on clean UI, smooth navigation, and efficient data handling from REST APIs. This project was developed as part of a team effort.',
      category: ['flutter'],
      featured: false,
      status: 'Completed',
      statusColor: '#3b82f6',
      image: 'assets/projects/movies_app/cover.jpg',
      technologies: ['Flutter', 'Dart', 'REST API'],
      features: [
        'Movie browsing and discovery',
        'Movie search functionality',
        'Modern responsive UI',
        'Smooth navigation',
        'REST API integration'
      ],
      architecture: null,
      stateManagement: null,
      backend: 'REST API',
      links: {
        github: 'https://github.com/Moomen0/movies_app'
      }
    },
    {
      id: 'pi-domino',
      name: 'Pi Domino',
      shortName: 'Pi Domino',
      description: 'A collaborative domino games application, currently in active development.',
      longDescription: 'A dominoes application being built as part of a collaborative team project. The project is currently in active development.',
      category: ['flutter'],
      featured: false,
      status: 'In Development',
      statusColor: '#f59e0b',
      image: 'assets/projects/pi_domino/placeholder.svg',
      technologies: ['Flutter', 'Dart'],
      features: [
        'Domino gameplay',
        'Collaborative team project',
        'In active development'
      ],
      architecture: null,
      stateManagement: null,
      backend: null,
      links: {
        github: 'https://github.com/DiaaAhmedHassan/pi_domino'
      }
    },
    {
      id: 'skeleton-mobile-app',
      name: 'Skeleton Mobile App',
      shortName: 'Skeleton',
      description: 'A collaborative Flutter project that provides a starter skeleton structure for mobile app development, currently in active development.',
      longDescription: 'A starter skeleton project for mobile app development, designed to give a clean, reusable base structure for bootstrapping new Flutter applications. Currently in active development as part of a collaborative team.',
      category: ['flutter'],
      featured: false,
      status: 'In Development',
      statusColor: '#f59e0b',
      image: 'assets/projects/skeleton_mobile_app/placeholder.svg',
      technologies: ['Flutter', 'Dart'],
      features: [
        'Reusable starter structure',
        'Clean project organization',
        'Collaborative team project',
        'In active development'
      ],
      architecture: null,
      stateManagement: null,
      backend: null,
      links: {
        github: 'https://github.com/abdoelsayed294/skeleton_mobile_app'
      }
    }
  ];

  /* ==========================================================
     CONSTANTS & CONFIGURATION
     ========================================================== */

  const THEME_STORAGE_KEY = 'portfolio-theme';
  const DEFAULT_THEME = 'dark';
  const NAVBAR_SCROLL_THRESHOLD = 50;
  const BACK_TO_TOP_THRESHOLD = 500;
  const FILTER_ANIMATION_DURATION = 240;
  const TYPING_PHRASES = ['Flutter Developer', 'Mobile App Developer', 'UI/UX Enthusiast'];
  const TYPING_TYPE_SPEED = 75;
  const TYPING_DELETE_SPEED = 40;
  const TYPING_HOLD_DELAY = 1900;
  const TYPING_PAUSE_DELAY = 450;
  const FORM_SUCCESS_DURATION = 5000;
  const MODAL_STAGGER_DELAY = 0;
  const VALID_HEX_COLOR = /^#[0-9a-f]{3,8}$/i;

  /* Whether the user prefers reduced motion — gates every animation. */
  const motionSafe = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     APPLICATION STATE
     ========================================================== */

  let activeFilter = 'all';
  let lastFocusedElement = null;
  let revealObserver = null;

  /* ==========================================================
     DOM REFERENCES (populated once the DOM is ready)
     ========================================================== */

  const dom = {};

  /* ==========================================================
     FILTER DEFINITIONS
     Each key maps to a predicate over the projects array.
     ========================================================== */

  const isFlutter = (project) => project.category.includes('flutter');
  const isFirebase = (project) => project.category.includes('firebase');
  const isUiUx = (project) =>
    project.category.some((tag) => tag.toLowerCase().replace(/[\s-]/g, '').includes('uiux')) ||
    (Array.isArray(project.tags) && project.tags.includes('UI/UX'));

  const FILTERS = {
    all: () => projects.slice(),
    featured: () => projects.filter((project) => project.featured === true),
    flutter: () => projects.filter(isFlutter),
    firebase: () => projects.filter(isFirebase),
    uiux: () => projects.filter(isUiUx),
    other: () => projects.filter((project) => !isFlutter(project) && !isFirebase(project) && !isUiUx(project))
  };

  const getFilteredProjects = () =>
    FILTERS[activeFilter] ? FILTERS[activeFilter]() : projects.slice();

  /* ==========================================================
     SMALL UTILITIES
     ========================================================== */

  function escapeHtml(value) {
    if (value == null) return '';
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, (char) => entities[char]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
  }

  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Storage unavailable (private mode, etc.) — fail silently. */
    }
  }

  function getValidStatusStyle(color) {
    if (typeof color !== 'string' || !VALID_HEX_COLOR.test(color)) {
      return 'color:var(--status-color, #3b82f6);';
    }
    return `color:${color};background:${color}14;border-color:${color}40;`;
  }

  /* ==========================================================
     THEME TOGGLE
     Persists the active theme and swaps the sun/moon icon.
     ========================================================== */

  function initTheme() {
    const storedTheme = safeGetItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : DEFAULT_THEME;

    applyTheme(initialTheme, { persist: false });

    if (!dom.themeToggle) return;

    dom.themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark', { persist: true });
    });
  }

  function applyTheme(theme, options) {
    const persist = options && options.persist === true;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) safeSetItem(THEME_STORAGE_KEY, theme);
    updateThemeToggleIcon(theme);
  }

  function updateThemeToggleIcon(theme) {
    if (!dom.themeToggle) return;
    const sunIcon = dom.themeToggle.querySelector('.icon-sun');
    const moonIcon = dom.themeToggle.querySelector('.icon-moon');

    /* In dark mode show the sun (clicking switches to light) and vice versa. */
    if (sunIcon) sunIcon.classList.toggle('is-active', theme === 'dark');
    if (moonIcon) moonIcon.classList.toggle('is-active', theme === 'light');
  }

  /* ==========================================================
     NAVBAR SCROLL STATE + BACK-TO-TOP VISIBILITY
     ========================================================== */

  function initNavbar() {
    const onScroll = () => {
      const scrolledPastTop = window.pageYOffset > NAVBAR_SCROLL_THRESHOLD;
      const scrolledFar = window.pageYOffset > BACK_TO_TOP_THRESHOLD;

      if (dom.navbar) dom.navbar.classList.toggle('is-scrolled', scrolledPastTop);
      if (dom.backToTop) dom.backToTop.classList.toggle('is-visible', scrolledFar);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================
     ACTIVE SECTION HIGHLIGHTING
     Uses an IntersectionObserver to mark the nav link whose
     section currently occupies the viewport band.
     ========================================================== */

  function initActiveSectionHighlight() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const targetId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${targetId}`;
          link.classList.toggle('is-active', isActive);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  /* ==========================================================
     MOBILE MENU
     Hamburger toggle, slide-in panel, outside-click + Escape
     close, and body scroll lock.
     ========================================================== */

  function initMobileMenu() {
    const hamburger = dom.hamburger;
    const menu = dom.navMenu;
    if (!hamburger || !menu) return;

    const setMenuOpen = (open) => {
      hamburger.classList.toggle('is-active', open);
      menu.classList.toggle('is-active', open);
      document.body.classList.toggle('menu-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!menu.classList.contains('is-active'));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (
        menu.classList.contains('is-active') &&
        !menu.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-active')) {
        setMenuOpen(false);
      }
    });
  }

  /* ==========================================================
     PROJECT FILTERING
     "All" shows everything; every other button delegates to its
     FILTERS predicate. Re-renders the grid with a fade animation.
     ========================================================== */

  function initFiltering() {
    dom.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filterKey = button.dataset.filter;
        if (!filterKey || filterKey === activeFilter) return;

        activeFilter = filterKey;
        dom.filterButtons.forEach((btn) => {
          btn.classList.toggle('is-active', btn === button);
          btn.setAttribute('aria-pressed', String(btn === button));
        });

        applyFilterAnimation();
      });
    });

    const defaultActive = dom.filterButtons.find((btn) => btn.dataset.filter === 'all') || dom.filterButtons[0];
    if (defaultActive) {
      defaultActive.classList.add('is-active');
      defaultActive.setAttribute('aria-pressed', 'true');
    }
  }

  function applyFilterAnimation() {
    if (!dom.projectsGrid) return;

    if (!motionSafe) {
      renderProjects(getFilteredProjects());
      return;
    }

    dom.projectsGrid.classList.add('is-filtering');
    window.setTimeout(() => {
      renderProjects(getFilteredProjects());
      dom.projectsGrid.classList.remove('is-filtering');
    }, FILTER_ANIMATION_DURATION);
  }

  /* ==========================================================
     PROJECT CARDS RENDERING
     Builds the grid markup from the data array and re-arms the
     reveal observer so newly added cards animate in.
     ========================================================== */

  function renderProjects(items) {
    if (!dom.projectsGrid) return;

    if (!items.length) {
      dom.projectsGrid.innerHTML =
        '<div class="projects-empty reveal revealed" role="status">' +
          '<p>No projects match this filter yet.</p>' +
        '</div>';
      return;
    }

    dom.projectsGrid.innerHTML = items
      .map((project, index) => createProjectCard(project, index))
      .join('');

    applyStagger();
    observeReveals(dom.projectsGrid);
  }

  function createProjectCard(project, index) {
    const featuredClass = project.featured ? ' project-card--featured' : '';
    const status = project.status || '';
    const statusStyle = getValidStatusStyle(project.statusColor);
    const technologies = Array.isArray(project.technologies) ? project.technologies : [];
    const visibleTech = technologies.slice(0, 4);
    const hasMoreTech = technologies.length > 4;
    const githubLink = project.links && project.links.github;
    const playLink = project.links && project.links.googlePlay;

    return (
      '<article class="project-card reveal' + featuredClass + '" ' +
        'data-project-id="' + escapeAttr(project.id) + '" ' +
        'data-category="' + escapeAttr(project.category.join(' ')) + '">' +
        '<div class="project-card-media">' +
          '<div class="project-card-image">' +
            '<img src="' + escapeAttr(project.image) + '" alt="' + escapeAttr(project.name) + '" ' +
              'loading="lazy" data-index="' + index + '" ' +
              'onerror="this.onerror=null;this.src=\'assets/projects/placeholder.svg\';this.classList.add(\'is-fallback\');">' +
            (featuredClass
              ? '<span class="project-card-featured-badge">Featured</span>'
              : '') +
            (status
              ? '<span class="project-card-status" style="' + statusStyle + '">' + escapeHtml(status) + '</span>'
              : '') +
          '</div>' +
        '</div>' +
        '<div class="project-card-body">' +
          '<h3 class="project-card-title">' + escapeHtml(project.name) + '</h3>' +
          '<p class="project-card-description">' + escapeHtml(project.description || '') + '</p>' +
          (visibleTech.length
            ? '<ul class="project-card-tags">' +
                visibleTech.map((tag) => '<li>' + escapeHtml(tag) + '</li>').join('') +
                (hasMoreTech ? '<li class="project-card-tags-more">+' + (technologies.length - 4) + '</li>' : '') +
              '</ul>'
            : '') +
          '<div class="project-card-actions">' +
            '<button type="button" class="btn btn-primary" data-action="details">Details</button>' +
            (githubLink
              ? '<a class="btn btn-outline" href="' + escapeAttr(githubLink) + '" target="_blank" rel="noopener noreferrer">GitHub</a>'
              : '') +
            (playLink
              ? '<a class="btn btn-outline" href="' + escapeAttr(playLink) + '" target="_blank" rel="noopener noreferrer">Google Play</a>'
              : '') +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ==========================================================
     PROJECT CARD EVENT DELEGATION
     One listener on the grid handles all "Details" clicks so the
     handler survives re-renders.
     ========================================================== */

  function initProjectGridDelegation() {
    if (!dom.projectsGrid) return;

    dom.projectsGrid.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-action="details"]');
      if (!trigger) return;

      const card = event.target.closest('[data-project-id]');
      if (!card) return;

      openProjectModal(card.dataset.projectId);
    });
  }

  /* ==========================================================
     PROJECT DETAIL MODAL
     Populates the modal shell from the project data, manages
     focus, scroll lock, and all dismissal paths.
     ========================================================== */

  function initModal() {
    if (!dom.modal || !dom.modalContent) return;

    /* Clicking the backdrop (the overlay itself) closes the modal. */
    dom.modal.addEventListener('click', (event) => {
      if (event.target === dom.modal) closeProjectModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && dom.modal.classList.contains('is-open')) {
        closeProjectModal();
      }
    });
  }

  function openProjectModal(projectId) {
    const project = projects.find((item) => item.id === projectId);
    if (!project || !dom.modal || !dom.modalContent) return;

    lastFocusedElement = document.activeElement;

    dom.modalContent.innerHTML = createProjectModalHTML(project);
    dom.modal.setAttribute('aria-hidden', 'false');
    dom.modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    document.body.classList.remove('menu-open');

    const closeButton = dom.modalContent.querySelector('.project-modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', closeProjectModal);
      closeButton.focus();
    }
  }

  function closeProjectModal() {
    if (!dom.modal || !dom.modal.classList.contains('is-open')) return;

    dom.modal.classList.remove('is-open');
    dom.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function createProjectModalHTML(project) {
    const status = project.status || 'Not specified';
    const statusStyle = getValidStatusStyle(project.statusColor);
    const technologies = Array.isArray(project.technologies) ? project.technologies : [];
    const features = Array.isArray(project.features) && project.features.length ? project.features : null;
    const metaRows = [
      { label: 'Architecture', value: project.architecture },
      { label: 'State Management', value: project.stateManagement },
      { label: 'Backend', value: project.backend }
    ].filter((row) => row.value);

    const links = project.links || {};
    const githubLink = links.github;
    const playLink = links.googlePlay;
    const figmaLink = links.figma;

    return (
      '<div class="project-modal-header">' +
        '<div>' +
          '<span class="project-modal-status" style="' + statusStyle + '">' + escapeHtml(status) + '</span>' +
          '<h2 class="project-modal-title">' + escapeHtml(project.name) + '</h2>' +
        '</div>' +
        '<button type="button" class="project-modal-close" aria-label="Close project details">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">' +
            '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="project-modal-body">' +
        '<div class="project-modal-media">' +
          '<img src="' + escapeAttr(project.image) + '" alt="' + escapeAttr(project.name) + '" ' +
            'onerror="this.onerror=null;this.src=\'assets/projects/placeholder.svg\';this.classList.add(\'is-fallback\');">' +
        '</div>' +
        '<p class="project-modal-description">' + escapeHtml(project.longDescription || project.description || '') + '</p>' +
        (features
          ? '<section class="project-modal-section">' +
              '<h3 class="project-modal-section-title">Key Features</h3>' +
              '<ul class="project-modal-features">' +
                features.map((feature) => '<li>' + escapeHtml(feature) + '</li>').join('') +
              '</ul>' +
            '</section>'
          : '') +
        (technologies.length
          ? '<section class="project-modal-section">' +
              '<h3 class="project-modal-section-title">Technologies</h3>' +
              '<div class="project-modal-tech">' +
                technologies.map((tag) => '<span class="project-modal-tech-badge">' + escapeHtml(tag) + '</span>').join('') +
              '</div>' +
            '</section>'
          : '') +
        (metaRows.length
          ? '<dl class="project-modal-meta">' +
              metaRows.map((row) =>
                '<div class="project-modal-meta-row">' +
                  '<dt>' + escapeHtml(row.label) + '</dt>' +
                  '<dd>' + escapeHtml(row.value) + '</dd>' +
                '</div>'
              ).join('') +
            '</dl>'
          : '') +
        (githubLink || playLink || figmaLink
          ? '<div class="project-modal-links">' +
              '<h3 class="project-modal-section-title">Links</h3>' +
              '<div class="project-modal-link-buttons">' +
                (githubLink
                  ? '<a class="btn btn-primary" href="' + escapeAttr(githubLink) + '" target="_blank" rel="noopener noreferrer">View on GitHub</a>'
                  : '') +
                (figmaLink
                  ? '<a class="btn btn-outline" href="' + escapeAttr(figmaLink) + '" target="_blank" rel="noopener noreferrer">View Figma Design</a>'
                  : '') +
                (playLink
                  ? '<a class="btn btn-outline" href="' + escapeAttr(playLink) + '" target="_blank" rel="noopener noreferrer">View on Google Play</a>'
                  : '') +
              '</div>' +
            '</div>'
          : '') +
      '</div>'
    );
  }

  /* ==========================================================
     SCROLL REVEAL ANIMATIONS
     Elements carrying .reveal fade/translate in once they enter
     the viewport. Reduced-motion users see them instantly.
     ========================================================== */

  function createRevealObserver() {
    if (!motionSafe || revealObserver) return;

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  }

  function observeReveals(scope) {
    const elements = scope.querySelectorAll('.reveal');
    elements.forEach((element) => {
      element.classList.remove('is-revealed');
      if (!motionSafe) {
        element.classList.add('is-revealed');
        return;
      }
      if (!revealObserver) createRevealObserver();
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-revealed');
    });
  }

  function applyStagger() {
    const groups = document.querySelectorAll(
      '.projects-grid .reveal, .skills-grid .reveal, .services-grid .reveal, ' +
      '.stats-grid .reveal, .journey-grid .reveal, .contact-grid .reveal'
    );

    groups.forEach((element, index) => {
      element.style.transitionDelay = (index % 12) * 60 + 'ms';
    });
  }

  function initReveals() {
    createRevealObserver();
    observeReveals(document);
  }

  /* ==========================================================
     HERO TYPING EFFECT
     Cycles through phrases with a type / delete / pause rhythm.
     Falls back to static text when motion is reduced.
     ========================================================== */

  function initTyping() {
    const target = dom.heroRole;
    if (!target) return;

    if (!motionSafe) {
      target.textContent = TYPING_PHRASES[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeTick() {
      const phrase = TYPING_PHRASES[phraseIndex % TYPING_PHRASES.length];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      target.textContent = phrase.slice(0, charIndex);

      let delay = deleting ? TYPING_DELETE_SPEED : TYPING_TYPE_SPEED;

      if (!deleting && charIndex === phrase.length) {
        delay = TYPING_HOLD_DELAY;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        delay = TYPING_PAUSE_DELAY;
      }

      window.setTimeout(typeTick, delay);
    }

    typeTick();
  }

  /* ==========================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     Offsets each target by the fixed navbar height.
     ========================================================== */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (link.hasAttribute('data-action')) return;

      link.addEventListener('click', (event) => {
        const hash = link.getAttribute('href');
        if (!hash || hash.length < 2) return;

        const target = document.querySelector(hash);
        if (!target) return;

        event.preventDefault();
        scrollToElement(target);
      });
    });
  }

  function scrollToElement(target) {
    const navbarHeight = dom.navbar ? dom.navbar.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 10;

    if (motionSafe && 'scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo(0, top);
    }
  }

  /* ==========================================================
     BACK-TO-TOP BUTTON
     Visibility is handled in initNavbar's scroll handler.
     ========================================================== */

  function initBackToTop() {
    if (!dom.backToTop) return;

    dom.backToTop.addEventListener('click', () => {
      if (motionSafe && 'scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  /* ==========================================================
     CONTACT FORM
     Client-side validation only. Shows a success message on
     submit since no backend is configured. Nothing is sent.
     ========================================================== */

  function initContactForm() {
    const form = dom.contactForm;
    if (!form) return;

    const validators = {
      name: (value) =>
        value.trim().length >= 2 ? '' : 'Please enter your full name.',
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ''
          : 'Please enter a valid email address.',
      message: (value) =>
        value.trim().length >= 10
          ? ''
          : 'Message must be at least 10 characters.'
    };

    const setFieldError = (input, message) => {
      const group = input.closest('.form-group');
      if (!group) return;

      let errorNode = group.querySelector('.form-error-message');

      if (message && !errorNode) {
        errorNode = document.createElement('small');
        errorNode.className = 'form-error-message';
        group.appendChild(errorNode);
      }

      if (errorNode) errorNode.textContent = message;

      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      group.classList.toggle('has-error', Boolean(message));
    };

    /* Live-clearing: remove errors as the user types. */
    Object.keys(validators).forEach((fieldName) => {
      const input = form.querySelector('[name="' + fieldName + '"]');
      if (!input) return;

      input.addEventListener('input', () => setFieldError(input, ''));
      input.addEventListener('blur', () => {
        setFieldError(input, validators[fieldName](input.value));
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let isValid = true;
      let firstInvalidField = null;

      Object.keys(validators).forEach((fieldName) => {
        const input = form.querySelector('[name="' + fieldName + '"]');
        if (!input) return;

        const message = validators[fieldName](input.value);
        setFieldError(input, message);

        if (message) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = input;
        }
      });

      if (!isValid) {
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.querySelector('span') || submitBtn : null;
      const originalLabel = submitBtn ? submitBtn.childNodes[0].nodeValue || submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then((response) => {
          if (!response.ok) throw new Error('Request failed with status ' + response.status);
          return response.json();
        })
        .then(() => {
          showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
          form.reset();
          Object.keys(validators).forEach((fieldName) => {
            const input = form.querySelector('[name="' + fieldName + '"]');
            if (input) setFieldError(input, '');
          });
        })
        .catch(() => {
          showFormMessage(
            form,
            'Sorry, your message could not be sent. Please try again or email me directly at abdelrhamanadel4@gmail.com.',
            'error'
          );
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });
  }

  function showFormMessage(form, text, type) {
    const existing = form.nextElementSibling;
    if (existing && (existing.classList.contains('form-success') || existing.classList.contains('form-error'))) {
      existing.remove();
    }

    const message = document.createElement('div');
    message.className = type === 'error' ? 'form-error' : 'form-success';
    message.setAttribute('role', 'status');
    message.textContent = text;
    form.insertAdjacentElement('afterend', message);

    window.requestAnimationFrame(() => message.classList.add('is-visible'));

    window.setTimeout(() => {
      message.classList.remove('is-visible');
      window.setTimeout(() => message.remove(), 300);
    }, FORM_SUCCESS_DURATION);
  }

  /* ==========================================================
     DOM REFERENCE CACHE
     ========================================================== */

  function cacheDom() {
    dom.themeToggle = document.querySelector('#theme-toggle');
    dom.navbar = document.querySelector('.navbar');
    dom.navMenu = document.querySelector('.nav-menu');
    dom.hamburger = document.querySelector('.hamburger');
    dom.filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    dom.projectsGrid = document.querySelector('.projects-grid');
    dom.modal = document.querySelector('.project-modal');
    dom.modalContent = document.querySelector('.project-modal-content');
    dom.backToTop = document.querySelector('.back-to-top');
    dom.heroRole = document.querySelector('#hero-role');
    dom.contactForm = document.querySelector('#contactForm');
  }

  /* ==========================================================
     INITIALIZATION
     ========================================================== */

  function init() {
    cacheDom();
    initTheme();
    initNavbar();
    initActiveSectionHighlight();
    initMobileMenu();
    initFiltering();
    initReveals();

    /* Initial grid render reads from the default "all" filter. */
    renderProjects(getFilteredProjects());

    initProjectGridDelegation();
    initModal();
    initTyping();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();