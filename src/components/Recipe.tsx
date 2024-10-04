import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { IRecipe } from "../interfaces/IRecipe";
import { useRecipeContext } from "../context/RecipeContext";

interface RecipeProps {
	recipe: IRecipe;
	handleRecipeClick: (recipe: IRecipe) => void;
}

function Recipe({ recipe, handleRecipeClick }: RecipeProps) {
	const { onAddFavorites, onSelectedRecipe } = useRecipeContext();

	if (!recipe.name) return null;

	return (
		<div className="flex rounded-lg shadow-lg">
			<div>
				<img
					src="https://placehold.co/100"
					alt={recipe.name}
					className="block rounded-l-lg w-22 h-22"
				/>
			</div>
			<div className="flex w-full justify-between items-center px-4">
				<div>
					<p
						className="font-bold text-sm md:text-base cursor-pointer"
						onClick={() => {
							onSelectedRecipe(recipe);
							handleRecipeClick(recipe);
						}}
					>
						{recipe.name}
					</p>
					<span className="text-xs md:text-sm text-dark">
						{recipe.time} min.
					</span>
				</div>
				<div onClick={() => onAddFavorites(recipe)}>
					{recipe.isLiked ? (
						<FaHeart className="cursor-pointer text-accent" />
					) : (
						<FaRegHeart className="cursor-pointer text-accent" />
					)}
				</div>
			</div>
		</div>
	);
}

export default Recipe;
