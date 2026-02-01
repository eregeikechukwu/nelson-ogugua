import { useState, useEffect } from "react";

export function useIsClientLoaded() {
    const [isClientLoaded, setIsClientLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsClientLoaded(true);
        }, 0);
    }, []);
    return isClientLoaded;
}
