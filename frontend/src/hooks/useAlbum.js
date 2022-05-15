import { useEffect } from "react";
import { fetchPictures } from "../api/albums";
import { useStore } from "../store/store";
import { storePictures } from "../store/reducer";
import useAlbums from "./useAlbums";

export default (albumId) => {
    const [, dispatch] = useStore();
    const albums = useAlbums();
    const album = albums != null
        ? albums[albumId]
        : null;

    useEffect(async () => {
        if (album && !album.pictures) {
            const fetchedPictures = await fetchPictures(albumId);
            dispatch(storePictures(albumId, fetchedPictures));
        }
    }, [album]);

    return album;
};