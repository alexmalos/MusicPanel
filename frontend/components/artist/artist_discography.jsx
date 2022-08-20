import React from "react";
import DiscographyGrid from "./discography_grid";

export default ({ albums, artist, loggedIn }) => {
    const nonSingles = albums.filter(album => album.albumType !== 'Single');

    const singles = albums.filter(album => album.albumType === 'Single');

    return (
        <div className="artist-body artist-discography">
            {
                nonSingles.length > 0 ?
                    <div className="discography-albums">
                        <h4>Albums by {artist.name}</h4>
                        <DiscographyGrid albums={nonSingles} loggedIn={loggedIn}/>
                    </div> : null
            }
            {
                singles.length > 0 ?
                    <div className="discography-albums">
                        <h4 className="singles-heading">Singles by {artist.name}</h4>
                        <DiscographyGrid albums={singles} loggedIn={loggedIn}/>
                    </div> : null
            }
        </div>
    );
};
