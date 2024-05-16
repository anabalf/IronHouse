import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProperty } from "../../../services/api.services";
import { useNavigate } from "react-router-dom";

function CreateProperty() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const [error, setError] = useState();

    async function onSubmit(data) {
        try {
            setError(false);
            
            await createProperty({
                ...data
            });
            navigate("/properties");
        } catch (err) { 
            setError(true);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="alert alert-danger">Error creating the property</div>
            )}
            
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    required
                    id="title"       
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    {...register("title")}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    required
                    id="description"
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    {...register("description")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                    Address
                </label>
                <textarea
                    required
                    id="address"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    {...register("address")}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    required
                    id="price"
                    type="number"
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    {...register("price")}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="coverUrl" className="form-label">
                    Images
                </label>
                <input
                    required
                    id="coverUrl"
                    type="text"
                    className={`form-control ${errors.coverUrl ? "is-invalid" : ""}`}
                    {...register("coverUrl")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="m2" className="form-label">
                    M2
                </label>
                <input
                    required
                    id="m2"
                    type="number"
                    className={`form-control ${errors.m2 ? "is-invalid" : ""}`}
                    {...register("m2")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numberOfRooms" className="form-label">
                    Number of Rooms
                </label>
                <input
                    required
                    id="numberOfRooms"
                    type="number"
                    className={`form-control ${errors.numberOfRooms ? "is-invalid" : ""}`}
                    {...register("numberOfRooms")}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="orientation" className="form-label">
                    Orientation
                </label>
                <select required id="orientation" className={`form-select ${errors.orientation ? "is-invalid" : ""}`} {...register("orientation")}> 
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="northeast">Northeast</option>
                    <option value="southeast">Southeast</option>
                    <option value="northwest">Northwest</option>
                    <option value="southwest">Sothwest</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="restored" className="form-label">Restored</label>
                <input type="checkbox" className="form-check-input" {...register("restored")} />
            </div>
            <div className="mb-3">
                <label htmlFor="visited" className="form-label">Visited</label>
                <input type="checkbox" className="form-check-input" {...register("visited")} />
            </div>
            <div className="mb-3">
                <label htmlFor="source" className="form-label">
                    Source
                </label>
                <input
                    required
                    id="source"
                    type="text"
                    className={`form-control ${errors.source ? "is-invalid" : ""}`}
                    {...register("source")}
                />
            </div>

            <button type="submit" className="btn btn-success">
                Create Property
            </button>
        </form>
    );
}

export default CreateProperty;
