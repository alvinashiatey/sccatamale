export default function sideBar() {
  const sideBarDiv = document.querySelector(".sidebar");
  const programBtn = document.getElementById("program__btn");
  const closeBtn = document.getElementById("close__btn");
  if (!sideBarDiv) return;
  programBtn.addEventListener("click", () => {
    sideBarDiv.classList.add("open");
    document.body.classList.add("no-scroll");
  });
  closeBtn.addEventListener("click", () => {
    sideBarDiv.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
}
