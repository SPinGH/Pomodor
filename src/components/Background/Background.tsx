import { FC, useRef, useEffect } from 'react';
import classNames from 'classnames';

import styles from './Background.module.css';
import { LAYERS } from './layers';

interface BackgroundProps {
    className?: string;
}

const MAX_DELTA_X = 100;
const MAX_DELTA_Y = 50;
const CONTAINER_STYLE = {
    left: `-${MAX_DELTA_X}px`,
    top: `-${MAX_DELTA_Y}px`,
    width: `calc(100% + ${MAX_DELTA_X * 2}px)`,
    height: `calc(100% + ${MAX_DELTA_Y * 2}px)`,
};

const Background: FC<BackgroundProps> = ({ className }) => {
    const layers = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            const posX = event.clientX;
            const posY = event.clientY;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            layers.current.forEach((image, index) => {
                if (image) {
                    const deltaX =
                        ((posX - centerX) / window.innerWidth) * MAX_DELTA_X * (index / layers.current.length);
                    const deltaY =
                        ((posY - centerY) / window.innerHeight) * MAX_DELTA_Y * (index / layers.current.length);

                    image.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                }
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    const classes = classNames(className, styles.root);

    return (
        <div className={classes}>
            <div className={styles.container} style={CONTAINER_STYLE}>
                {LAYERS.map((img, index) => (
                    <img
                        key={index}
                        ref={(element) => (layers.current[index] = element)}
                        src={img}
                        alt={`forest layer ${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background;
