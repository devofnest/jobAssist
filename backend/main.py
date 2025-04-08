from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from webdriver_manager.chrome import ChromeDriverManager
import json  # 추가: json 모듈 임포트

app = FastAPI()

chrome_options = Options()
chrome_options.add_argument("--headless")       # 헤드리스 모드 활성화
chrome_options.add_argument("--disable-gpu")      # GPU 가속 비활성화

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (개발용)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search")
def jobsearch(query: str = Query(..., description="검색어 입력")):
    # 최신 크롬드라이버 자동 다운로드 및 실행 (Mac에서는 Intel 버전 사용)
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    driver.get("https://www.jobkorea.co.kr")
    
    # 검색창 찾기 및 검색어 입력
    element = driver.find_element(By.CLASS_NAME, "smKey")
    input_box = element.find_element(By.ID, "stext")
    input_box.send_keys(query)
    input_box.send_keys(Keys.ENTER)
    
    # 결과 수집
    links = []
    joblist = driver.find_element(By.CLASS_NAME, "list")
    jobtitle = joblist.find_elements(By.CLASS_NAME, "list-section-information")
    for section in jobtitle:
        anchors = section.find_elements(By.TAG_NAME, "a")
        for a in anchors:
            links.append([a.get_attribute("href"), a.text])
    
    driver.quit()
    json_list = [{"link": item[0], "content": item[1]} for item in links]
    print(json.dumps(json_list, ensure_ascii=False, indent=2))
    
    return json_list

print("****성공했습니다****")
