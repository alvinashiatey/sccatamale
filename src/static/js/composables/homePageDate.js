import { DateTime } from "luxon";

export default function homePageDate() {
  const currentDate = document.getElementById("current-date");
  const openStateHtml = document.getElementById("open-state");
  const openingState = ["open", "closed"];
  const reopeningTime = document.getElementById("reopening-time");
  const reopeningString = "Opens at 11 am tomorrow.";
  const dt = DateTime.now().setZone("GMT");
  const f = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  const dateString = dt.setLocale("en-GB").toLocaleString(f);
  currentDate.textContent = dateString;
  if (dt.weekday < 6 || dt.weekday > 7) {
    if (dt.hour >= 20 || dt.hour < 11) {
      openStateHtml.textContent = openingState[1];
      reopeningTime.textContent = reopeningString;
    } else {
      openStateHtml.textContent = openingState[0];
    }
  } else {
    if (dt.hour >= 18 || dt.hour < 11) {
      openStateHtml.textContent = openingState[1];
      reopeningTime.textContent = reopeningString;
    } else {
      openStateHtml.textContent = openingState[0];
    }
  }

  // use requestAnimationFrame to update the date every frame
  requestAnimationFrame(homePageDate);
}
