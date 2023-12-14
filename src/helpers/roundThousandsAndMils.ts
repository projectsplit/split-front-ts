export const roundThousandsAndMillions = (x: string | undefined) => {
  if (x !== undefined) {
    const value = parseFloat(x)

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      if ((value / 1000).toFixed(1).toString().endsWith(".0")) {
        return (value / 1000).toFixed(0) + "K";
      }
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  } else return "";
};
