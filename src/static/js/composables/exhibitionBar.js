export default function exhibition() {
  const subMenu = document.querySelector(".submenu");
  const exhibitionDiv = document.querySelector(".exhibition");
  const exhibitionBtn = document.getElementById("exhibition__btn");
  const closeBtn = document.getElementById("close__btn");
  if (!exhibitionDiv) return;
  exhibitionBtn.addEventListener("click", () => {
    subMenu.classList.remove("open");
    exhibitionDiv.classList.add("open");
    document.body.classList.add("no-scroll");
  });
  closeBtn.addEventListener("click", () => {
    exhibitionDiv.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
}
