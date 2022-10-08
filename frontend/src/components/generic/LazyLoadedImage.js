import './LazyLoadedImage.scss';

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const cache = {};

export default ({ src, style }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    const [loading, setLoading] = useState(!cache[src]);

    const loadImage = src => {
        const image = new Image();
        image.onload = () => {
            setLoading(false)
            cache[src] = image;
        };

        image.src = src;
    };

    useEffect(() => {
        if (inView && loading) {
            loadImage(src);
        }
    }, [inView, src]);

    return <img style={style} ref={ref} className={`lazy-loaded-image ${loading ? 'loading' : ''}`} src={loading ? null : src} />
};