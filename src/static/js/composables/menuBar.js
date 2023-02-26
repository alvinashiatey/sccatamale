export default function menuHandler() {
        const subMenu = document.querySelector(".submenu");
        const menuBtn = document.getElementById("menu__btn");
        const closeBtn = document.querySelector(".submenu__content .close__btn")
        menuBtn.addEventListener("click", () => {
                if (!subMenu.classList.contains("open")) {
                        subMenu.classList.add("open");
                        document.body.classList.add("no-scroll");
                }
        })
        closeBtn.addEventListener("click", () => {
                subMenu.classList.remove("open");
                document.body.classList.remove("no-scroll");
        });
}