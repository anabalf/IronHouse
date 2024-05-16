import { useEffect, useRef } from "react";

function Map({ className }) {
    const mapRef = useRef();

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 40.433997, lng: -3.6932375 },
            zoom: 14
        });
        new window.google.maps.Marker({
            position: { lat: 40.433997, lng: -3.6932375 },
            map: googleMap,
            title: "house"
        })
    }, []);

  return (
    <div ref={mapRef} style={{width: '100%', height: '400px'}}></div>
  )
}

Map.defaultProps = {
    className: ''
  }

export default Map;