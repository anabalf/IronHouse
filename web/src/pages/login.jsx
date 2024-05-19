import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth.context";
import PageLayout from "../components/ui/page-layout/page-layout";

function Login() {
    const navigate = useNavigate();
    const { doLogin } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const [error, setError] = useState();

    async function onSubmit(data) {
        try {
            await doLogin(data);
            setError(false);
            navigate("/")
        } catch (err) { 
            setError(true)
        }
    }
    

  return (
    <PageLayout>
        <div className="d-flex justify-content-center align-items-center py-4">
            <div className="card p-4 bg-body-tertiary m-auto w-100" style={{ maxWidth: "330px" }}>
                <img src="/icon.svg" alt="Logo" className="mb-4 mx-auto d-block" style={{ maxHeight: "100px" }} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                    {error && (
                        <div className="alert alert-danger">Error in the registration form</div>
                    )}
                    
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                        required
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email")}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                        required
                        id="password"
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        {...register("password")}
                        />
                    </div>

                    <button type="submit" className="btn btn-info text-white w-100 py-2">
                        Login
                    </button>

                </form>
            </div>
        </div>
    </PageLayout>
  )
}

export default Login;