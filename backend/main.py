from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from webdriver_manager.chrome import ChromeDriverManager

app = FastAPI()

chrome_options = Options()
chrome_options.add_argument("--headless")       # 헤드리스 모드 활성화
chrome_options.add_argument("--disable-gpu")    # GPU 가속 비활성화 (일부 환경에서 필요)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용 (개발용)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uvicorn main:app --reload --host 0.0.0.0 --port 8000

@app.get("/search")
def jobsearch(query: str = Query(..., description="검색어 입력")):
    # webdriver_manager를 사용하여 ChromeDriver 자동 다운로드 및 설정
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
    job_sections = joblist.find_elements(By.CLASS_NAME, "list-section-information")
    for section in job_sections:
        anchors = section.find_elements(By.TAG_NAME, "a")
        for a in anchors:
            links.append([a.get_attribute("href"), a.text])
            
    driver.quit()
    return {"results": links}

print("****성공했습니다****")
