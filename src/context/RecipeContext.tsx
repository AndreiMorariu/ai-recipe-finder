import React, { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";

import { fetchRecipes } from "../services/api";
import { IRecipe } from "../interfaces/IRecipe";

interface RecipeContextProps {
	userInput: string;
	isLoading: boolean;
	fetchedRecipes: IRecipe[];
	dislikedRecipes: IRecipe[];
	favoriteRecipes: IRecipe[];
	selectedRecipe: IRecipe | null;
	setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe | null>>;
	setFetchedRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
	setDislikedRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
	setFavoriteRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
	setUserInput: React.Dispatch<React.SetStateAction<string>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	onAddFavorites: (recipe: IRecipe) => void;
	onSelectedRecipe: (recipe: IRecipe) => void;
	getRecipes: (userInput: string, dislikedRecipes: IRecipe[]) => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null);
	const [fetchedRecipes, setFetchedRecipes] = useState<IRecipe[]>([]);
	const [dislikedRecipes, setDislikedRecipes] = useState<IRecipe[]>([]);
	const [userInput, setUserInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>(() => {
		const localData = localStorage.getItem("favoriteRecipes");
		return localData ? JSON.parse(localData) : [];
	});

	async function getRecipes(userInput: string, dislikedRecipes: IRecipe[]) {
		setIsLoading(true);

		try {
			const response = await fetchRecipes(userInput, dislikedRecipes);
			if (response === null) throw new Error("Something went wrong");

			const data = JSON.parse(response);

			const sanitizedRecipesKey = Object.keys(data).find(
				(key) => key.trim() === "recipes"
			);

			if (!sanitizedRecipesKey)
				throw new Error("Recipes key not found in response");

			const recipesArray: IRecipe[] = data[sanitizedRecipesKey].map(
				(recipe: IRecipe) => ({
					name: recipe.name,
					isLiked: recipe.isLiked,
					time: recipe.time,
					ingredients: recipe.ingredients,
					instructions: recipe.instructions,
				})
			);

			setFetchedRecipes(recipesArray);
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	function onAddFavorites(recipe: IRecipe) {
		const isCurrentlyLiked = recipe.isLiked;
		const updatedRecipe = { ...recipe, isLiked: !isCurrentlyLiked };

		const storedFavorites = JSON.parse(
			localStorage.getItem("favoriteRecipes") || "[]"
		);

		if (isCurrentlyLiked) {
			const newFavorites = storedFavorites.filter(
				(fav: IRecipe) => fav.name !== recipe.name
			);
			localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites));
			toast.success("Removed from favorites");

			setFavoriteRecipes((prevFavorites) =>
				prevFavorites.filter((fav) => fav.name !== recipe.name)
			);
		} else {
			const isDuplicate = storedFavorites.some(
				(fav: IRecipe) => fav.name === recipe.name
			);

			if (!isDuplicate) {
				const newFavorites = [...storedFavorites, updatedRecipe];
				localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites));
				toast.success("Added to favorites");

				setFavoriteRecipes((prevFavorites) => [
					...prevFavorites,
					updatedRecipe,
				]);
			} else {
				toast.error("Recipe is already in your favorites!");
				return;
			}
		}

		setFetchedRecipes((prevFetchedRecipes) =>
			prevFetchedRecipes.map((r) =>
				r.name === recipe.name ? updatedRecipe : r
			)
		);

		setSelectedRecipe((prevSelectedRecipe) =>
			prevSelectedRecipe && prevSelectedRecipe.name === recipe.name
				? updatedRecipe
				: prevSelectedRecipe
		);
	}

	function onSelectedRecipe(recipe: IRecipe) {
		setSelectedRecipe(recipe);
		localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
	}

	return (
		<RecipeContext.Provider
			value={{
				onSelectedRecipe,
				selectedRecipe,
				setSelectedRecipe,
				fetchedRecipes,
				setDislikedRecipes,
				dislikedRecipes,
				favoriteRecipes,
				onAddFavorites,
				setFetchedRecipes,
				setFavoriteRecipes,
				userInput,
				setUserInput,
				isLoading,
				setIsLoading,
				getRecipes,
			}}
		>
			{children}
		</RecipeContext.Provider>
	);
};

export const useRecipeContext = () => {
	const context = useContext(RecipeContext);
	if (!context) {
		throw new Error("useRecipeContext must be used within a RecipeProvider");
	}
	return context;
};
