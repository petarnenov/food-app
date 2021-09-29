import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useHTTP } from "../../hooks/use-http";
import { useEffect } from "react";

const AvailableMeals = () => {
  const [error, data, isLoading, sendRequest] = useHTTP();

  useEffect(() => {
    const abortController = new AbortController();
    const init = {
      signal: abortController.signal,
    };
    const input = "http://127.0.0.1:8111/meals";
    sendRequest(input, init);
    return () => abortController.abort();
  }, [sendRequest]);

  const mealsList = data.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && (
          <section className={classes.mealLoading}>Loading data...</section>
        )}
        {error && <section className={classes.error}>Error {error}</section>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
