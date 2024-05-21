import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from '../services/api.services';
import { useNavigate } from 'react-router-dom';
//import OGDataLoader from '../components/ogDataLoader/ogDataLoader';
import PageLayout from "../components/ui/page-layout/page-layout";
import Map from "../components/google/map/map";


function Property() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
          try {
            const { data } = await getProperty(id);
            setProperty(data);
            console.log(data)
          } catch (error) {
            if (error.response?.status == 404) {
                navigate('/'); //podemos llevarlo a una pag de error
            }
          }
        }
        fetch();
      }, [id, navigate]);

      

  return (
    <PageLayout>
        { property && (
          <>

          <h3 className="my-4">{property.title}</h3>
          <div className="row">
            <div className="col-md-8">
                <h5>{property.description}</h5>
                <p><i className="fa fa-map-marker me-2"/>{property.address}</p>
                <div><strong>Price: </strong>{property.price.toLocaleString('es-ES')} €</div>
                <div><strong>Area: </strong>{property.m2} m2</div>
                <div><strong>Number of Rooms: </strong>{property.numberOfRooms} hab</div>
                <div><strong>Orientation: </strong> {property.orientation}</div>
                <p><strong>Restored:</strong> {property.restored ? "Yes" : "No"}</p>
                <p><strong>Visited:</strong> {property.visited ? "Yes" : "No"}</p>
                <p><strong>Tags:</strong> {property.tags.join(", ")}</p>
                <p><strong>Source:</strong> {property.source}</p>
                <p><strong>Link: </strong>{property.webUrl}</p>

            </div>
            <div className="col-md-4">
                <img src={property.coverUrl} className="card-img-top" alt={property.name}/>
            </div> 
        </div>
        <Map
          center={{ lat: property.location[0], lng: property.location[1] }}
          markers={[{ lat: property.location[0], lng: property.location[1], title: property.title }]}
          className="mb-4"  
        />
        </>
        )}
    </PageLayout>

  )
}

export default Property;