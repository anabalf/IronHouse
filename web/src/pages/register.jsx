import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../services/api.services";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/ui/page-layout/page-layout";
import registerBackground from "../assets/images/background1.jpg";

function Register() {
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
            
            await createUser({
                ...data
            });
            navigate("/login")
        } catch (err) { 
            setError(true)
        }
        }
    

  return (
    <PageLayout backgroundImage={registerBackground}>
        <div className="d-flex justify-content-center align-items-center py-4">
            <div className="card p-4 my-4 bg-body-tertiary m-auto w-100" style={{ maxWidth: "550px" }}>
                <div className="py-2 text-center">
                    <img src="/icon.svg" alt="Logo" className="mb-4 mx-auto d-block" style={{ maxHeight: "100px" }} />
                    <h2>Register in IronHouse</h2>
                    <p>A perfect app to follow up on your properties...</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                    {error && (
                        <div className="alert alert-danger">Error in the registration form</div>
                    )}
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input required
                        id="name"       
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name")}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                        required
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email")}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                        id="username"
                        type="text"
                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                        {...register("username")}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                        required
                        id="password"
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        {...register("password")}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="birthDate" className="form-label">Birth Date</label>
                        <input
                        required
                        id="birthDate"
                        type="date"
                        className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                        {...register("birthDate")}
                        />
                    </div>
                
                    <div className="text-center">
                        <button type="submit" className="btn btn-info text-white py-2 w-100">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </PageLayout>
  )
}

export default Register;