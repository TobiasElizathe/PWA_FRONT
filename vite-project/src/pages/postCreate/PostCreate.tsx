import "./PostCreate.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useState } from "react";

type FormData = { title: string; content: string };

const validation = Joi.object<FormData>({
  title:   Joi.string().required().messages({ "string.empty": "El título es obligatorio" }),
  content: Joi.string().required().messages({ "string.empty": "El contenido no puede estar vacío" }),
});

export const PostCreate = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: joiResolver(validation) });

 
  const [serverErr, setServerErr] = useState<string | null>(null);
  const navigate = useNavigate();


  const logged = JSON.parse(localStorage.getItem("user") || "null");
  const canSubmit = Boolean(logged);

  /* submit */
  const onSubmit = async (values: FormData) => {
    if (!logged) return;
    setServerErr(null);

    try {
      await axiosInstance.post("/posts", { ...values, author: logged });
      navigate("/posts");
    } catch (e) {
      console.error("Error creating post:", e);
      setServerErr("Error al crear el post, intenta nuevamente.");
    }
  };

  return (
    <section className="post-create-wrapper">
      <TitleHeader title="Nuevo Post" subtitle="Completá los campos para publicar" />

      <div className="post-create-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* título */}
          <input
            className="input-field"
            placeholder="Título del post"
            {...register("title")}
          />
          {errors.title && <span className="error-msg">{errors.title.message}</span>}

          {/* contenido */}
          <textarea
            rows={6}
            className="textarea-field"
            placeholder="Escribí el contenido..."
            {...register("content")}
          />
          {errors.content && <span className="error-msg">{errors.content.message}</span>}

          {/* botón */}
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={canSubmit ? "btn-primary" : "btn-disabled"}
          >
            {isSubmitting ? "Publicando…" : canSubmit ? "Publicar" : "Debe iniciar sesión"}
          </button>

          {/* error servidor */}
          {serverErr && <p className="error-msg">{serverErr}</p>}
        </form>
      </div>
    </section>
  );
};
