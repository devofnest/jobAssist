import { Search } from "lucide-react";

const MainContainer = ({
	keyword,
	setKeyword,
	results,
	loading,
	handleSearch,
	popularKeywords,
	handlePopularClick,
}) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl z-10">
			{/* 검색 영역 */}
			<div
				role="search"
				aria-label="채용 공고 검색 폼"
				className="flex-1 bg-neutral-800/50 backdrop-blur-md shadow-lg border-4 border-white/20 rounded-2xl p-8"
			>
				<h2 className="text-2xl font-bold mb-4">검색할 도메인을 선택해주세요</h2>

				{/* 추천 키워드 */}
				<div className="mb-4">
					<h3 className="text-sm text-gray-300 mb-2">자주 검색되는 키워드</h3>
					<div className="flex flex-wrap gap-2" aria-label="추천 키워드 목록">
						{popularKeywords.map((word, idx) => (
							<button
								key={idx}
								onClick={() => handlePopularClick(word)}
								className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition"
								aria-label={`추천 키워드 ${word}`}
							>
								#{word}
							</button>
						))}
					</div>
				</div>

				{/* 체크박스 */}
				<div className="flex gap-4 mb-4" role="group" aria-label="도메인 선택">
					<label className="flex items-center gap-2 font-medium">
						<input type="checkbox" checked readOnly aria-checked="true" aria-label="잡코리아 선택됨" />
						잡코리아
					</label>
					<label className="flex items-center gap-2 font-medium text-gray-500">
						<input
							type="checkbox"
							checked={false}
							disabled
							aria-checked="false"
							aria-disabled="true"
							aria-label="사람인 비활성화"
						/>
						사람인
					</label>
				</div>

				{/* 검색창 */}
				<div className="relative mb-4">
					<label htmlFor="search-input" className="sr-only">
						검색어 입력
					</label>
					<input
						id="search-input"
						type="text"
						placeholder="검색어 입력"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						className="border-2 border-white rounded-lg px-3 pr-28 w-full bg-neutral-900/70 backdrop-blur-md h-10 text-white placeholder-gray-400"
						aria-label="검색어 입력"
					/>

					<button
						onClick={handleSearch}
						className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white text-black h-8 px-3 rounded-md flex items-center gap-1 text-sm font-semibold hover:bg-gray-300 transition"
						aria-label="검색 실행"
					>
						<span>SEARCH</span>
						<Search size={16} />
					</button>
				</div>
			</div>

			{/* 결과 영역 */}
			<div
				role="region"
				aria-label="검색 결과"
				aria-busy={loading}
				className="relative flex-1 bg-neutral-800/50 backdrop-blur-md shadow-lg border-4 border-white/20 rounded-2xl p-8 max-h-[780px] overflow-y-auto"
			>
				<h2 className="text-lg font-semibold mb-2">통합 검색 결과입니다.</h2>
				<p className="text-sm text-gray-300 mb-2">해당 결과는 클릭 시 해당 구직사이트로 이동 가능합니다.</p>

				{/* 로딩 */}
				{loading && (
					<div
						className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl"
						aria-live="polite"
					>
						<div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
					</div>
				)}

				{/* 결과 출력 */}
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
									aria-label={`공고 ${index + 1}: ${item.content || "내용 없음"}`}
								>
									{item.content || "내용 없음"}
								</a>
							</li>
						))}
					</ul>
				) : !loading && (
					<div className="text-center text-gray-400 mt-4">검색 결과가 없습니다.</div>
				)}
			</div>
		</div>
	);
}

export default MainContainer;
