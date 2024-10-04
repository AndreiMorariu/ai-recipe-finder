import Groq from "groq-sdk";

import { IRecipe } from "../interfaces/IRecipe";

const groq = new Groq({
	apiKey: import.meta.env.VITE_KEY,
	dangerouslyAllowBrowser: true,
});

const schema = {
	$defs: {},
	properties: {
		name: { title: "Recipe Name", type: "string" },
		isLiked: {
			title: "Is Liked",
			type: "boolean",
			const: false,
		},
		time: { title: "Time", type: "number" },
		ingredients: {
			title: "Ingredients",
			type: "array",
			items: { type: "string" },
		},
		instructions: {
			title: "Instructions",
			type: "array",
			items: { type: "string" },
		},
	},
	required: ["name", "isLiked", "time", "ingredients", "instructions"],
	title: "Recipe",
	type: "object",
};

export async function fetchRecipes(
	userInput: string,
	dislikedRecipes: IRecipe[]
) {
	const dislikedRecipesString = dislikedRecipes.map((r) => r.name).join(",");

	const completion = await groq.chat.completions.create({
		messages: [
			{
				role: "system",
				content: `You are a recipe database that outputs recipes in strict JSON format. The JSON object must strictly adhere to the following schema: ${JSON.stringify(
					schema,
					null,
					4
				)}. Do not include these recipes: ${dislikedRecipesString}. Ensure the response is valid JSON and follows this structure exactly. Return an array of 5 recipes. For each recipe, include detailed information such as the recipe name, preparation time, cooking time, serving size, a list of ingredients with their respective quantities, and comprehensive step-by-step instructions for preparation. Each instruction step should be descriptive and provide detailed guidance on how to perform each action, with explanations where necessary. If the user enters a single ingredient, fetch recipes with that ingredient as the main one.`,
			},
			{
				role: "user",
				content: userInput,
			},
		],

		model: "mixtral-8x7b-32768",
		temperature: 0,
		stream: false,
		response_format: { type: "json_object" },
	});

	return completion.choices[0].message.content;
}
