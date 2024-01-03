import React from 'react'
import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = ({
  copyright,
  footerLinksApartments,
  footerLinksPages,
  footerLogo
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerData}>
        <div className="container">
          <div className={styles.footerDataItems}>
            <div className={styles.footerDataItem}>
              <Link href="/">
                <Image
                  src={footerLogo}
                  width={100}
                  height={100}
                  alt="logo"
                />
              </Link>
            </div>
            <div className={styles.footerDataItem}>
              <p className={styles.footerDataItemTitle}>Wohnungen</p>
              {(footerLinksApartments || []).map((link) => (
                <div key={link.id}>
                  <Link href={link.destination || "/"} className={styles.link}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.footerDataItem}>
              <p className={styles.footerDataItemTitle}>Über uns</p>
              {(footerLinksPages || []).map((link) => (
                <div key={link.id}>
                  <Link href={link.destination || "/"} className={styles.link}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className={styles.footerDataItem}>
              <p className={styles.footerDataItemTitle}>Telefon & WhatsApp</p>
              <Link href="tel:+491772493525" className={styles.link}>+49 177 249 3525</Link>
              <Link href="tel:+491713821500" className={styles.link}>+49 171 3821 500</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <div className="container">
          <p>Copyright © {new Date().getFullYear()} Luft-Apartments. Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  )
}
