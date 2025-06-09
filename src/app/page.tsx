import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <section className={styles.sliderSection}>
        {/* 여기에 나중에 이미지 슬라이드 컴포넌트를 추가 */}
        <p>사진 슬라이드 자리</p>
      </section>

      <section className={styles.ctaSection}>
        <button className={styles.ctaButton}>Go Photo Contest</button>
      </section>
    </div>
  );
}
