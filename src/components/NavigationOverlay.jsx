import React, { useRef, useState, useEffect } from 'react';
import './css/NavigationOverlay.css';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NavigationOverlay = () => {
  const overlayRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState('https://cdn.pixabay.com/photo/2017/05/14/19/19/bream-2312881_1280.jpg');
  const arrowRefs = useRef([]);

  const linkImages = {
    'Página Principal': 'https://cdn.pixabay.com/photo/2017/05/14/19/19/bream-2312881_1280.jpg', 
    'Sobre Nosotros': 'https://cdn.pixabay.com/photo/2017/08/03/14/00/tokyo-2576471_1280.jpg', 
    'Servicios': 'https://cdn.pixabay.com/photo/2016/07/17/03/02/shrimp-1523135_1280.jpg', 
    'Productos': 'https://cdn.pixabay.com/photo/2024/10/14/11/23/anchovies-9119485_1280.jpg', 
    'Ubicación': 'https://cdn.pixabay.com/photo/2017/08/03/14/00/tokyo-2576471_1280.jpg', 
    'Compras Minoristas': 'https://cdn.pixabay.com/photo/2016/07/17/03/02/shrimp-1523135_1280.jpg', 
    'Compras Mayoristas': 'https://cdn.pixabay.com/photo/2024/10/14/11/23/anchovies-9119485_1280.jpg', 
    'Número de Contacto': 'https://cdn.pixabay.com/photo/2015/12/24/10/27/hake-1106698_1280.jpg', 
    'Trabajá con Nosotros': 'https://cdn.pixabay.com/photo/2017/05/14/19/19/bream-2312881_1280.jpg', 
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleLinkHover = (linkText, index) => {
    if (arrowRefs.current[index]) {
      gsap.to(arrowRefs.current[index], {
        x: 10,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
    gsap.to(`.nav-link-${index}`, {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      duration: 0.3,
      ease: 'power2.out',
    });
    const newImage = linkImages[linkText] || 'https://cdn.pixabay.com/photo/2017/05/14/19/19/bream-2312881_1280.jpg';
    if (newImage !== currentImage && imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setCurrentImage(newImage);
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        },
      });
    }
  };

  const handleLinkLeave = (index) => {
    if (arrowRefs.current[index]) {
      gsap.to(arrowRefs.current[index], {
        x: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
    gsap.to(`.nav-link-${index}`, {
      fontSize: '1rem',
      fontWeight: '300',
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const setArrowRef = (el, index) => {
    arrowRefs.current[index] = el;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <input type="checkbox" id="checkbox" checked={isOpen} onChange={toggleMenu} />
      <label htmlFor="checkbox" className="toggle">
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </label>
      <div className="overlay" ref={overlayRef}>
        <div className="left-side">
          <img
            ref={imageRef}
            src={currentImage}
            alt="Seafood or cultural imagery"
            className="nature-image"
          />
        </div>
        <div className="right-side">
          <div className="header-nav">
            <input type="checkbox" id="checkbox" checked={isOpen} onChange={toggleMenu} />
            <label htmlFor="checkbox" className="toggle">
              <div className="bars" id="bar1"></div>
              <div className="bars" id="bar2"></div>
              <div className="bars" id="bar3"></div>
            </label>
          </div>
          <div className="nav-content">
            <div>
              <h2 className="section-header-principal">Frigorífico Pez Pez •</h2>
            </div>
            <div className="nav-links">
              <div className="nav-column">
                {['Página Principal', 'Sobre Nosotros', 'Servicios', 'Productos', 'Ubicación'].map(
                  (link, index) => (
                    <div key={index} className="nav-link-container">
                      <a
                        href="#"
                        className={`nav-link nav-link-${index}`}
                        onMouseEnter={() => handleLinkHover(link, index)}
                        onMouseLeave={() => handleLinkLeave(index)}
                      >
                        {link}
                      </a>
                      <FontAwesomeIcon
                        ref={(el) => setArrowRef(el, index)}
                        icon={faArrowRight}
                        className="nav-arrow"
                        style={{ opacity: 0 }}
                      />
                    </div>
                  )
                )}
              </div>
              <div className="nav-column">
                {[
                  'Compras Minoristas',
                  'Compras Mayoristas',
                  'Número de Contacto',
                  'Trabajá con Nosotros',
                ].map((link, index) => (
                  <div key={index + 5} className="nav-link-container">
                    <a
                      href="#"
                      className={`nav-link nav-link-${index + 5}`}
                      onMouseEnter={() => handleLinkHover(link, index + 5)}
                      onMouseLeave={() => handleLinkLeave(index + 5)}
                    >
                      {link}
                    </a>
                    <FontAwesomeIcon
                      ref={(el) => setArrowRef(el, index + 5)}
                      icon={faArrowRight}
                      className="nav-arrow"
                      style={{ opacity: 0 }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-section">
              <h3 className="section-header">Contacto</h3>
              <div className="contact-info">
                <p className="contact-text">info@gmail.com</p>
                <p className="contact-text">+54 381 667 1884</p>
              </div>
            </div>
            <div className="social-section">
              <h3 className="section-header">Redes Sociales</h3>
              <div className="social-buttons">
                <button className="social-button">
                  <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </button>
                <button className="social-button">
                  <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
                </button>
                <button className="social-button">
                  <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className="footer">
            <a href="#" className="footer-link">
              © 219Labs. Todos los derechos reservados.
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationOverlay;