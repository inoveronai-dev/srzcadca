"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toTelHref, waters, type WaterType } from "@/content/site";
import { sk } from "@/lib/sk";
import { hidePlaceholders, isPlaceholderText } from "@/lib/placeholders";
import styles from "./WatersSection.module.css";

const filters: Array<"Všetky" | WaterType> = [
  "Všetky",
  "Kaprový",
  "Pstruhový",
  "Lipňový",
];

export function WatersSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Všetky");

  const visible = useMemo(() => {
    if (filter === "Všetky") return waters;
    return waters.filter((water) => water.type === filter);
  }, [filter]);

  return (
    <section
      className={`section section--paper section--continue ${styles.section}`}
      aria-labelledby="waters-title"
    >
      <div className="container">
        <h2 id="waters-title">{sk("Naše revíry")}</h2>
        <p className={styles.intro}>
          {sk(
            "Na každom revíri nájdete číslo revíru, platné povolenie, ryby a telefón na hospodára.",
          ).replace(/\s+(\S+)\s*$/u, "\u00A0$1")}
        </p>

        <div className={styles.filters} role="group" aria-label="Filter podľa typu revíru">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`btn btn--ghost-pill ${filter === item ? "is-active" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "Kaprový"
                ? sk("Kaprové")
                : item === "Pstruhový"
                  ? sk("Pstruhové")
                  : item === "Lipňový"
                    ? sk("Lipňové")
                    : sk(item)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.map((water) => (
            <article key={water.id} className={styles.card}>
              <div className={styles.photo}>
                {water.photo ? (
                  <Image
                    src={water.photo.src}
                    alt={sk(water.photo.alt)}
                    width={water.photo.width}
                    height={water.photo.height}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"
                    className={styles.image}
                    style={{ objectPosition: water.photo.objectPosition ?? "center" }}
                  />
                ) : (
                  <div className="placeholder-box" style={{ height: "100%" }}>
                    {sk(water.name)}
                  </div>
                )}
                <div className={styles.chipShade} aria-hidden="true" />
                <span className={styles.typeChip}>{sk(water.type)}</span>
              </div>
              <div className={styles.body}>
                <h3>
                  {water.href ? (
                    <Link href={water.href} className={styles.nameLink}>
                      {sk(water.name)}
                    </Link>
                  ) : (
                    sk(water.name)
                  )}
                </h3>
                <p className={styles.number}>
                  {water.numberLabel === "useky" ? sk("Počet úsekov:") : sk("Revír č.")}{" "}
                  {water.number}
                </p>
                <p className={styles.desc}>{sk(water.description)}</p>
                <div className={styles.divider} />
                {!(hidePlaceholders() && isPlaceholderText(water.wardenName)) ? (
                  <p className={styles.warden}>
                    {sk("Hospodár:")}{" "}
                    {water.wardenPhone ? (
                      <>
                        {sk(water.wardenName)},{" "}
                        <a href={toTelHref(water.wardenPhone)} className="tel">
                          {water.wardenPhone}
                        </a>
                      </>
                    ) : (
                      sk(water.wardenName)
                    )}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
