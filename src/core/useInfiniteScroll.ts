import { useCallback, useRef } from "react";

export const useInfiniteScroll = (loadMore: () => void, dependencies = []) => {
  const observer = useRef<IntersectionObserver>();

  return useCallback(node => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) {
        loadMore();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, dependencies);
};

export default useInfiniteScroll;
