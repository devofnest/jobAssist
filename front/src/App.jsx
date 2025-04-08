import { useState } from "react";
import { Search } from "lucide-react";

function App() {
	// 잡코리아는 항상 사용, 사람인은 사용 불가 상태로 고정
	const [selectedSites] = useState({
		jobkorea: true,
		saramin: false,
	});

	const [keyword, setKeyword] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	// 백엔드 API 호출 (비동기)
	const handleSearch = async () => {
		if (!keyword.trim()) return;

		setLoading(true); // 검색 시작 시 로딩 활성화

		try {
			const response = await fetch(
				`http://localhost:8000/search?query=${encodeURIComponent(
					keyword
				)}`
			);
			if (!response.ok) {
				throw new Error("네트워크 응답에 문제가 있습니다.");
			}
			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error("검색 결과를 불러오는데 실패했습니다:", error);
		} finally {
			setLoading(false); // 검색 완료 후 로딩 비활성화
		}
	};

	// 추천 키워드 리스트
	const popularKeywords = ["프론트", "백엔드", "React", "Python", "데이터"];

	// 추천 키워드 클릭 시 동작: 검색어 설정 후 검색 실행
	const handlePopularClick = (word) => {
		setKeyword(word);
		setTimeout(() => {
			handleSearch();
		}, 0);
	};

	return (
		<div className="min-h-screen bg-white p-8 font-pretendard">
			<h1 className="text-3xl font-black text-gray-800 mb-8 text-center">
				구직 통합 검색
			</h1>

			{/* 반응형 레이아웃 컨테이너: 모바일은 수직, md 이상은 좌우 배치 */}
			<div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
				{/* 검색폼 영역 */}
				<div className="flex-1 bg-white/50 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						인크루트 도메인을 선택해주세요
					</h2>

					{/* 추천 키워드 영역 */}
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

					{/* 체크박스 영역 */}
					<div className="flex gap-4 mb-4">
						{/* 잡코리아: 항상 체크, 변경 불가 */}
						<label className="flex items-center gap-2 font-medium">
							<input type="checkbox" checked readOnly />
							잡코리아
						</label>
						{/* 사람인: 비활성화 처리 */}
						<label className="flex items-center gap-2 font-medium">
							<input type="checkbox" checked={false} disabled />
							사람인
						</label>
					</div>

					{/* 검색창 영역 */}
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

				{/* 검색 결과 영역 */}
				<div className="flex-1 bg-white/50 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl p-8 max-h-[780px] overflow-y-auto">
					<h2 className="text-lg font-semibold text-gray-700 mb-2">
						통합 검색 결과입니다.
					</h2>
					<p>
						해당 결과는 클릭 시 해당 구직사이트로 이동 가능합니다.
					</p>
					{loading ? (
						<div className="text-center text-gray-600">
							검색 중...
						</div>
					) : results.length > 0 ? (
						<ul className="mt-2 space-y-2">
							{results.map((item, index) => (
								<li
									key={index}
									className="bg-gray-100/60 p-2 rounded-lg shadow-sm font-normal"
								>
									<a
										href={item.link}
										target="_blank"
										rel="noreferrer"
									>
										{item.content
											? item.content
											: "내용 없음"}
									</a>
								</li>
							))}
						</ul>
					) : (
						<div className="text-center text-gray-600">
							검색 결과가 없습니다.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
