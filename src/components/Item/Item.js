import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import React, { Fragment } from "react";

const Item = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Item;
