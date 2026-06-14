export const detectScam =
  (
    title,
    description
  ) => {
    const suspiciousWords =
      [
        "advance payment",
        "pay first",
        "urgent transfer",
        "wire money",
        "crypto"
      ];

    const text =
      `${title} ${description}`.toLowerCase();

    const found =
      suspiciousWords.some(
        (word) =>
          text.includes(word)
      );

    return {
      suspicious: found
    };
  };