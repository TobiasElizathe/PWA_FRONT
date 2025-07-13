// src/pages/PostEdit.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  title: string;
  content: string;
};

export const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        const post = res.data.data;

        // Cargo valores en el formulario
        reset({
          title: post.title,
          content: post.content,
        });
      } catch (err) {
        setFetchError("Error al obtener el post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.put(`/posts/${id}`, data);
      navigate("/posts");
    } catch (err) {
      alert("Error al guardar cambios");
    }
  };

  if (loading) return <p>Cargando post...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <section className="post-wrapper">
      <h1>Editar post</h1>

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
            placeholder="Contenido del post"
            rows={6}
          />
          {errors.content && <em>{errors.content.message}</em>}
        </label>

        <button disabled={isSubmitting}>Guardar cambios</button>
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
