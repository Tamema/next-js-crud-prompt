"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { CustomUser } from "@app/create-prompt/page";
import { CreatedPost } from "@components/Feed";

const MyProfile: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState<CreatedPost[]>([]);

  useEffect(() => {
    const userId = (session as CustomUser)?.user.id;
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (userId) fetchPosts();
  }, [(session as CustomUser)?.user.id]);

  const handleEdit = (post: CreatedPost) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: CreatedPost): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;