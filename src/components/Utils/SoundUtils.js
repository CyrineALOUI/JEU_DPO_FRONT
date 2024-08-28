
export const playClickSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
};
