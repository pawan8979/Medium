import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title. ").min(10).max(24),
    description: yup
      .string()
      .required("You must add a description. ")
      .max(70)
      .min(10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <form className="form-input" onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="title..." {...register("title")} />
      <p className="input-error">{errors.title?.message}</p>
      <textarea placeholder="description..." {...register("description")} />
      <p className="input-error">{errors.description?.message}</p>
      <input type="submit" className="submit-btn" />
    </form>
  );
};
