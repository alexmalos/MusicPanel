import React from "react";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

export default ({ user }) => {
    const pathname = useLocation().pathname;

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/users/${user.id}${pathEnd}/?$`);
        return regexPath.test(pathname);
    };

    return (
        <div className="user-collection-tab-bar">
            <div className="user-info">
                <Link to={`/users/${user.id}`} className='profile-button'>
                    <PersonIcon />
                </Link>
                <Link to={`/users/${user.id}`} className='user-username'>{user.username}</Link>
            </div>
            <Link to={`/users/${user.id}/reviews`}
                className={atPath('/reviews') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Reviews</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/lists`}
                className={atPath('/lists') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Lists</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/history`}
                className={atPath('/history') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>History</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/albums`}
                className={atPath('/albums') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Albums</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/artists`}
                className={atPath('/artists') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Artists</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/tracks`}
                className={atPath('/tracks') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Tracks</h6>
                <div className='active-div'></div>
            </Link>
            <Link to={`/users/${user.id}/pinned`}
                className={atPath('/pinned') ? 'tab-link active' : 'tab-link'}>
                <div></div>
                <h6>Pinned</h6>
                <div className='active-div'></div>
            </Link>
        </div>
    );
};
