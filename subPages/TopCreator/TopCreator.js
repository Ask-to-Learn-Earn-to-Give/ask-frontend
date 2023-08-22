// define top creators
export const getTopCreator = (creators) => {
  const finalCreators = [];
  const finalResult =
    creators &&
    creators.reduce((index, currentValue) => {
      (index[currentValue.seller] = index[currentValue.seller] || []).push(
        currentValue
      );
      return index;
    }, {});
  creators &&
    Object.entries(finalResult).forEach((item) => {
      const seller = item[0];
      const total = item[1]
        .map((newItem) => Number(newItem.price))
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        );

      finalCreators.push({ seller, total });
    });
  return finalCreators;
};
