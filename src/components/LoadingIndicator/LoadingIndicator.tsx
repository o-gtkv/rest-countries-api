import style from './LoadingIndicator.module.css'

export default function LoadingIndicator() {
    return (
        <div className={style.loadingIndicatorWrapper}>
            <div className={style.loadingIndicator}></div>
        </div>
    )
}
