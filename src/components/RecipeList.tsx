import Recipe from "./Recipe";

import { IRecipe } from "../interfaces/IRecipe";
import { useRecipeContext } from "../context/RecipeContext";

interface RecipeListProps {
	heading: string;
	recipes: IRecipe[];
	handleRecipeClick: (recipe: IRecipe) => void;
}

function RecipeList({ heading, recipes, handleRecipeClick }: RecipeListProps) {
	const {
		dislikedRecipes,
		setDislikedRecipes,
		setFetchedRecipes,
		getRecipes,
		userInput,
		setUserInput,
	} = useRecipeContext();

	function handleDislikeClick() {
		const newDislikedRecipes = [...dislikedRecipes, ...recipes];
		setDislikedRecipes(newDislikedRecipes);
		getRecipes(userInput, newDislikedRecipes);
	}

	return (
		<div>
			<div className="flex justify-between items-center">
				<h2 className="font-bold text-2xl mb-2 text-heading">{heading}</h2>
				{heading !== "Favorites" && (
					<button
						className="text-accent"
						onClick={() => {
							setFetchedRecipes([]);
							setUserInput("");
						}}
					>
						Go back to favorites
					</button>
				)}
			</div>
			{recipes.length > 0 ? (
				<div className="flex flex-col gap-4 mb-8">
					{recipes.map((recipe, i: number) => (
						<Recipe
							recipe={recipe}
							key={i}
							handleRecipeClick={handleRecipeClick}
						/>
					))}
				</div>
			) : (
				<h2 className="text-center ">No recipes saved, search for recipes.</h2>
			)}
			{heading === "Favorites" ? (
				""
			) : (
				<button
					className="bg-accent hover:bg-violet-700 text-white text-xs md:text-sm font-bold px-6 py-2 rounded-lg mx-auto block"
					onClick={handleDislikeClick}
				>
					I don't like these
				</button>
			)}
		</div>
	);
}

export default RecipeList;
