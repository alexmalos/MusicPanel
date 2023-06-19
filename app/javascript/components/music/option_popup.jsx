import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AlbumIcon from '@mui/icons-material/Album';

export default ({ closeOptionPopup, optionType, musicLink }) => {
    useEffect(() => {
        const handleClick = e => {
            const optionPopup = document.getElementById('option-popup');
            if (!optionPopup || !optionPopup.contains(e.target)) closeOptionPopup();
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', closeOptionPopup)

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', closeOptionPopup)
        };
    });

    const musicButton = () => {
        switch (optionType) {
            case 'track':
                return (
                    <Link to={musicLink} className='dropdown-element dropdown-link'>
                        <MusicNoteIcon />
                        <p>Read reviews</p>
                    </Link>
                );
            case 'album':
                return (
                    <Link to={musicLink} className='dropdown-element dropdown-link'>
                        <AlbumIcon />
                        <p>Go to album</p>
                    </Link>
                );
            default:
                break;
        }
    };

    return (
        <div id="option-popup" className='hidden'>
            <button className='dropdown-element dropdown-button'>
                <EditIcon />
                <span>Write review</span>
            </button>
            <button className='dropdown-element dropdown-button'>
                <AccessTimeIcon />
                <span>Add to Listen Later</span>
            </button>
            {musicButton()}
            <button className='dropdown-element dropdown-button'>
                <PlaylistAddIcon />
                <span>Add {optionType} to a list</span>
            </button>
        </div>
    );
};
