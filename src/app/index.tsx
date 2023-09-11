import { FC } from 'react';

import Background from '@/components/Background';
import Timer from '@/components/Timer';

import styles from './App.module.css';
import './reset.css';

const App: FC = () => {
    return (
        <div className={styles.root}>
            <Background className={styles.bg} />
            <Timer />
        </div>
    );
};

export default App;
