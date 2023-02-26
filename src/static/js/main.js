import homePageDate from "./composables/homePageDate";
import homeImages from "./composables/homeImages";
import exhibitionBar from "./composables/exhibitionBar";
import menuBar from "./composables/menuBar";
import eventsBar from "./composables/eventsBar";
import glideCarosel from "./composables/glideCarosel";

(function init() {
  exhibitionBar();
  homePageDate();
  glideCarosel();
  homeImages();
  eventsBar();
  menuBar();
})();
