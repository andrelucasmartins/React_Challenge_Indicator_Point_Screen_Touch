import styles from "./styles.module.css";

interface DotPinProps {
  x: number;
  y: number;
}

export const DotPin = ({ x, y }: DotPinProps) => {
  return <span className={styles.dot} style={{ left: x, top: y }} />;
};
