"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AddToFav({
  mediaId,
  title,
  image,
  overview,
  releaseDate,
  voteAverage,
  voteCount
}) {
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded && isSignedIn && user) {
      setIsFav(user.publicMetadata?.favs?.includes(mediaId));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [mediaId, isLoaded, isSignedIn, user]);

  const handleFavClick = async () => { 
    setIsLoading(true);
    if (!isSignedIn) {
      setIsLoading(false);
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch("api/user/fav", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaId,
          title,
          overview,
          releaseDate,
          voteAverage,
          voteCount,
          image
        }),
      });

      if (res.ok) {
        setIsFav(!isFav);
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFavClick}
        className={`p-2 rounded ${isFav ? "bg-red-300 dark:bg-red-600" : "bg-gray-300 dark:bg-gray-600"}`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  )
}