import { Link } from "react-router-dom";
import './property-item.css';

function PropertyItem({ property }) {
  return (
    <div className="card h-100 shadow-sm">
     <img src={property.coverUrl} className="property-image card-img-top" alt={property.name}/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">{property.title}</h5>
        <p className="card-text text-muted"><i className="fa fa-map-marker me-2"></i>{property.address}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <span className="price-text">{property.price.toLocaleString('es-ES')} € </span>
            <span className={`visited-text ${property.visited ? 'text-success' : 'text-muted'}`}>
              <i className={`fa ${property.visited ? 'fa-check-circle' : 'fa-times-circle'} me-1`}></i>
              {property.visited ? 'Visited' : 'Not Visited'}
            </span>
          </div>
          <Link to={`/properties/${property.id}`} className="stretched-link"></Link>
        </div>  
      </div>
    </div>
  )
}

export default PropertyItem;