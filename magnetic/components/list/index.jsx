"use client";

import { Variable } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { thumbnailOptions } from "@/data";

import styles from "./styles.module.scss";
import css from "../../../../icons/css.svg";
import figma from "../../../../icons/figma.svg";
import framermotion from "../../../../icons/framer-motion.svg";
import html from "../../../../icons/html.svg";
import javascript from "../../../../icons/javascript.svg";
import leaflet from "../../../../icons/leaflet.svg";
import nextjs from "../../../../icons/nextjs.svg";
import nodejs from "../../../../icons/nodejs.svg";
import postgresql from "../../../../icons/postgresql.svg";
import react from "../../../../icons/react.svg";
import scss from "../../../../icons/scss.svg";
import supabase from "../../../../icons/supabase.svg";
import tailwind from "../../../../icons/tailwind.svg";
import typescript from "../../../../icons/typescript.svg";

/**
 * @param {Object} props
 * @param {(index: number) => void} props.handlePointerEnter
 * @param {(index: number) => void} props.handlePointerLeave
 * @param {(x: number, y: number) => void} props.moveItems
 */

const iconPaths = {
  react: react,
  css: css,
  javascript: javascript,
  html: html,
  nextjs: nextjs,
  scss: scss,
  tailwind: tailwind,
  figma: figma,
  leaflet: leaflet,
  nodejs: nodejs,
  supabase: supabase,
  postgresql: postgresql,
  typescript: typescript,
  // Add more mappings as needed
};

export function ThumbnailList({
  handlePointerEnter,
  handlePointerLeave,
  moveItems,
}) {
  const items = thumbnailOptions.map(
    ({ href, title, stack, writeup, image }, index) => {
      const id = index;
      return (
        <li
          key={`thumbnail-list-${id}`}
          className="border-t border-solid transition-all"
          style={
            {
              // paddingInline: 'calc(clamp(1em,3vw,4em) * 2)',
              // paddingBlock: 'clamp(1em,3vw,4em)',
            }
          }
        >
          <div className={`group ${styles.projects__list__container}`}>
            <Link
              href={href}
              className={`${styles.projects__list__link} project`}
              onPointerEnter={({ clientX, clientY }) => {
                handlePointerEnter(id);
                moveItems(clientX, clientY);
              }}
              onPointerLeave={({ clientX, clientY }) => {
                handlePointerLeave(id);
                moveItems(clientX, clientY);
              }}
              passHref
            >
              <div
                className={`${styles.projects__list__thumbnail} flex-projects-col group-hover:scale-[1.03]`}
              >
                <div className={styles.title__image}>
                  <div
                    className={`${styles.overlay__image} overlay-projects`}
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className={`${styles.projects__list__title} flex-col`}>
                <h4>
                  <span>{title}</span>
                </h4>
                <div className={styles.stripe}></div>
              </div>
              <div
                className={`${styles.projects__list__stack} flex w-full flex-row flex-wrap`}
              >
                {stack.map((item, i) => {
                  const lowerCaseItem = item.toLowerCase();
                  const iconSrc = iconPaths[lowerCaseItem];

                  return (
                    <div
                      key={`skill ${i}`}
                      className="mb-4 mr-5 flex w-auto min-w-16 items-center gap-[0.3rem]"
                    >
                      <span className="text-xl font-extrabold max-sm:text-[1rem]">
                        {item}
                      </span>
                      <Image
                        src={iconSrc}
                        alt={`${item}-icon`}
                        width={50}
                        height={50}
                        style={{ height: "auto" }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.projects__list__details} flex-col`}>
                <p className="text-xl">{writeup}</p>
              </div>
            </Link>
          </div>
        </li>
      );
    },
  );

  return <ul className={` ${styles.projects__list}`}>{items}</ul>;
}
