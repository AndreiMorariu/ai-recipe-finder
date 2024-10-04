import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RecipeDetails from "./pages/RecipeDetails";
import Home from "./pages/Home";

import { RecipeProvider } from "./context/RecipeContext";

function App() {
	return (
		<RecipeProvider>
			<Toaster position="top-center" />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/recipe/:recipeName" element={<RecipeDetails />} />
				</Routes>
			</Router>
		</RecipeProvider>
	);
}

export default App;
