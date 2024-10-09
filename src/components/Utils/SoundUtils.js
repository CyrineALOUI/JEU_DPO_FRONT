import textAudio1 from '../../assets/TextAudio/text1.mp3';
import textAudio2 from '../../assets/TextAudio/text2.mp3';
import textAudio3 from '../../assets/TextAudio/text3.mp3';
import textAudio4 from '../../assets/TextAudio/text4.mp3';
import textAudio5 from '../../assets/TextAudio/text5.mp3';
import textAudio6 from '../../assets/TextAudio/text6.mp3';
import textAudio7 from '../../assets/TextAudio/text7.mp3';
import textAudio8 from '../../assets/TextAudio/text8.mp3';
import textAudio9 from '../../assets/TextAudio/text9.mp3';


/*Audio Player */
export const playClickSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
};

export const textAudios = {
    1: textAudio1,   /* Données Personnelles */
    2: textAudio2,   /* Données Sensibles */
    3: textAudio3,   /* Traitement des Données à caractère Personnel */
    4: textAudio4,   /* Personne Concernée */
    5: textAudio5,
    6: textAudio6,
    8: textAudio7,
    9: textAudio8,
    10: textAudio9
    
};
