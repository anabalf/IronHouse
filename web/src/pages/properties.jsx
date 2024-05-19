import PropertiesList from "../components/properties/properties-list/properties-list";
import PageLayout from "../components/ui/page-layout/page-layout";

function Properties() {
  return (
        <PageLayout>
            <h1 className="my-4">My properties</h1>
            <PropertiesList limit={10} page={0}/>
        </PageLayout>
  )
}

export default Properties;