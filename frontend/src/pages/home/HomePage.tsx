import { Topbar } from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeForYouSongs()
    fetchTrendingSongs()
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

  console.log({ isLoading, madeForYouSongs, featuredSongs, trendingSongs})

  return (
    <div className="rounded-md overflow-hidden">
      <Topbar></Topbar>
      <FeaturedSection />
    </div>
  );
};

export default HomePage;
