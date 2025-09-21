import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbumByID: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;

}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  deleteAlbum: async (id) => {
    set({
      isLoading: true,
      error: null
    })
    try {
      await axiosInstance.delete(`/admin/albums/${id}`)
      set(state => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) => 
          song.albumID === state.albums.find((a) => a._id === id)?.title ? {...song, album:null} : song
        )
      }))
      toast.success("Album deleted succesfully")
    } catch (error : any) {
      toast.error("Error deleting the Album")
      set({error: error.response.data.message})
      console.log(error)
    } finally {
      set({isLoading: false})
    }
  },

  deleteSong: async (id) => {
    set({
      isLoading: true,
      error: null
    })
    try {
      await axiosInstance.delete(`/admin/songs/${id}`)
      set(state => ({
        songs: state.songs.filter((song) => song._id !== id)
      }))
      toast.success("Song deleted succesfully")
    } catch (error : any) {
      toast.error("Error deleting the song")
      set({error: error.response.data.message})
    } finally {
      set({isLoading: false})
    }
  },

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/albums");
      set({
        albums: response.data
      })
    } catch (error : any) {
      set({error: error.response.data.message})
    } finally {
      set({
        isLoading: false
      })
    }
  },

  fetchStats: async () => {
    set({isLoading: true, error: null});
    try {
      const response = await axiosInstance.get("/stats")
      set({stats: response.data})
    } catch (error : any) {
      console.error("Error fetching stats", error)
      set({ error: error.response.data.message})
    } finally {
      set({isLoading: false})
    }
  },

  fetchSongs: async () => {
    set({
      isLoading: true,
      error: null
    });
    try {
      const response = await axiosInstance.get("/songs")
      set ( {songs: response.data})
    } catch (error : any) {
      console.error("Error fetching songs", error)
      set({error: error.response.data.message})
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAlbumByID: async (id) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/albums/${id}`)
      set ({currentAlbum: response.data})
    } catch (error : any) {
      set({error: error.response.data.message})
    } finally {
      set({
        isLoading: false
      })
    }
  },

  fetchFeaturedSongs: async () => {
      set({ isLoading: true, error: null});
      try {
        const response = await axiosInstance.get("/songs/featured")
        set({featuredSongs: response.data })
      } catch (error:  any) {
        set({ error: error.response.data.message })
      } finally {
        set({ isLoading: false})
      }
  },

  fetchMadeForYouSongs: async () => {
      set({ isLoading: true, error: null});
      try {
        const response = await axiosInstance.get("/songs/made-for-you")
        set({madeForYouSongs: response.data})
      } catch (error: any) {
        set({error: error.response.data.message })
      } finally {
        set({ isLoading: false})
      }
  },

  fetchTrendingSongs: async() => {
      set({isLoading: true, error: null});
      try {
        const response = await axiosInstance.get("/songs/trending")
        set({trendingSongs: response.data})
      } catch (error: any) {
        set({error: error.response.data.message})
      } finally {
        set({isLoading: false})
      }
  },

}));
