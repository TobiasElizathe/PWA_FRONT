import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";

type FormValues = { username: string; email: string };

const schema = Joi.object<FormValues>({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
  }),
});

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: joiResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axiosInstance.post("/users", data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      navigate("/posts");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <section className="signup-wrap">
      <h1 className="signup-title">Register a new user</h1>

      <form className="signup-grid" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>User name</span>
          <input
            {...register("username")}
            placeholder="Enter username"
            aria-invalid={!!errors.username}
          />
          {errors.username && <em>{errors.username.message}</em>}
        </label>

        <label>
          <span>E‑mail</span>
          <input
            {...register("email")}
            placeholder="Enter email"
            aria-invalid={!!errors.email}
            type="email"
          />
          {errors.email && <em>{errors.email.message}</em>}
        </label>

        <button>Create user</button>
      </form>

      <p className="signup-alt">
        <Link to="/posts" onClick={() => localStorage.removeItem("user")}>
          Continue without registering
        </Link>
      </p>
    </section>
  );
};
