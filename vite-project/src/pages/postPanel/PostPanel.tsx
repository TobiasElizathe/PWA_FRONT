import "./PostPanel.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";

type PostFormData = {
  title: string;
  content: string;
};

const schema = Joi.object<PostFormData>({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

export const PostPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<PostFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const userStored = localStorage.getItem("user");
  const userRegistered = userStored ? JSON.parse(userStored) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${id}`);
        setPostInfo(res.data.data);
      } catch (err) {
        setFetchError(
          err instanceof Error ? err : new Error("Failed to load post")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (postInfo) {
      reset({
        title: postInfo.title,
        content: postInfo.content,
      });
    }
  }, [postInfo, reset]);

  const saveChanges = async (values: PostFormData) => {
    if (!userRegistered) return;

    const sendData = {
      title: values.title,
      content: values.content,
      author: userRegistered._id,
    };

    try {
      const response = await axiosInstance.put(`/posts/${id}`, sendData);
      console.log("Post modified:", response.data);
      navigate("/posts");
    } catch (err) {
      console.error("Error modifying post:", err);
    }
  };

  return (
    <section className="panel-section">
      <TitleHeader
        title="Post dashboard"
        subtitle="Edit and manage your selected post"
      />

      <div className="panel-box">
        {loading ? (
          <p>Loading post...</p>
        ) : fetchError ? (
          <p>Error: {fetchError.message}</p>
        ) : (
          <form onSubmit={handleSubmit(saveChanges)}>
            <input
              {...register("title")}
              className="panel-input"
              placeholder="Change title"
            />
            {errors.title && <span>{errors.title.message}</span>}

            <textarea
              {...register("content")}
              className="panel-textarea"
              placeholder="Change post content..."
              rows={6}
            />
            {errors.content && <span>{errors.content.message}</span>}

            <button
              type="submit"
              className={!userRegistered ? "panel-btn--disabled" : "panel-btn"}
              disabled={!userRegistered}
            >
              {!userRegistered ? "User not registered" : "Modify post"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
