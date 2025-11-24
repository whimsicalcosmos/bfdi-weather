import React from "react";

type CharacterDialogue = {
  dialogue: string;
  image: string;
  scale: number;
  classProperties: string;
  styles: React.CSSProperties;
};

const characterDialogues: Record<string, Record<string, CharacterDialogue>> = {
  Firey: {
    sunny: {
      dialogue: "",
      image: "FireyHappy.png",
      scale: 3,
      classProperties: "flip",
      styles: { right: "12.5%", bottom: "15%" },
    },
    night: {
      dialogue: "",
      image: "FireySit.png",
      scale: 2,
      classProperties: "flip",
      styles: { bottom: "20%", right: "15%" },
    },
    cloudy: {
      dialogue: "",
      image: "FireyBlank.png",
      scale: 2,
      classProperties: "",
      styles: { bottom: "20%", right: "5%" },
    },
    raining: {
      dialogue: "Oh, no... RAIN! Oh, oh no oh no oh NOOO!!",
      image: "FireyScared.png",
      scale: 2,
      classProperties: "flip",
      styles: { bottom: "15%", right: "10%" },
    },
    snowy: {
      dialogue: "How's it snowing?!",
      image: "FireyScared.png",
      scale: 1,
      classProperties: "flip",
      styles: { bottom: "15%", right: "10%" },
    },
    windy: {
      dialogue: "",
      image: "FireyBlank.png",
      scale: 1,
      classProperties: "",
      styles: { bottom: "20%", right: "5%" },
    },
    foggy: {
      dialogue: "",
      image: "FireyConfused.png",
      scale: 2.5,
      classProperties: "flip",
      styles: { right: "10%", bottom: "15%" },
    },
  },
  Leafy: {
    sunny: {
      dialogue:
        "\"OMG, it's so nice and awesome out today!!\"",
      image: "LeafyHappy.png",
      scale: 2,
      classProperties: "",
      styles: { right: "0", bottom: "10%" },
    },
    night: {
      dialogue: "",
      image: "LeafySit.png",
      scale: 2,
      classProperties: "flip",
      styles: { bottom: "20%", right: "10%" },
    },
    cloudy: {
      dialogue: "",
      image: "LeafyBlank.png",
      scale: 1.5,
      classProperties: "",
      styles: { bottom: "10%" },
    },
    raining: {
      dialogue: "What FIREY should've used...",
      image: "LeafyChill.png",
      scale: 2.5,
      classProperties: "",
      styles: { right: "0" },
    },
    snowy: {
      dialogue: "",
      image: "LeafyAmazed.png",
      scale: 1,
      classProperties: "",
      styles: {},
    },
    windy: {
      dialogue: "",
      image: "LeafyChill.png",
      scale: 2.5,
      classProperties: "",
      styles: { right: "0" },
    },
    foggy: {
      dialogue: "",
      image: "LeafyConfused.png",
      scale: 2.25,
      classProperties: "",
      styles: { bottom: "10%", right: "0" },
    },
  },
  Pencil: {
    sunny: {
      dialogue: "",
      image: "PencilHappy.png",
      scale: 1,
      classProperties: "",
      styles: { bottom: "5%", rotate: "10deg" },
    },
    night: {
      dialogue: "",
      image: "PencilSleeping.png",
      scale: 3,
      classProperties: "flip",
      styles: { right: "17.5%", bottom: "20%" },
    },
    cloudy: {
      dialogue: "",
      image: "PencilBlank.png",
      scale: 1,
      classProperties: "",
      styles: { bottom: "0", rotate: "10deg" },
    },
    raining: {
      dialogue: "",
      image: "PencilHappy.png",
      scale: 1,
      classProperties: "",
      styles: { bottom: "5%", rotate: "10deg" },
    },
    snowy: {
      dialogue: '"Psh, yeah, like we need any more of SNOWBALL around."',
      image: "PencilLooking.png",
      scale: 1.75,
      classProperties: "",
      styles: { bottom: "7.5%", rotate: "-10deg" },
    },
    windy: {
      dialogue: "",
      image: "PencilScared.png",
      scale: 1,
      classProperties: "flip",
      styles: { bottom: "0", rotate: "10deg", right: "10%" },
    },
    foggy: {
      dialogue: "",
      image: "PencilLooking.png",
      scale: 1.75,
      classProperties: "",
      styles: { bottom: "7.5%", rotate: "-10deg" },
    },
  },
};

export function getRandomCharacter() {
  return Object.keys(characterDialogues)[
    Math.floor(Math.random() * Object.keys(characterDialogues).length)
  ];
}

// Returns CharacterDialogue object for the character and weather
export function getResponse(
  character: string,
  condition: string,
  date?: Date
): CharacterDialogue {
  /*
  let list = [
    "sunny",
    "night",
    "cloudy",
    "raining",
    "snowy",
    "windy",
    "foggy",
    "other",
  ];
  return characterDialogues[char][list[ind]];
  */
  return characterDialogues[character][
    forecastToDialogueCategory(condition, date)
  ];
}

export { characterDialogues };

/**
 * Maps a forecast string to a characterDialogues weather category.
 * Optionally, pass a Date to determine if it's night.
 */
export function forecastToDialogueCategory(
  forecast: string,
  date?: Date
): string {
  const f = forecast.toLowerCase();
  // Night: only if clear/sunny and between 6pm (18) and 6am (6)
  if (date) {
    const hour = date.getHours();
    if (
      (f.includes("sunny") || f.includes("clear")) &&
      (hour >= 18 || hour < 6)
    ) {
      return "night";
    }
  }
  if (f.includes("thunderstorm") || f.includes("t-storm")) return "raining";
  if (f.includes("snow") || f.includes("flurries") || f.includes("blizzard"))
    return "snowy";
  if (f.includes("sleet") || f.includes("ice")) return "snowy";
  if (f.includes("rain") || f.includes("showers") || f.includes("drizzle"))
    return "raining";
  if (f.includes("hail")) return "raining";
  if (f.includes("fog") || f.includes("mist") || f.includes("haze"))
    return "foggy";
  if (f.includes("cloudy") || f.includes("overcast")) return "cloudy";
  if (
    f.includes("partly sunny") ||
    f.includes("partly cloudy") ||
    f.includes("mostly sunny")
  )
    return "sunny";
  if (f.includes("sunny") || f.includes("clear")) return "sunny";
  if (f.includes("wind")) return "windy";
  return "other";
}
