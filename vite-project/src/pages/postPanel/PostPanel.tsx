import './PostPanel.css';
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axiosInstance from "../../config/axios";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";

type ModifyPostFormInputs = {
  title: string;
  content: string;
};

const validationsSchema = Joi.object<ModifyPostFormInputs>({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModifyPostFormInputs>({
    resolver: joiResolver(validationsSchema),
  });

  const onSubmit = async (data: ModifyPostFormInputs) => {
    const sendData = {
      title: data.title,
      content: data.content,
    };
    try {
      const response = await axiosInstance.patch(
        `/posts/update/${id}`,
        sendData
      );

      console.log("Post modified: ", response.data);
      navigate("/posts");
    } catch (error) {
      console.error("Error modifing post: ", error);
    }
  };

  return (
    <section className="post-dashboard">
      <TitleHeader
        title="Post Panel"
        subtitle="Edit and manage your selected post"
      />
      <div className="post-dashboard-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            className="text-input"
            placeholder="Change title"
          />
          {errors.title && <span>{errors.title.message}</span>}

          <textarea
            {...register("content")}
            className="text-area"
            placeholder="Change post content..."
            rows={6}
          />

          {errors.content && <span>{errors.content.message}</span>}

          <button type="submit" className="submit-button">
            Modify post
          </button>
        </form>
      </div>
    </section>
  );
};
