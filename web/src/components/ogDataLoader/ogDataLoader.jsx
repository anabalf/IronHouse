import { useState, useEffect } from 'react';

async function fetchOGData(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        
        const ogTitle = doc.querySelector('meta[property="og:title"]');
        const ogDescription = doc.querySelector('meta[property="og:description"]');
        const ogImage = doc.querySelector('meta[property="og:image"]');

        return {
            title: ogTitle ? ogTitle.getAttribute('content') : '',
            description: ogDescription ? ogDescription.getAttribute('content') : '',
            image: ogImage ? ogImage.getAttribute('content') : ''
        };
    } catch (error) {
        console.error('Error fetching OG data:', error);
        return null;
    }
}

function OGDataLoader({ url }) {
    const [ogData, setOGData] = useState(null);

    useEffect(() => {
        fetchOGData(url).then(data => {
            if (data) {
                setOGData(data);
            }
        });
    }, [url]);

    if (!ogData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{ogData.title}</h2>
            <p>{ogData.description}</p>
            {ogData.image && <img src={ogData.image} alt="OG Image" />}
        </div>
    );
}

export default OGDataLoader;
