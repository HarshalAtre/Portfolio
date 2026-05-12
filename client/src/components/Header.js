import React, { useEffect, useMemo, useState } from 'react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isHome = useMemo(() => pathname === '/', [pathname]);

  useEffect(() => {
    if (!isHome) return undefined;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  if (!isHome) {
    return (
      <header className="bg-primary border-b border-[#1f436f] px-5 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight text-white">
            HA<span className="text-secondary">.</span>
          </a>
          <a href="/" className="text-tertiary hover:text-secondary transition-colors">
            Back To Site
          </a>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#081932cc] backdrop-blur-md border-b border-[#1f436f] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className={`header-nav relative flex items-center justify-between pl-40 pr-12 sm:px-5 ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <a href="#home" className="header-brand text-xl font-bold tracking-tight text-white -ml-28 sm:ml-0">
          HA<span className="text-secondary">.</span>
        </a>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 md:hidden">
          <div className="rounded-full border border-[#1f436f] bg-[#0f2a4a]/70 px-2 py-1 flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-full hover:bg-[#17385f] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          aria-label="Say Hello"
          className="inline-flex items-center justify-center md:hidden overflow-visible mario-navbar"
        >
          <dotlottie-player
            src="/mario-nav.lottie"
            background="transparent"
            speed="1"
            style={{ width: '150px', height: '60px' }}
            loop
            autoplay
          />
        </a>

        <button
          className="header-menu-btn hidden md:block text-white border border-[#1f436f] rounded-lg px-3 py-1"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="hidden md:block bg-[#081932ee] backdrop-blur-md border-t border-[#1f436f] animate-fade-in">
          <div className="header-mobile-menu px-5 py-5 flex flex-col gap-3">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="header-mobile-link text-gray-300 hover:text-white py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Say Hello"
              className="inline-flex items-center justify-center w-fit overflow-visible mario-hamburger"
            >
              <dotlottie-player
                src="/mario-nav.lottie"
                background="transparent"
                speed="1"
                style={{ width: '150px', height: '62px', display: 'block' }}
                loop
                autoplay
              />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
