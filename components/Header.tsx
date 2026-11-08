"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { mainNav, site, toTelHref } from "@/content/site";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [fishermenOpen, setFishermenOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setFishermenOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={64}
            height={64}
            className={styles.logo}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandSub}>{site.shortOrg}</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Hlavná navigácia">
          <ul className={styles.navList}>
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label} className={styles.hasDropdown}>
                  <button
                    type="button"
                    className={styles.navButton}
                    aria-expanded={fishermenOpen}
                    aria-haspopup="true"
                    onClick={() => setFishermenOpen((v) => !v)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setFishermenOpen(false);
                      }
                    }}
                  >
                    {item.label} ▾
                  </button>
                  <ul
                    className={`${styles.dropdown} ${fishermenOpen ? styles.dropdownOpen : ""}`}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setFishermenOpen(false)}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link href="/povolenia" className={`btn btn--teal ${styles.cta}`}>
          Predaj povolení
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id={menuId}
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobilná navigácia">
          <ul className={styles.mobileList}>
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    className={styles.mobileToggle}
                    aria-expanded={fishermenOpen}
                    onClick={() => setFishermenOpen((v) => !v)}
                  >
                    {item.label}
                    <span aria-hidden="true">{fishermenOpen ? "−" : "+"}</span>
                  </button>
                  {fishermenOpen ? (
                    <ul className={styles.mobileSub}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={closeMenu}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className={styles.mobileFooter}>
          <Link href="/povolenia" className="btn btn--teal" onClick={closeMenu}>
            Predaj povolení
          </Link>
          <a href={toTelHref(site.saleContact.phone)} className={`${styles.phone} tel`}>
            Predaj povolení: {site.saleContact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
