import { useEffect } from "react";
import { fetchAlbums } from "../api/albums";
import { getAlbums } from "../store/accessors";
import { useStore } from "../store/store";
import { storeAlbums } from "../store/reducer";

export default () => {
    const [state, dispatch] = useStore();
    const albums = getAlbums(state);

    useEffect(async () => {
        if (!albums || !Object.keys(albums).length) {
            const fetchedAlbums = await fetchAlbums();
            dispatch(storeAlbums(fetchedAlbums));
        }
    }, [albums]);

    return albums;
};