import { useEffect, useRef } from "react";

const useInfiniteScroll = (targetRef, request, process, itemEnded) => {
    const observer = useRef()

    useEffect(() => {
        if (observer.current) observer.current.disconnect()

        let onObserver = (entries) => {
            if (entries[0].isIntersecting && process === 'confirmed' && !itemEnded) {
                request()
            }
        }

        observer.current = new IntersectionObserver(onObserver)
        observer.current.observe(targetRef.current)
    }, [targetRef, request, process, itemEnded])
}

export default useInfiniteScroll;