import styles from "./Step.module.css";

export default function Step( props: { percent: number, widthComponent: number}) {
    const widthStyle = props.widthComponent + "%";
    const colorStyle = props.percent == 100 ? "#ffffffff" : "#ffffff99";

    return (
        <div className={styles.step} style={{width: widthStyle, backgroundColor: colorStyle}}></div>
    )
}