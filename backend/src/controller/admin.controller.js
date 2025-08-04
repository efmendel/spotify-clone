import { Song } from "../models/song.model";

export const createSong = async (req, res) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({message: "Please uplaod all files"})
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const song = new Song({
            
        });

    } catch (error) {
        
    }
}