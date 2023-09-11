import classNames from 'classnames';
import { FC, Dispatch, SetStateAction } from 'react';

import styles from './TimerSettings.module.css';

export interface TimerSettingsType {
    session: number;
    break: number;
}

interface TimerSettingsProps {
    className?: string;
    settings: TimerSettingsType;
    setSettings: Dispatch<SetStateAction<TimerSettingsType>>;
}

const TimerSettings: FC<TimerSettingsProps> = ({ className, settings, setSettings }) => {
    const classes = classNames(className, styles.root);

    const onPlusSessionTime = () => setSettings((prev) => ({ ...prev, session: prev.session + 60 }));
    const onMinusSessionTime = () => setSettings((prev) => ({ ...prev, session: prev.session - 60 }));
    const onPlusBreakTime = () => setSettings((prev) => ({ ...prev, break: prev.break + 60 }));
    const onMinusBreakTime = () => setSettings((prev) => ({ ...prev, break: prev.break - 60 }));

    return (
        <div className={classes}>
            <div className={styles.setting}>
                <button
                    className={styles.btn}
                    onClick={onPlusSessionTime}
                    disabled={settings.session >= 3600}
                    aria-label='plus session time'>
                    △
                </button>
                <p className={styles.value}>{settings.session / 60}</p>
                <button
                    className={styles.btn}
                    onClick={onMinusSessionTime}
                    disabled={settings.session <= 60}
                    aria-label='minus session time'>
                    ▽
                </button>
            </div>
            <div className={styles.setting}>
                <button
                    className={styles.btn}
                    onClick={onPlusBreakTime}
                    disabled={settings.break >= 3600}
                    aria-label='plus break time'>
                    △
                </button>
                <p className={styles.value}>{settings.break / 60}</p>
                <button
                    className={styles.btn}
                    onClick={onMinusBreakTime}
                    disabled={settings.break <= 60}
                    aria-label='minus break time'>
                    ▽
                </button>
            </div>
        </div>
    );
};

export default TimerSettings;
