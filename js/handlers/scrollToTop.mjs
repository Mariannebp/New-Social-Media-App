export function scrollToTop() {
  const toTop = document.querySelector("#toTop");

  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  })
}
