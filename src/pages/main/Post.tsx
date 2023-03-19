import { Post as Ipost } from "./Main";
import "../styles/post.css";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: Ipost;
}

interface Like {
  userId: string;
  likeId: string;
}

const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likesToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likesToDeleteQuery);
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) =>
            prev &&
            prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div className="post-container">
      <div className="post-card">
        <div className="title">
          <h2>{post.title}</h2>
          <small>@{post.username}</small>
        </div>
        <div className="body">
          <p>{post.description}</p>
        </div>
        <div className="footer">
          <button
            className="like-button"
            onClick={hasUserLiked ? removeLike : addLike}
          >
            {hasUserLiked ? <> &#128078; </> : <>&#128077;</>}
          </button>
          {likes?.length !== null && (
            <span className="likes-num">Likes: {likes?.length}</span>
          )}
          {!likes?.length && (
            <span className="likes-num">Likes: {likes?.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
