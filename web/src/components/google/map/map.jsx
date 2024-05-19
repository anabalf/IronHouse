import { useEffect, useRef } from "react";

function Map({ className, center, markers }) {
    const mapRef = useRef();

    useEffect(() => {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 14
      });
      if (markers) {
        markers.forEach(({ lat, lng, title }) => {
          new window.google.maps.Marker({
            position: { lat, lng },
            map: googleMap,
            title
          })
        });
      }
    }, [center, markers]);
  

  return (
    <div ref={mapRef} style={{width: '100%', height: '450px'}} className={className}></div>
  )
}

Map.defaultProps = {
    className: '',
  }

export default Map;