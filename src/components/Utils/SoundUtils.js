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
    4: textAudio3,   /* Traitement des Données à caractère Personnel */
    6: textAudio4,   /* Personne Concernée */
    7: textAudio5,   /* Les principes de Traitement */
    8: textAudio6,   /* Intégrité et confidentialité des données */
    10: textAudio7,  /* Le consentement */
    11: textAudio8,  /* Le droit d’accès */
    12: textAudio9   /*Le droit d’opposition */   
};
