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
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="alert alert-danger">Error in the registration form</div>
            )}
            
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email address
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

            <button type="submit" className="btn btn-success">
                Login
            </button>

        </form>
    </PageLayout>
  )
}

export default Login;