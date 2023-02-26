export default function eventsBar() {
        const subMenu = document.querySelector(".submenu");
        const eventsBtn = document.getElementById("events__btn");
        const eventsDiv = document.querySelector(".events");
        const closeBtn = document.querySelector(".events__content #close__btn");
        if (!eventsDiv) return;
        eventsBtn.addEventListener("click", () => {
                eventsDiv.classList.add("open");
                subMenu.classList.remove("open");
                document.body.classList.add("no-scroll");
        });
        closeBtn.addEventListener("click", () => {
                eventsDiv.classList.remove("open");
                document.body.classList.remove("no-scroll");
        });
}