import AddToFav from "../../../components/AddToFav";
import Link from "next/link";
import Image from "next/image";

export default async function MediaPage({ params }) {
  const { id: mediaId } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${process.env.API_KEY}`
  );
  const media = await res.json();

  if (!res.ok) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">
          Details are not available at the moment!
        </h1>
        {/* return home */}
        <p>
          <Link href='/' className="hover:text-amber-600">
            Go Home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image 
          src={`https://image.tmdb.org/t/p/original/${
            media.backdrop_path || media.poster_path
          }`}
          alt={media.title || media.name}
          className="rounded-lg w-full md:w-96 h-56 object-cover"
          width={500}
          height={500}
        />
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {media.title || media.name}
          </h2>
          <p className="text-lg mb-3">{media.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {media.release_date || media.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {media.vote_average.toFixed(1)}{" "}
            ({(media.vote_count).toLocaleString()} ratings)
          </p>
          <AddToFav 
            mediaId={mediaId}
            title={media.title || media.name}
            image={media.backdrop_path || media.poster_path}
            overview={media.overview}
            releaseDate={media.releaseDate || media.first_air_date}
            voteAverage={media.vote_average}
            voteCount={media.vote_count}
          />
        </div>
      </div>
    </div>
  );
}