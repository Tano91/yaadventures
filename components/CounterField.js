const CounterField = ({ fields, listings }) => {
  const parishCounter = () => {
    let counter = 0;
    listings.map((item) => {
      if (fields.toCount.parish === item.parish) {
        counter++;
      }
    });
    return counter;
  };

  const typeCounter = () => {
    let counter = 0;
    listings.map((item) => {
      if (fields.toCount === item.type) {
        counter++;
      }
    });
    return counter;
  };

  return (
    <>
      {fields.name === "Parish" && <span>{parishCounter()}</span>}
      {fields.name === "Type" && (
        <span className=" text-emerald-600">({typeCounter()})</span>
      )}
    </>
  );
};

export default CounterField;
