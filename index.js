/* we need the button and that container div */

const get_meal_btn = document.getElementById("get_meal"); // we're making a GET request to that endpoint, it sends back a JSON response, which we can parse in order to retrieve the data we want.
const meal_container = document.getElementById("meal");

get_meal_btn.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

/* We're using the fetch API to do the request. We just have to pass in the url of the API we want to make a GET request to, and we're going to get back a promise.

Once this is resolved we have a response (res). This res isn't yet in the state we want it to be, so we're going to call the .json() method on it. Then finally we have the beautiful object. Yay! ?

The API returns the meals array but only with one item in it. So we're going to pass that item (at index 0) into our createMeal function, which we'll define next.*/

const createMeal = (meal) => {
  const ingredients = [];

  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients
      break;
    }
  }

  const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
                        <h2>${meal.strMeal}</h2>

				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
				<h4>Ingredients:</h4>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
			<div class="columns seven">
				                <h3>Instructions</h3>

				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
      meal.strYoutube
        ? `
		<div class="row">
			<h4>Video Recipe</h4>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
        : ""
    }
	`;

  meal_container.innerHTML = newInnerHTML;
};

/* Note that some of the properties might not be available. So for that we're using the ternary operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to check if we have the data to display the corresponding tag. 

If we don't have it then we're returning an empty string and nothing will be displayed on the page. The category and the area are examples of these type of properties. */
