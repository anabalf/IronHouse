import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from '../services/api.services';
import { useNavigate } from 'react-router-dom';
import PageLayout from "../components/ui/page-layout/page-layout";


function Property() {
    const { id } = useParams();
    const [property, setProperty] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
          try {
            const { data } = await getProperty(id);
            setProperty(data);
          } catch (error) {
            if (error.response?.status == 404) {
                navigate('/'); //podemos llevarlo a una pag de error
            }
          }
        }
        fetch();
      }, [id]);

  return property && (
    <PageLayout>
        <h3 >{property.title}</h3>
        <h5>{property.description}</h5>
        <p><i className="fa fa-map-marker me-2"/>{property.address}</p>
        <div>{property.price} €</div>
        <div>{property.m2} m2</div>
        <div>{property.numberOfRooms} hab</div>
        <div>Orientation: {property.orientation}</div>
        <img src={property.coverUrl} className="card-img-top" alt={property.name}/>
    </PageLayout>

  )
}

export default Property;