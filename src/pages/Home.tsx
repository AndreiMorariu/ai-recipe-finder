import { useNavigate } from "react-router-dom";

import SearchBox from "../components/SearchBox";
import RecipeList from "../components/RecipeList";
import RecipeSkeleton from "../components/RecipeSkeleton";

import { IRecipe } from "../interfaces/IRecipe";
import { useRecipeContext } from "../context/RecipeContext";

function Home() {
	const { fetchedRecipes, favoriteRecipes, setSelectedRecipe, isLoading } =
		useRecipeContext();

	const navigate = useNavigate();

	const recipesToDisplay =
		fetchedRecipes.length > 0 ? fetchedRecipes : favoriteRecipes;

	const headingToDisplay =
		fetchedRecipes.length > 0 ? "Suggested Recipes" : "Favorites";

	function handleRecipeClick(recipe: IRecipe) {
		setSelectedRecipe(recipe);
		navigate(`/recipe/${recipe.name.split(" ").join("-")}`);
	}

	return (
		<div className="container h-dvh sm:max-w-xl mx-auto p-10">
			<SearchBox />
			{isLoading ? (
				Array.from({ length: 5 }, (_, i) => <RecipeSkeleton key={i} />)
			) : (
				<RecipeList
					heading={headingToDisplay}
					recipes={recipesToDisplay}
					handleRecipeClick={handleRecipeClick}
				/>
			)}
		</div>
	);
}

export default Home;
