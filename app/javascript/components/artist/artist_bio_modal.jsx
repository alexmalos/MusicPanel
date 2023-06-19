import React from "react";

export default ({ artistBio, artistWikiPath }) => (
    <div id="artist-bio-content">
        {artistBio}
        <p className="wiki-text">Biography supplied via Wikipedia. <a
            href={`https://en.wikipedia.org/wiki/${artistWikiPath}`}
            target='_blank'>
                Continue reading here...
            </a>
        </p>
    </div>
);
