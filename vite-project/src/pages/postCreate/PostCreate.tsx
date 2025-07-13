// src/pages/PostCreate.tsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios";         

type FormValues = {
  title: string;
  content: string;
};

export const PostCreate = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  /*--- user from localStorage ---*/
  const stored = localStorage.getItem("user");
  const user   = stored ? JSON.parse(stored) : null;

  const onSubmit = async (data: FormValues) => {
    if (!user?._id) {
      alert("Debes registrarte para crear un post");
      return;
    }

    try {
      /*--- POST al backend ---*/
      await axiosInstance.post("/posts", {
        ...data,
        author: user._id,            // ← se envía el autor
      });

      navigate("/posts");           // ← redirige a la lista
    } catch (err) {
      console.error(err);
      alert("Error al crear el post");
    }
  };

  return (
    <section className="post-wrapper">
      <h1>Crear nuevo post</h1>

      {/* nombre del autor (solo lectura) */}
      {user?.username && (
        <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
          Publicando como <strong>{user.username}</strong>
        </p>
      )}

      <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Título</span>
          <input
            {...register("title", { required: "Título obligatorio" })}
            placeholder="Título del post"
          />
          {errors.title && <em>{errors.title.message}</em>}
        </label>

        <label>
          <span>Contenido</span>
          <textarea
            {...register("content", { required: "Contenido obligatorio" })}
            placeholder="Escribe aquí…"
            rows={6}
          />
          {errors.content && <em>{errors.content.message}</em>}
        </label>

        <button disabled={isSubmitting}>Publicar</button>
        <button
          type="button"
          onClick={() => navigate("/posts")}
          className="btn-secondary"
        >
          Cancelar
        </button>
      </form>
    </section>
  );
};
