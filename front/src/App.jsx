import { useState } from "react";
import { Search } from "lucide-react";

function App() {
	const [selectedSites] = useState({
		jobkorea: true,
		saramin: false,
	});

	const [keyword, setKeyword] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		if (!keyword.trim()) return;

		setLoading(true);

		try {
			const response = await fetch(
				`http://localhost:8000/search?query=${encodeURIComponent(keyword)}`
			);
			if (!response.ok) throw new Error("네트워크 응답에 문제가 있습니다.");

			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error("검색 결과를 불러오는데 실패했습니다:", error);
		} finally {
			setLoading(false);
		}
	};

	const popularKeywords = ["프론트", "백엔드", "React", "Python", "데이터"];

	const handlePopularClick = (word) => {
		setKeyword(word);
		setTimeout(() => {
			handleSearch();
		}, 0);
	};

	return (
		<div className="min-h-screen bg-black font-pretendard flex items-center justify-center p-4 text-white relative">

			{/* 중앙 정렬된 메인 컨테이너 */}
			<div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl z-10">
				{/* 검색폼 영역 */}
				<div className="flex-1 bg-neutral-800/50 backdrop-blur-md shadow-lg border-4 border-white/20 rounded-2xl p-8">
					<h2 className="text-2xl font-bold mb-4">
						인크루트 도메인을 선택해주세요
					</h2>

					{/* 추천 키워드 */}
					<div className="mb-4">
						<h3 className="text-sm text-gray-300 mb-2">
							자주 검색되는 키워드
						</h3>
						<div className="flex flex-wrap gap-2">
							{popularKeywords.map((word, idx) => (
								<button
									key={idx}
									onClick={() => handlePopularClick(word)}
									className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition"
								>
									#{word}
								</button>
							))}
						</div>
					</div>

					{/* 체크박스 */}
					<div className="flex gap-4 mb-4">
						<label className="flex items-center gap-2 font-medium">
							<input type="checkbox" checked readOnly />
							잡코리아
						</label>
						<label className="flex items-center gap-2 font-medium text-gray-500">
							<input type="checkbox" checked={false} disabled />
							사람인
						</label>
					</div>

					{/* 검색창 + 버튼 내부 배치 */}
					<div className="relative mb-4">
						<input
							type="text"
							placeholder="검색어 입력"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							className="border-2 border-white rounded-lg px-3 pr-28 w-full bg-neutral-900/70 backdrop-blur-md h-10 text-white placeholder-gray-400"
						/>

						<button
							onClick={handleSearch}
							className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white text-black h-8 px-3 rounded-md flex items-center gap-1 text-sm font-semibold hover:bg-gray-300 transition"
						>
							<span>SEARCH</span>
							<Search size={16} />
						</button>
					</div>

				</div>

				{/* 결과 영역 */}
				<div className="relative flex-1 bg-neutral-800/50 backdrop-blur-md shadow-lg border-4 border-white/20 rounded-2xl p-8 max-h-[780px] overflow-y-auto">
					<h2 className="text-lg font-semibold mb-2">
						통합 검색 결과입니다.
					</h2>
					<p className="text-sm text-gray-300 mb-2">
						해당 결과는 클릭 시 해당 구직사이트로 이동 가능합니다.
					</p>

					{/* 🔄 로딩 오버레이: 카드 내부에만 적용 */}
					{loading && (
						<div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
							<div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}

					{results.length > 0 ? (
						<ul className="mt-2 space-y-2 relative z-0">
							{results.map((item, index) => (
								<li
									key={index}
									className="bg-gray-700/50 p-2 rounded-lg shadow-sm font-normal border-2 border-white"
								>
									<a
										href={item.link}
										target="_blank"
										rel="noreferrer"
										className="hover:underline"
									>
										{item.content || "내용 없음"}
									</a>
								</li>
							))}
						</ul>
					) : !loading && (
						<div className="text-center text-gray-400 mt-4">
							검색 결과가 없습니다.
						</div>
					)}
				</div>

			</div>
		</div>
	);
}

export default App;
