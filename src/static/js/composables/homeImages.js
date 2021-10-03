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

    // on click toggle the visibility of the image
    btn.addEventListener("click", (e) => {
      imageDiv.forEach((div) => {
        div.style.visibility = "hidden";
      });
      imageDiv[i].style.visibility = "visible";
    });
  });
}
