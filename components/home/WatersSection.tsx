"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { toTelHref, waters, type WaterType } from "@/content/site";
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
    <section className={`section ${styles.section}`} aria-labelledby="waters-title">
      <div className="container">
        <h2 id="waters-title">Naše revíry</h2>
        <p className={styles.intro}>
          Na každom revíri nájdete číslo revíru, platné povolenie, ryby a telefón na
          hospodára.
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
                ? "Kaprové"
                : item === "Pstruhový"
                  ? "Pstruhové"
                  : item === "Lipňový"
                    ? "Lipňové"
                    : item}
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
                    alt={water.photo.alt}
                    width={water.photo.width}
                    height={water.photo.height}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"
                    className={styles.image}
                    style={{ objectPosition: water.photo.objectPosition ?? "center" }}
                  />
                ) : (
                  <div className="placeholder-box" style={{ height: "100%" }}>
                    {water.name}
                  </div>
                )}
                <div className={styles.chipShade} aria-hidden="true" />
                <span className={styles.typeChip}>{water.type}</span>
              </div>
              <div className={styles.body}>
                <h3>{water.name}</h3>
                <p className={styles.number}>Revír č. {water.number}</p>
                <p className={styles.desc}>{water.description}</p>
                <div className={styles.divider} />
                <p className={styles.warden}>
                  Hospodár:{" "}
                  {water.wardenPhone ? (
                    <>
                      {water.wardenName},{" "}
                      <a href={toTelHref(water.wardenPhone)}>{water.wardenPhone}</a>
                    </>
                  ) : (
                    water.wardenName
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
