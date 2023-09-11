export const secondsToTimeString = (seconds: number): string => {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = seconds - minutesLeft * 60;
    return `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
};
