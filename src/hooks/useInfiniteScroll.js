import { useEffect, useRef } from "react";

const useInfiniteScroll = (targetRef, request, loading, itemEnded) => {
    const observer = useRef()

    useEffect(() => {
        if (observer.current) observer.current.disconnect()

        let onObserver = (entries) => {
            if (entries[0].isIntersecting && !loading && !itemEnded) {
                request()
            }
        }

        observer.current = new IntersectionObserver(onObserver)
        observer.current.observe(targetRef.current)
    }, [targetRef, request, loading, itemEnded])
}

export default useInfiniteScroll;