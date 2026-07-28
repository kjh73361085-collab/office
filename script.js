document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 모바일 내비게이션 토글 ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 스크롤 리빌 애니메이션 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- 학부모 후기 슬라이더 ---------- */
  const quotes = document.querySelectorAll('.quote');
  const dotsWrap = document.getElementById('quoteDots');
  let current = 0;
  let sliderTimer;

  if (quotes.length && dotsWrap) {
    quotes.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `${i + 1}번째 후기 보기`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showQuote(i, true));
      dotsWrap.appendChild(dot);
    });

    function showQuote(index, isManual) {
      quotes[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = index;
      quotes[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
      if (isManual) restartAutoplay();
    }

    function nextQuote() {
      showQuote((current + 1) % quotes.length, false);
    }

    function restartAutoplay() {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(nextQuote, 5000);
    }

    restartAutoplay();
  }

  /* ---------- 원서 라이브러리 책장 드래그 스크롤 ---------- */
  const shelf = document.getElementById('shelf');
  if (shelf) {
    let isDown = false;
    let startX;
    let scrollLeft;

    shelf.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - shelf.offsetLeft;
      scrollLeft = shelf.scrollLeft;
    });
    ['mouseleave', 'mouseup'].forEach((evt) =>
      shelf.addEventListener(evt, () => { isDown = false; })
    );
    shelf.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - shelf.offsetLeft;
      shelf.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }

  /* ---------- 빠른 문의 폼 (샘플 - 실제 전송 로직은 추후 연동) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = '문의가 접수되었습니다. 빠르게 연락드릴게요.';
      contactForm.reset();
    });
  }

  /* ---------- 헤더 스크롤 그림자 ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 16px rgba(4,52,44,0.06)' : 'none';
    });
  }

});
