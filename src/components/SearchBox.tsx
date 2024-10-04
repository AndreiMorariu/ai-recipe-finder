import { FaMagnifyingGlass } from "react-icons/fa6";

import { useRecipeContext } from "../context/RecipeContext";

function SearchBox() {
	const { getRecipes, userInput, setUserInput } = useRecipeContext();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await getRecipes(userInput, []);
	}

	return (
		<form className="mb-14" onSubmit={handleSubmit}>
			<div className="border border-slate-100 py-2 px-4 flex items-center justify-between rounded-xl">
				<input
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					placeholder="What do you feel like eating?"
					className="outline-none w-full"
				/>
				<button
					type="submit"
					className="flex items-center justify-center cursor-pointer"
				>
					<FaMagnifyingGlass />
				</button>
			</div>
		</form>
	);
}

export default SearchBox;
