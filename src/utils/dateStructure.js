function dateStructure(date, position) {
  // split date string "Thu, 14 Jan 2021 00:00:00 GMT" to return "Thu, 14 Jan" if position is "start" and return "Thu, 14 Jan 2021" if position is "end"
  if (position === "start") {
    return String(date).split(" ").slice(0, 3).join(" ");
  } else if (position === "end") {
    return String(date).split(" ").slice(0, 4).join(" ");
  }
  return String(date).split(" ").slice(0, 4).join(" ");
}

module.exports = dateStructure;
