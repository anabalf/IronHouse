import PropertyForm from "../components/properties/property-form/property-form"
import PageLayout from "../components/ui/page-layout/page-layout";

function NewProperty() {
  return (
    <PageLayout>
      <h3 className="my-4">Upload a new property</h3>
        <PropertyForm />
    </PageLayout>
  )
}

export default NewProperty;