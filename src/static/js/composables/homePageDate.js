import { DateTime } from "luxon";

export default function homePageDate() {
  const viewState = document.getElementById("view__state");
  const currentDate = document.getElementById("current-date");
  const openStateHtml = document.getElementById("open-state");
  if (!currentDate) return;
  const openingState = ["open", "closed"];
  const reopeningTime = document.getElementById("reopening-time");
  const reopeningString = "Opens at 11 am tomorrow.";
  const dt = DateTime.now().setZone("GMT");
  const f = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  const dateString = dt.setLocale("en-GB").toLocaleString(f);
  currentDate.textContent = dateString;

  let d = new Date(CURRENT_EXHIBITION_DATE);
  let dEnd = new Date(CURRENT_EXHIBITION_END);
  let dNow = new Date();
  //check if the current date is on or after the exhibition start date and before the end date
  if (dNow >= d && dNow <= dEnd) {
    if (dt.weekday < 6 || dt.weekday > 7) {
      if (dt.hour >= 20 || dt.hour < 11) {
        openStateHtml.textContent = `Currently ${openingState[1]}`;
        reopeningTime.textContent = reopeningString;
      } else {
        openStateHtml.textContent = `Currently ${openingState[0]}`;
      }
    } else if (dt.weekday !== 5) {
      if (dt.hour >= 18 || dt.hour < 11) {
        openStateHtml.textContent = `Currently ${openingState[1]}`;
        dt.weekday === 4
          ? (reopeningTime.textContent = "Opens at 11 am on Saturday.")
          : (reopeningTime.textContent = reopeningString);
      } else {
        openStateHtml.textContent = `Currently ${openingState[0]}`;
      }
    } else {
      openStateHtml.textContent = `Currently ${openingState[1]}`;
      reopeningTime.textContent = reopeningString;
    }
    // use requestAnimationFrame to update the date every frame
    requestAnimationFrame(homePageDate);
  } else {
    viewState.textContent = "Upcoming:";
    openStateHtml.textContent = `Currently ${openingState[1]}`;
  }
}
