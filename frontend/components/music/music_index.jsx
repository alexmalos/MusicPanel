import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default props => {
    const [loaded, setLoaded] = useState(false);
    const { musicType, entities } = props;

    useEffect(() => {
        switch (musicType) {
            case 'artists':
                props.fetchArtists().then(() => setLoaded(true));
                break;
            case 'albums':
                props.fetchAlbums().then(() => setLoaded(true));
                break;
            case 'tracks':
                props.fetchTracks().then(() => setLoaded(true));
                break;
            default:
                break;
        }
    }, [musicType]);

    const musicItem = (item, idx) => {
        switch (musicType) {
            case 'artists':
                return (
                    <div className="music-item-div" key={idx}>
                        <div className='artist-image-div'>
                            <Link to={`/artists/${item.id}`} className='artist-image-link'>
                                <img src={item.photoUrl} alt="" />
                                <div className='link-border'></div>
                            </Link>
                        </div>
                        <Link className='item-link' to={`/artists/${item.id}`}>{item.name}</Link>
                    </div>
                );
            case 'albums':
                return (
                    <div className="music-item-div" key={idx}>
                        <Link className='album-cover-link' to={`/albums/${item.id}`}>
                            <img src={item.coverUrl} alt="" />
                            <div className='album-cover-border'></div>
                        </Link>
                        <Link className="item-link" to={`/albums/${item.id}`}>{item.title}</Link>
                        <Link className="artist-name" to={`/artists/${item.artistId}`}>{entities.artists[item.artistId].name}</Link>
                    </div>
                );
            case 'tracks':
                return (
                    <div className="music-item-div" key={idx}>
                        <Link className='album-cover-link' to={`/albums/${item.albumId}`}>
                            <img src={entities.albums[item.albumId].coverUrl} alt="" />
                            <div className='album-cover-border'></div>
                        </Link>
                        <Link className="item-link" to={`/tracks/${item.id}/reviews`}>{item.title}</Link>
                        <Link className="artist-name" to={`/artists/${item.artistId}`}>{entities.artists[item.artistId].name}</Link>
                    </div>
                );
            default:
                break;
        }
    };

    if (loaded) return (
        <div className='music-index-body'>
            <div className='left-body-div'>
                <h4>All {musicType[0].toUpperCase() + musicType.slice(1)}</h4>
                <div className="music-index-grid">
                    {Object.values(props.entities[musicType]).sort((a, b) => b.averageRating - a.averageRating).map((item, idx) => musicItem(item, idx))}
                </div>
            </div>
            <div className='right-body-div'>
                <div className="filter-div">
                    {/* <h4>Filters</h4> */}
                </div>
            </div>
        </div>
    );
};