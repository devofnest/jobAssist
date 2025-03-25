import { useState } from "react";
// JSON 파일 직접 import
import dummyData from "./data/dummy_data.json";

function App() {
	// 체크박스(잡코리아, 사람인) 상태
	const [selectedSites, setSelectedSites] = useState({
		jobkorea: false,
		saramin: false,
	});

	// 검색어 상태
	const [keyword, setKeyword] = useState("");

	// 검색 결과 상태
	const [results, setResults] = useState([]);

	// 체크박스 핸들러
	const handleCheckboxChange = (site) => {
		setSelectedSites((prev) => ({
			...prev,
			[site]: !prev[site],
		}));
	};

	// 검색 버튼 클릭 시 실행
	const handleSearch = () => {
		// 어떤 사이트가 선택되었는지 배열로 만들기
		const siteList = [];
		if (selectedSites.jobkorea) siteList.push("jobkorea");
		if (selectedSites.saramin) siteList.push("saramin");

		// 소문자로 변환하여 대소문자 구분 없이 검색
		const lowerKeyword = keyword.toLowerCase();
		let tempResults = [];

		// siteList에 있는 각 사이트에 대해 dummyData를 검색
		siteList.forEach((site) => {
			// dummyData에 해당 사이트가 있으면
			if (dummyData[site]) {
				// 해당 사이트의 모든 채용정보를 순회
				dummyData[site].forEach((job) => {
					const titleMatch = job.title
						.toLowerCase()
						.includes(lowerKeyword);
					const descMatch = job.description
						.toLowerCase()
						.includes(lowerKeyword);

					// title 또는 description에 검색어가 포함되면 결과로 추가
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

		// 결과 상태에 저장
		setResults(tempResults);
	};

	return (
		<div style={{ padding: "20px" }}>
			<h1>통합 검색 (클라이언트 사이드)</h1>

			{/* 체크박스 */}
			<div style={{ marginBottom: "10px" }}>
				<label style={{ marginRight: "10px" }}>
					<input
						type="checkbox"
						checked={selectedSites.jobkorea}
						onChange={() => handleCheckboxChange("jobkorea")}
					/>
					잡코리아
				</label>
				<label>
					<input
						type="checkbox"
						checked={selectedSites.saramin}
						onChange={() => handleCheckboxChange("saramin")}
					/>
					사람인
				</label>
			</div>

			{/* 검색어 입력 & 검색 버튼 */}
			<div style={{ marginBottom: "10px" }}>
				<input
					type="text"
					placeholder="검색어 입력"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<button onClick={handleSearch} style={{ marginLeft: "5px" }}>
					검색
				</button>
			</div>

			{/* 검색 결과 */}
			<h2>검색 결과</h2>
			<ul>
				{results.map((item, index) => (
					<li key={index}>
						[{item.site}] {item.title} @ {item.company}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
