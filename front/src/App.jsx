import { useState } from "react";
import { Search } from "lucide-react";
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

	// const handleSearch = () => {
	// 	const siteList = [];
	// 	if (selectedSites.jobkorea) siteList.push("jobkorea");
	// 	if (selectedSites.saramin) siteList.push("saramin");

	// 	const lowerKeyword = keyword.toLowerCase().trim();
	// 	const keywordParts = lowerKeyword.split(" "); // 띄어쓰기 기준으로 단어 나누기

	// 	let tempResults = [];

	// 	siteList.forEach((site) => {
	// 		if (dummyData[site]) {
	// 			dummyData[site].forEach((job) => {
	// 				const title = job.title.toLowerCase();
	// 				const desc = job.description.toLowerCase();

	// 				// 각 단어(keywordParts 중 하나라도)가 title이나 description에 포함되는지 검사
	// 				const matches = keywordParts.some(
	// 					(word) => title.includes(word) || desc.includes(word)
	// 				);

	// 				if (matches) {
	// 					tempResults.push({
	// 						site: site,
	// 						title: job.title,
	// 						company: job.company,
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});

	// 	setResults(tempResults);
	// };

	// 백엔드 API 호출을 위한 handleSearch 함수 (비동기)
	const handleSearch = async () => {
		if (!keyword.trim()) return;
		try {
			// 변경: 포트 번호를 8000으로 수정
			const response = await fetch(
				`http://localhost:8000/search?query=${encodeURIComponent(
					keyword
				)}`
			);
			if (!response.ok) {
				throw new Error("네트워크 응답에 문제가 있습니다.");
			}
			const data = await response.json();
			setResults(data.results || []);
		} catch (error) {
			console.error("검색 결과를 불러오는데 실패했습니다:", error);
		}
	};

	// 추천 키워드 리스트 (컴포넌트 내 상단에 추가)
	const popularKeywords = ["프론트", "백엔드", "React", "Python", "데이터"];

	// 추천 키워드 클릭 시 호출되는 함수
	const handlePopularClick = (word) => {
		setKeyword(word); // input에 텍스트 입력
		setTimeout(() => {
			handleSearch(); // 바로 검색 실행
		}, 0); // setState 후 실행되도록 약간 지연
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 font-pretendard">
			<h1 className="text-3xl font-black text-gray-800 mb-8">
				구직 통합 검색
			</h1>

			<div className="bg-white/50 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					인크루트 도메인을 선택해주세요
				</h2>
				{/* 이 부분은 검색창 위에 추가해주세요 */}
				<div className="mb-4">
					<h3 className="text-sm text-gray-600 mb-2">
						자주 검색되는 키워드
					</h3>
					<div className="flex flex-wrap gap-2">
						{popularKeywords.map((word, idx) => (
							<button
								key={idx}
								onClick={() => handlePopularClick(word)}
								className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full transition"
							>
								#{word}
							</button>
						))}
					</div>
				</div>

				<div className="flex gap-4 mb-4">
					<label className="flex items-center gap-2 font-medium">
						<input
							type="checkbox"
							checked={selectedSites.jobkorea}
							onChange={() => handleCheckboxChange("jobkorea")}
						/>
						잡코리아
					</label>
					<label className="flex items-center gap-2 font-medium">
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
						className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white/70 backdrop-blur-md h-10"
					/>
					<button
						onClick={handleSearch}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center h-10 w-10"
					>
						<Search size={20} />
					</button>
				</div>
			</div>

			<div className="bg-white/50 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8 w-full max-w-md mt-6">
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					검색 결과
				</h2>
				<ul className="mt-2 space-y-2">
					{results.map((item, index) => (
						// <li
						// 	key={index}
						// 	className="bg-gray-100/60 p-2 rounded-lg shadow-sm font-normal"
						// >
						// 	[{item.site}] {item.title} @ {item.company}
						// </li>
						<li
							key={index}
							className="bg-gray-100/60 p-2 rounded-lg shadow-sm font-normal"
						>
							<a href={item[0]} target="_blank" rel="noreferrer">
								{item[1] ? item[1] : "제목 없음"}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
