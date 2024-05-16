import { Link } from "react-router-dom";

function PropertyItem({ property }) {
  return (
    <div className="card h-100">
     <img src={property.coverUrl} className="card-img-top" alt={property.name}/>
      <div className="card-body">
        <h5 className="card-title mb-2">{property.title}</h5>
        <p className="card-text"><i className="fa fa-map-marker me-2"></i>{property.address}</p>
        <Link to={`/properties/${property.id}`} className="stretched-link"></Link>
      </div>
    </div>
  )
}

export default PropertyItem;