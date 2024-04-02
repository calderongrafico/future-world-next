"use client";
import Image from "next/image";
import styles from "app/sass/global-error.module.sass";

export default function GlobalError(props: ErrorPageProps) {
  return (
    <main className={styles.Error}>
      <h1 className={styles.Error__title}>Ha ocurrido un error</h1>
      <Image src="/images/error.png" alt="Error" width={500} height={500} />
      <p className={styles.Error__message}>Algo salió mal...</p>
      <button onClick={props.reset} className={styles.Error__button}>Intentar de nuevo</button>
    </main>
  );
}
