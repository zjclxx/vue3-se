let ob = null;

export function createInterObserver(dom, fn) {
  ob = new IntersectionObserver(
    (entries) => {
      if (entries.length && entries[0].isIntersecting) {
        fn();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  ob.observe(dom);
}

export function removeInterObserver() {
  ob && ob.unobserve();
  ob = null;
}
