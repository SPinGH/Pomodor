import { FC, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { secondsToTimeString } from '@/lib/secondsToTimeString';
import TimerSettings from './TimerSettings/TimerSettings';

import Wave from '@/assets/wave.svg';
import Alert from '@/assets/alert.mp3';

import styles from './Timer.module.css';

interface TimerProps {
    className?: string;
}

const DEFAULT_SESSION_SECONDS = 30 * 60;
const DEFAULT_BREAK_SECONDS = 5 * 60;

const Timer: FC<TimerProps> = ({ className }) => {
    const timer = useRef<NodeJS.Timeout>();
    const [isSession, setIsSession] = useState(true);

    const [isStarted, setIsStarted] = useState(false);
    const onStartClick = () => setIsStarted(true);
    const onPauseClick = () => setIsStarted(false);

    const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SESSION_SECONDS);
    const timeLeft = secondsToTimeString(secondsLeft);

    const [timerSettings, setTimerSettings] = useState({
        session: DEFAULT_SESSION_SECONDS,
        break: DEFAULT_BREAK_SECONDS,
    });

    useEffect(() => {
        if (isStarted) {
            setSecondsLeft(isSession ? timerSettings.session : timerSettings.break);
            timer.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev === 0) {
                        const audio = new Audio(Alert);
                        audio.play();
                        setIsSession((prev) => !prev);
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setIsSession(true);
            setSecondsLeft(timerSettings.session);
            clearInterval(timer.current);
        }
        return () => clearInterval(timer.current);
    }, [isStarted, isSession, timerSettings]);

    const classes = classNames(className, styles.root);
    const settingsClasses = classNames(styles.settings, { [styles.hide]: isStarted });

    return (
        <div className={classes}>
            <div className={styles.timer}>
                <img className={styles.wave} src={Wave} alt='wave animation' />
                <p className={styles.text}>
                    {!isStarted && 'Ready?'}
                    {isStarted && (isSession ? 'Session' : 'Break')}
                </p>
                <p className={styles.time}>{timeLeft}</p>
                {isStarted ? (
                    <button className={styles.btn} onClick={onPauseClick}>
                        ◼ STOP
                    </button>
                ) : (
                    <button className={styles.btn} onClick={onStartClick}>
                        ▶ START
                    </button>
                )}
            </div>
            <TimerSettings className={settingsClasses} settings={timerSettings} setSettings={setTimerSettings} />
        </div>
    );
};

export default Timer;
