import { useForm, Controller } from "react-hook-form";
import { createProperty } from "../../../services/api.services";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../../google/autocomplete/autocomplete-input";

function CreateProperty({ className }) {
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({ mode: 'all' });
    

    const handlePropertySubmit = async (property) => {
        const data = new FormData();
        data.append("title", property.title);
        data.append("description", property.description);
        data.append("webUrl", property.webUrl);
        data.append("price", property.price);
        data.append("m2", property.m2);
        data.append("numberOfRooms", property.numberOfRooms);
        data.append("orientation", property.orientation);
        data.append("restored", property.restored);
        data.append("visited", property.visited);
        data.append("source", property.source);
        data.append("address", property.location.address);
        data.append("location[type]", "Point");
        data.append("location[coordinates][]", property.location.lng);
        data.append("location[coordinates][]", property.location.lat);
        data.append("tags", property.tags);
        data.append("coverUrl", property.coverUrl[0]);

        try {
            const res = await createProperty(data);
            navigate(`/properties/${res.data.id}`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className={className} onSubmit={handleSubmit(handlePropertySubmit)}>
            
            {/* TITLE */}
            <div className="mb-2">
                <label className="form-label">Title</label>
                <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} {...register("title", { required: 'Title is required' })} />
                {errors.title && (<div className='invalid-feedback'>{errors.title.message}</div>)}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-2">
                <label className="form-label">Description</label>
                <textarea className={`form-control ${errors.description ? "is-invalid" : ""}`} {...register("description", { required: 'Description is required' })} />
                {errors.description && (<div className='invalid-feedback'>{errors.description.message}</div>)}
            </div>

            {/* PRICE */}
            <div className="mb-2">
                <label className="form-label">Price</label>
                <input type="number" className={`form-control ${errors.price ? "is-invalid" : ""}`} {...register("price", { required: 'Price is required' } )} />
                {errors.price && (<div className='invalid-feedback'>{errors.price.message}</div>)}
            </div>
            
            {/* COVER IMAGE */}
            <div className="mb-2">
                <label className="form-label">Cover Image</label>
                <input type="file" className={`form-control ${errors.coverUrl ? "is-invalid" : ""}`} {...register("coverUrl", { required: 'Cover image is required' })} />
                {errors.coverUrl && (<div className='invalid-feedback'>{errors.coverUrl.message}</div>)}
            </div>

            {/* M2 */}
            <div className="mb-2">
                <label className="form-label">M2</label>
                <input type="number" className={`form-control ${errors.m2 ? "is-invalid" : ""}`} {...register("m2", { required: 'M2 is required' })} />
                {errors.m2 && (<div className='invalid-feedback'>{errors.m2.message}</div>)}
            </div>

            {/* ROOMS */}
            <div className="mb-2">
                <label className="form-label">Number of Rooms</label>
                <input type="number" className={`form-control ${errors.numberOfRooms ? "is-invalid" : ""}`} {...register("numberOfRooms", { required: 'Number of rooms is required' })} />
                {errors.numberOfRooms && (<div className='invalid-feedback'>{errors.numberOfRooms.message}</div>)}
            </div>

            {/* ORIENTATION */}
            <div className="mb-2">
                <label className="form-label">Orientation</label>
                <select className={`form-select ${errors.orientation ? "is-invalid" : ""}`} {...register("orientation")}> 
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="northeast">Northeast</option>
                    <option value="southeast">Southeast</option>
                    <option value="northwest">Northwest</option>
                    <option value="southwest">Southwest</option>
                </select>
            </div>

            {/* LOCATION */}
            <label className="form-label">Location</label>
            <Controller
                control={control}
                name='location'
                rule={{
                    required: 'Location is required'
                }}
                render={({ field: { onChange, onBlur } }) => (
                    <AutocompleteInput className="mb-1" error={errors.location?.message} onPlaceChange={onChange} onBlur={onBlur} />
                )}
            />

            {/* RESTORED */}
            <div className="my-2">
                <label className="form-label mx-2">Restored</label>
                <input type="checkbox" className="form-check-input" {...register("restored")} />
            </div>
            
            {/* VISITED */}
            <div className="mb-2">
                <label className="form-label mx-2">Visited</label>
                <input type="checkbox" className="form-check-input" {...register("visited")} />
            </div>

            {/* TAGS */}
            <div className="mb-2">
                <label className="form-label">Tags</label>
                <textarea className={`form-control ${errors.tags ? "is-invalid" : ""}`} {...register("tags", {
                    setValueAs: (value) => value.split(',').map(tag => tag.trim())
                })} />
            </div>

            {/* SOURCE */}
            <div className="mb-2">
                <label className="form-label">Source</label>
                <input type="text" className={`form-control ${errors.source ? "is-invalid" : ""}`} {...register("source", { required: 'Source is required' })} />
                {errors.source && (<div className='invalid-feedback'>{errors.source.message}</div>)}
            </div>

            {/* WEB LINK */}
            <div className="mb-2">
                <label className="form-label">WEB Url</label>
                <input type="url" className={`form-control ${errors.webUrl ? "is-invalid" : ""}`} {...register("webUrl")}/>
                {errors.webUrl && (<div className='invalid-feedback'>{errors.webUrl.message}</div>)}
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-info text-white my-4 w-50" disabled={!isValid}>
                    Create Property
                </button>
            </div>

        </form>
    );
}

export default CreateProperty;
