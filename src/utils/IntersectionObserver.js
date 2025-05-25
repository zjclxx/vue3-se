let ob = null;

export function createInterObserver(dom, fn) {
  ob = new IntersectionObserver(
    (entries) => {
      if (entries.length && entries[0].isIntersecting) {
        fn();
        ob.observe(dom);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }
  );
  ob.observe(dom);
}

export function removeInterObserver() {
  // ob && ob.unobserve(dom);
  ob && ob.disconnect();
  // console.log("disconnect");
  ob = null;
}
