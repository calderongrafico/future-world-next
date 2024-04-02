"use client";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames/bind";
import { blurredImgUrl } from "./blurredDataUrlFixture";

import styles from "./Description.module.sass";

export const Description = () => {
  const [hasBorder, setBorder] = useState(false);
  const handleAddBorder = () => setBorder(!hasBorder);
  const context = classNames.bind(styles);
  const buttonStyles = context("Description__button", {
    "Description__button--border": hasBorder,
  })

  return (
    <section className={styles.Description}>
      <button onClick={handleAddBorder} className={buttonStyles}>
        {/* <img src="/images/description.jpeg" alt="Products marketplace" /> */}
        <div className={styles.Description__imageContainer}>
          <Image
            src="/images/description.jpeg"
            alt="Products marketplace"
            fill
            placeholder="blur"
            blurDataURL={blurredImgUrl}
          />
        </div>
      </button>
      <h2>Description</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsum
        molestias at et quibusdam sunt excepturi dolorem mollitia ipsam, aliquam
        consequatur perspiciatis quae expedita similique dolores sed reiciendis.
        Possimus, minima!
      </p>
    </section>
  );
};
