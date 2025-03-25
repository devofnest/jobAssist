import { useState } from "react";
import dummyData from "./data/dummy_data.json";

function App() {
	const [selectedSites, setSelectedSites] = useState({
		jobkorea: false,
		saramin: false,
	});

	const [keyword, setKeyword] = useState("");
	const [results, setResults] = useState([]);

	const handleCheckboxChange = (site) => {
		setSelectedSites((prev) => ({
			...prev,
			[site]: !prev[site],
		}));
	};

	const handleSearch = () => {
		const siteList = [];
		if (selectedSites.jobkorea) siteList.push("jobkorea");
		if (selectedSites.saramin) siteList.push("saramin");

		const lowerKeyword = keyword.toLowerCase();
		let tempResults = [];

		siteList.forEach((site) => {
			if (dummyData[site]) {
				dummyData[site].forEach((job) => {
					const titleMatch = job.title
						.toLowerCase()
						.includes(lowerKeyword);
					const descMatch = job.description
						.toLowerCase()
						.includes(lowerKeyword);

					if (titleMatch || descMatch) {
						tempResults.push({
							site: site,
							title: job.title,
							company: job.company,
						});
					}
				});
			}
		});

		setResults(tempResults);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="bg-white/50 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					통합 검색 (Glassmorphism)
				</h1>

				<div className="flex gap-4 mb-4">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={selectedSites.jobkorea}
							onChange={() => handleCheckboxChange("jobkorea")}
						/>
						잡코리아
					</label>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={selectedSites.saramin}
							onChange={() => handleCheckboxChange("saramin")}
						/>
						사람인
					</label>
				</div>

				<div className="flex items-center gap-2 mb-4">
					<input
						type="text"
						placeholder="검색어 입력"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white/70 backdrop-blur-md"
					/>
					<button
						onClick={handleSearch}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
					>
						검색
					</button>
				</div>

				<h2 className="text-lg font-semibold text-gray-700">
					검색 결과
				</h2>
				<ul className="mt-2 space-y-2">
					{results.map((item, index) => (
						<li
							key={index}
							className="bg-gray-100/60 p-2 rounded-lg shadow-sm"
						>
							[{item.site}] {item.title} @ {item.company}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
