import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default props => {
    useEffect(() => {
        const handleClick = e => {
            const optionPopup = document.getElementById('option-popup');
            if (!optionPopup.contains(e.target)) props.closeOptionPopup();
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', props.closeOptionPopup)

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', props.closeOptionPopup)
        };
    });

    return (
        <div id="option-popup" className='hidden'>
            <button className='dropdown-element dropdown-button'>
                <EditIcon />
                <span>Write review</span>
            </button>
            <button className='dropdown-element dropdown-button' onClick={props.logout}>
                <AccessTimeIcon />
                <span>Add to Listen Later</span>
            </button>
            <Link to='/' className='dropdown-element dropdown-link'>
                <MusicNoteIcon />
                <p>Read Reviews</p>
            </Link>
            <button className='dropdown-element dropdown-button' onClick={props.logout}>
                <PlaylistAddIcon />
                <span>Add track to a list</span>
            </button>
        </div>
    );
};