import { useEffect, useState } from "react";
import { getProperties } from "../../../services/api.services";
import PropertyItem from "../property-item/property-item";

function PropertiesList({ visited, limit, page, onUpdateProperties }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const query = {};
        if (visited) query.visited  = visited;
        if (limit) query.limit = limit;
        if (page) query.page = page;

        const { data: properties } = await getProperties(query);
        setProperties(properties);
        onUpdateProperties(properties);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [visited, limit, page]);

  return (
    <>
    <div className="row row-columns-3">
        {properties.map((property) => (
        <div key={property.id} className="col"><PropertyItem property = {property}/></div>
        ))}
   </div>
   </>
  )
}

PropertiesList.defaultProps = {
  onUpdateProperties: () => {}
}

export default PropertiesList;