export const suggestPrice = (
  category,
  condition,
  originalPrice
) => {
  let factor = 0.5;

  if (
    condition === "Like New"
  )
    factor = 0.8;

  if (
    condition === "Good"
  )
    factor = 0.65;

  if (
    condition === "Fair"
  )
    factor = 0.45;

  if (
    condition === "Used"
  )
    factor = 0.3;

  return Math.round(
    originalPrice * factor
  );
};