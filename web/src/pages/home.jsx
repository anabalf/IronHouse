import { useState } from "react";
import PropertiesList from "../components/properties/properties-list/properties-list";
import PageLayout from "../components/ui/page-layout/page-layout";
import { Link } from "react-router-dom";
import Map from "../components/google/map/map";

function Home() {
  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateProperties = (newProperties) => {
    setProperties(newProperties);
    setIsLoaded(true);
  };

  const markers = properties.map(property => ({
    lat: property.location[0],
    lng: property.location[1],
    title: property.title,
  }));

  return (
    <PageLayout>
      <h1 className="my-4">Welcome back to IronHouse!</h1>
      
      <div className="row">
        <div className="col-md-8">
          <p className="lead">Check out your latest saved properties and discover new opportunities</p>
          <PropertiesList visited="true" limit={5} onUpdateProperties={updateProperties}/> {/*  añadir property para incluir solo los más nuevos.. */}
          <div className="d-flex justify-content-center">
            <Link to="/properties" className="btn btn-info mt-3 text-white">View all your properties</Link>
          </div>
        </div>
        
        <div className="col-md-4">
          {isLoaded && markers.length > 0 && (
            <Map
                center={markers[0]}
                markers={markers}
                className="property-map"
              />
          )}
        </div>

      </div>
    </PageLayout>
  )
}

export default Home;