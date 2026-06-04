import musicOn from '../assets/musicoff.png';
import musicOff from '../assets/musicon.png';
import { useMusic } from '../pages/musicprovider';

const MusicButton = () => {
    const { playing, toggle } = useMusic();

    return (
        <button
            onClick={toggle}
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
                backgroundImage: `url(${playing ? musicOn : musicOff})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default MusicButton;