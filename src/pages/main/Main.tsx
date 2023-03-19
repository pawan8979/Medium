import "../styles/main.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useEffect, useState } from "react";
import Post from "./Post";


export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const postRef = collection(db, "posts");

  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className={postsList ? "container-login" : "container-logout"}>
        <h1>Welcome to Home Page 🙋‍♂️</h1>
      </div>
      <p>
        {postsList?.map((post) => (
          <Post post={post} />
        ))}
      </p>
    </>
  );
};
