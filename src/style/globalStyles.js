import { StyleSheet } from "react-native";

export const colorPalette = {
  cactus_1: "#abc4aa",
  background: "#121212",
  noir: "#000000",
  snow: "#ffffff",
};

/**
 * It takes in a size, type, and alignment and returns a style object with the font size, color, and
 * alignment.
 * @param size - font size
 * @param type - error, normal, dark
 * @param align - left, right, center
 * @param otherStyles - other styles compatible with Text
 * @returns An object with the properties textAlign, fontSize, and color.
 */
export function customizeText(size, type, align = "left", otherStyles) {
  const colorFont = {
    normal: colorPalette.snow,
    dark: colorPalette.noir,
  };

  return {
    textAlign: align,
    fontSize: size,
    color: colorFont[type],
    ...otherStyles,
  };
}

export const globalStyle = StyleSheet.create({
  card: {
    padding: "5%",
    borderRadius: 20,
    marginVertical: "2.5%",
  },
});
