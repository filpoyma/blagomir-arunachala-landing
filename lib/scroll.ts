export const scrollToId = (href: string): void => {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
