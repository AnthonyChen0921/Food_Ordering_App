import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

/*const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Stainly Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "妹说就是零卡套餐",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "老八秘制小Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Left spiral art",
    description: "Healthy...and green...",
    price: 18.99,
  },
];*/

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (responseData) => {
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          ...responseData[key],
        });
      }
      console.log(loadedMeals);
      setMeals(loadedMeals);
    };
    const requestConfig = {
      url: "https://my-first-page-1f193-default-rtdb.firebaseio.com/meals.json",
    };
    fetchMeals(requestConfig, transformMeals);
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      key={meal.id}
      id={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = (
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  );

  if (isLoading) {
    content = <div className={classes.loading}>Loading...</div>;
  }
  if (error) {
    content = <div className={classes.error}>Error: {error}</div>;
  }

  return <section className={classes.meals}>{content}</section>;
};

export default AvailableMeals;
