import { useEffect, useState } from "react";

import { fetchHomepage } from "../../api/albums";
import PicturesOfTheMoment from "./PicturesOfTheMoment";

export default () => {
    const [homepage, setHomepage] = useState({});

    useEffect(async () => {
        const _homepage = await fetchHomepage();
        setHomepage(_homepage);
    }, []);

    return (
        <div className="home">
            <PicturesOfTheMoment pictures={homepage?.picturesOfTheMoment || []} />
        </div>
    );
};