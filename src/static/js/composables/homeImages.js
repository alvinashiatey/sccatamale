export default function homeImage() {
  const imageBtn = document.querySelectorAll(".img__btn");
  const imageDiv = document.querySelectorAll(".images");
  imageBtn.forEach((btn, i) => {
    btn.addEventListener("mouseover", (e) => {
      imageDiv[i].style.visibility = "visible";
    });
    btn.addEventListener("mouseout", (e) => {
      imageDiv[i].style.visibility = "hidden";
    });

    // check screen size if lower than 40em then hide images
    if (window.innerWidth < 640) {
      btn.addEventListener("click", (e) => {
        imageDiv.forEach((div) => {
          div.style.visibility = "hidden";
        });
        imageDiv[i].style.visibility = "visible";
      });
    }
  });
}
