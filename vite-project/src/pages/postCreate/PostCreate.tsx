import "./PostCreate.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useState } from "react";

type FormInputs = {
  title: string;
  content: string;
};

const schema = Joi.object<FormInputs>({
  title: Joi.string().required().messages({
    "string.empty": "El título es obligatorio",
  }),
  content: Joi.string().required().messages({
    "string.empty": "El contenido no puede estar vacío",
  }),
});

export const PostCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: joiResolver(schema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userData = localStorage.getItem("user");
  const currentUser = userData ? JSON.parse(userData) : null;
  const canSubmit = !!currentUser;

  const createPost = async (values: FormInputs) => {
    if (!currentUser) return;
    setLoading(true);
    setError(null);

    const payload = {
      author: currentUser,
      title: values.title,
      content: values.content,
    };

    try {
      const response = await axiosInstance.post("/posts", payload);
      console.log("Post created: ", response.data);
      navigate("/posts");
    } catch (err) {
      setError("Error al crear el post, intenta nuevamente.");
      console.error("Error creating post: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="post-create-wrapper">
      <TitleHeader
        title="Nuevo Post"
        subtitle="Completá los campos para publicar"
      />

      <div className="post-create-form">
        <form onSubmit={handleSubmit(createPost)}>
          <input
            type="text"
            placeholder="Título del post"
            {...register("title")}
            className="input-field"
          />
          {errors.title && (
            <span className="error-msg">{errors.title.message}</span>
          )}

          <textarea
            placeholder="Escribí el contenido..."
            rows={6}
            {...register("content")}
            className="textarea-field"
          />
          {errors.content && (
            <span className="error-msg">{errors.content.message}</span>
          )}

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className={canSubmit ? "btn-primary" : "btn-disabled"}
          >
            {loading ? "Publicando..." : canSubmit ? "Publicar" : "Debe iniciar sesión"}
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </section>
  );
};
