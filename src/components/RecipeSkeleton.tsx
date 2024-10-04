function RecipeSkeleton() {
	return (
		<div className="flex rounded-lg shadow-lg animate-pulse">
			<div>
				<div className="rounded-l-lg w-24 h-full bg-gray-200"></div>
			</div>
			<div className="px-4 py-6">
				<div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
				<div className="h-3 bg-gray-200 rounded w-24"></div>
			</div>
		</div>
	);
}

export default RecipeSkeleton;
