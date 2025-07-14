import "./Signup.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";

type FormValues = {
  username: string;
  email: string;
};

const schema = Joi.object<FormValues>({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Invalid email',
    'string.empty': 'Email is required',
  }),
});

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: joiResolver(schema) });


  const navigate = useNavigate();

const submitHandler = async (formData: FormValues) => {
  try {
    const res = await axiosInstance.post("http://localhost:5000/api/users", formData);
    const user = res.data;            // ← id, username, email
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/posts');
  } catch (err) {
    console.error(err);
    // podrías mostrar un toast o mensaje de error aquí
  }
};

  return (
    <section className="signup-wrap">
      <h2 className="signup-title">Create your account</h2>

      <form className="signup-grid" onSubmit={handleSubmit(submitHandler)}>
        <label>
          <span>User name</span>
          <input
            {...register('username')}
            placeholder="JohnDoe123"
            aria-invalid={!!errors.username}
          />
          {errors.username && <em>{errors.username.message}</em>}
        </label>

        <label>
          <span>E‑mail</span>
          <input
            {...register('email')}
            placeholder="john@example.com"
            aria-invalid={!!errors.email}
            type="email"
          />
          {errors.email && <em>{errors.email.message}</em>}
        </label>

        <button disabled={isSubmitting}>Register</button>
      </form>

      <p className="signup-alt">
        <Link to="/posts">Skip — continue as guest</Link>
      </p>
    </section>
  );
};