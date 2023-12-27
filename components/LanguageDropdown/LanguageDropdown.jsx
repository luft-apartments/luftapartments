import React, { useState, useEffect, useRef } from 'react';
import styles from './LanguageDropdown.module.scss';
import Link from 'next/link';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

import GermanFlag from '../../assets/images/flag-germany.png';
import BritishFlag from '../../assets/images/flag-britain.png';

gsap.registerPlugin(ScrollTrigger);

const LanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(GermanFlag);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
    // You can also add logic to change the language in your app here
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      start: 'top -70',
      end: 99999,
      toggleClass: {
        className: styles.dropdownScrolled,
        targets: `.${styles.dropdownItem}`,
      },
    });
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef} onClick={toggleDropdown}>
      <div className={styles.dropdownToggle}>
        <Image
          unoptimized
          src={selectedLanguage}
          width={20}
          height={20}
          alt="German flag"
        />
      </div>
      <div className={`${styles.dropdownMenu} ${isDropdownVisible ? styles.dropdownVisible : ''}`}>
        <Link href="https://en.luft-apartments.de" className={`${styles.dropdownItem} ${hasScrolled ? styles.dropdownScrolled : ''}`} onClick={() => selectLanguage('EN')}>
          <Image
            unoptimized
            src={BritishFlag}
            width={20}
            height={20}
            alt="British flag"
          />
        </Link>
        {/* Add more dropdown items as needed */}
      </div>
    </div>
  );
};

export default LanguageDropdown;