export const shuffle = <T extends any>(arr: T[]) => {
  // Create a copy of the array to avoid mutating the original
  const shuffledArray = [...arr];

  // Loop through the array from the last index to the first
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at the current index and the random index
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
};
