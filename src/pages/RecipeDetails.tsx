import { useState } from "react";
import { IRecipe } from "../interfaces/IRecipe";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import { useRecipeContext } from "../context/RecipeContext";

function RecipeDetails() {
	const { onAddFavorites } = useRecipeContext();

	const [recipe, setRecipe] = useState<IRecipe>(() => {
		const localData = localStorage.getItem("selectedRecipe");
		return localData ? JSON.parse(localData) : null;
	});

	const handleLikeToggle = () => {
		onAddFavorites(recipe);
		setRecipe((prevRecipe) =>
			prevRecipe ? { ...prevRecipe, isLiked: !prevRecipe.isLiked } : prevRecipe
		);
	};

	if (!recipe) {
		return <p>Recipe not found</p>;
	}

	return (
		<div className="flex flex-col md:flex-row gap-20 container h-dvh sm:max-w-4xl mx-auto p-10">
			<div>
				<img
					src="https://placehold.co/800"
					alt={recipe.name}
					className="mb-8 block"
				/>
				<div className="flex justify-between items-center">
					<div>
						<p className="font-bold text-xl">{recipe.name}</p>
						<span className="text-xs md:text-sm">{recipe.time} min.</span>
					</div>
					<div onClick={handleLikeToggle}>
						{recipe.isLiked ? (
							<FaHeart className="cursor-pointer text-accent" />
						) : (
							<FaRegHeart className="cursor-pointer text-accent" />
						)}
					</div>
				</div>
			</div>
			<div className="overflow-y-scroll no-scrollbar">
				<div className="mb-8">
					<p className="mb-2">Ingredients:</p>
					<ul className="list-disc flex flex-col gap-1 ml-6">
						{recipe.ingredients.map((ingredient) => (
							<li key={ingredient}>{ingredient}</li>
						))}
					</ul>
				</div>
				<div>
					<p className="mb-2">Instructions:</p>
					<ol className="list-decimal flex flex-col gap-1 ml-6">
						{recipe.instructions.map((instruction) => (
							<li key={instruction}>{instruction}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}

export default RecipeDetails;
