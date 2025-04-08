from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 시 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chrome_options = Options()
chrome_options.add_argument("--headless")       # 헤드리스 모드 활성화
chrome_options.add_argument("--disable-gpu")      # GPU 가속 비활성화
# 필요한 경우 추가 옵션: --no-sandbox, --disable-dev-shm-usage 등

@app.get("/search")
def jobsearch(query: str = Query(..., description="검색어 입력")):
    try:
        # webdriver_manager로 최신 드라이버 다운로드 (Mac Intel용)
        # 만약 자동 선택 시 오류가 발생하면, 아래와 같이 버전을 직접 지정해 보세요.
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)

        driver.get("https://www.jobkorea.co.kr")

        # 검색창 찾기 및 검색어 입력
        element = driver.find_element(By.CLASS_NAME, "smKey")
        input_box = element.find_element(By.ID, "stext")
        input_box.send_keys(query)
        input_box.send_keys(Keys.ENTER)

        # 검색 결과 크롤링
        links = []
        joblist = driver.find_element(By.CLASS_NAME, "list")
        jobsections = joblist.find_elements(By.CLASS_NAME, "list-section-information")
        for section in jobsections:
            anchors = section.find_elements(By.TAG_NAME, "a")
            for a in anchors:
                links.append([a.get_attribute("href"), a.text])

        driver.quit()

        # JSON 형식으로 변환
        json_list = [{"link": item[0], "content": item[1]} for item in links]
        print(json.dumps(json_list, ensure_ascii=False, indent=2))
        return json_list

    except Exception as e:
        # 오류 발생 시 상세 메시지를 반환합니다.
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
