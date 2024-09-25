import textAudio1 from '../../assets/TextAudio/text1.mp3';

export const playClickSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
};

export const textAudios = {
    1: textAudio1
};
