import { useState } from "react";

// components
import AlertBanner from "./assets/components/AlertBanner/AlertBanner";
import ScrollingText from "./assets/components/ScrollingText/ScrollingText";
import MainContainer from "./assets/components/MainContainer/MainContainer";

const App = () => {
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

  return (
    <div className="min-h-screen bg-black flex flex-col md:items-center md:justify-center p-4 text-white relative font-pretendard">
      <AlertBanner />
      <MainContainer
        setKeyword={setKeyword}
        results={results}
        setResults={setResults}  {/* 여기서 setResults 함수를 전달 */}
        loading={loading}
        handleSearch={handleSearch}
        popularKeywords={popularKeywords}
      />
      <ScrollingText />
    </div>
  );
};

export default App;
