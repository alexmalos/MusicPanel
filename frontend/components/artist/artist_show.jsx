import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import ArtistHome from './artist_home';
import ArtistDiscography from './artist_discography';
import parse from 'html-react-parser';
import ModalContainer from '../modal/modal_container';
import PageNotFound from '../page_not_found';

export default ({ artistId, path, loggedIn, openModal, fetchArtist, modalType }) => {
    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState(null);
    const [artistBio, setArtistBio] = useState(null);
    const [pageNotFound, setPageNotFound] = useState(false);

    const atPath = pathEnd => {
        const regexPath = new RegExp(`/artists/${artistId}${pathEnd}/?$`);
        return regexPath.test(path);
    };

    const artistBody = () => {
        if (atPath('')) return (
            <ArtistHome
                albums={albums.slice(0, 8)}
                artist={artist}
                openLoginModal={() => openModal('login')}
                loggedIn={loggedIn}
            />
        );
        else if (atPath('releases')) return (
            <ArtistDiscography
                albums={albums}
                artist={artist}
                loggedIn={loggedIn}
            />
        );
        else return null;
    }

    useEffect(() => {
        setArtist(null);
        setAlbums(null);
        setArtistBio(null);
        setPageNotFound(false);

        fetchArtist(artistId)
            .then(({ artist, albums }) => {
                setArtist(artist);

                const processedAlbums = albums.map(album => {
                    Object.freeze(album);
                    const releaseDate = new Date(album.releaseDate.split('-'))
                    return Object.assign({}, album, { releaseDate });
                });
        
                processedAlbums.sort((a, b) => {
                    if (a.releaseDate < b.releaseDate) return 1;
                    else return -1;
                });

                setAlbums(processedAlbums);
            }, () => setPageNotFound(true));
    }, [artistId]);

    useEffect(() => {
        if (artist && artist.wikiPath) {
            $.ajax({
                url: `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&origin=*&titles=${artist.wikiPath}`,
                method: 'GET'
            }).then(response => {
                const bioString = Object.values(response.query.pages)[0].extract;
                const bioElements = parse(bioString).filter(el => el.props && el.props.className !== 'mw-empty-elt');
                setArtistBio(bioElements);
            });
        }
    }, [artist]);
 
    if (pageNotFound) return <PageNotFound />;
    else if (artist && albums) return (
        <div>
            <div className='music-header'>
                <div className='header-content'>
                    <div className='background-div'>
                        <div className='inner-background-div'>
                            <img src={artist.smallBackgroundUrl} alt=""
                            className='small-background-image'/>
                            <img src={artist.backgroundUrl} alt="" />
                            <div className='background-overlay'></div>
                        </div>
                    </div>
                    <div className='header-info'>
                        <div className='music-div'>
                            <div className='artist-photo-div'>
                                <img src={artist.photoUrl} alt=""/>
                                <div id="photo-border"></div>
                            </div>
                            <div className='music-info'>
                                <h1>{artist.name}</h1>
                                {
                                    artistBio ?
                                        <div className='artist-bio-div'>
                                            {artistBio}
                                            <div className='artist-bio-fade'></div>
                                            <button onClick={() => openModal('artistBio', true)}>
                                                Read more...
                                            </button>
                                        </div> : null
                                }
                            </div>
                        </div>
                        <div className='rating-div'>
                            <div className='rating-info'>
                                <div className='info-div'>
                                    <div className='inner-info-div'>
                                        <h3>0</h3>
                                        <p>Total ratings</p>
                                    </div>
                                </div>
                                <div className='info-div'>
                                    <div className='divider'></div>
                                    <div className='inner-info-div'>
                                        <div className='star-div'>
                                            <StarIcon />
                                            <h3>0
                                                <span> / 5</span>
                                            </h3>
                                        </div>
                                        <p>Average rating</p>
                                    </div>
                                </div>
                                <div className='info-div'>
                                    <div className='divider'></div>
                                    <div className='inner-info-div'>
                                        <div className='star-div'>
                                            <StarIcon />
                                            <h3>0
                                                <span> / 5</span>
                                            </h3>
                                        </div>
                                        <p>Your rating</p>
                                    </div>
                                </div>
                            </div>
                            {
                                loggedIn ?
                                    <button>
                                        <StarIcon />
                                        Rate Artist
                                    </button> :
                                    <button onClick={() => openModal('login')}>
                                        <LockIcon />
                                        Sign in to rate this artist
                                    </button>
                            }
                        </div>
                    </div>
                </div>
                <div className='header-tabs'>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}`}
                            className={atPath('') ? '' : 'inactive'}>
                            Home
                        </Link>
                        <div className={atPath('') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}/reviews`}
                            className={atPath('/reviews') ? '' : 'inactive'}>
                            Reviews
                        </Link>
                        <div className={atPath('/reviews') ? 'active' : '' }></div>
                    </div>
                    <div className='tab-div'>
                        <Link to={`/artists/${artistId}/releases`}
                            className={atPath('/releases') ? '' : 'inactive'}>
                            Discography
                        </Link>
                        <div className={atPath('/releases') ? 'active' : '' }></div>
                    </div>
                </div>
            </div>
            {artistBody()}
            {
                (modalType === 'artistBio') ?
                <ModalContainer
                    artistBio={artistBio}
                    artistName={artist.name}
                    artistWikiPath={artist.wikiPath}
                /> : null
            }
        </div>
    );
    else return null;
};
