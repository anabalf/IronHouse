import PropertiesList from "../components/properties/properties-list/properties-list";
import PageLayout from "../components/ui/page-layout/page-layout";
import { Link } from "react-router-dom";
import Map from "../components/google/map/map";

function Home() {
  return (
    <PageLayout>
        <div className="row">
            <div className="col-md-8">
                <h1 className="mb-4">Welcome back to IronHouse!</h1>
                <p className="lead">Check out your latest saved properties and discover new opportunities.</p>
                <PropertiesList visited="true" limit={5}/> {/*  añadir property para incluir solo los más nuevos.. */}
                <Link to="/properties" className="btn btn-primary mt-3">View all your properties</Link>
            </div>
            <div className="col-md-4">
                <Map className="mx-0"/>
            </div>
        </div>
    </PageLayout>
  )
}

export default Home;