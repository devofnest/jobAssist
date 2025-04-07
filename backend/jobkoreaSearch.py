# jobkoreaSearch.py
from fastapi import FastAPI, Query
from typing import Optional

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

app = FastAPI()

# 크롬옵션
chrome_options = Options()
chrome_options.add_argument("--headless")  # 브라우저 창 없이 실행
chrome_options.add_argument("--disable-gpu")
# 필요하면 아래 주석 해제
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--disable-dev-shm-usage")

# Mac용 크롬드라이버 경로
CHROMEDRIVER_PATH = "../chromedriver-mac-arm64/chromedriver" 
# ↑ 폴더 위치에 맞춰서 수정하세요. 
# 만약 backend 폴더 안에 chromedriver가 있다면 "./chromedriver-mac-arm64/chromedriver" 등으로

@app.get("/search")
def jobsearch(input: Optional[str] = Query(None)):
    # 크롬드라이버 실행
    service = Service(CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # JobKorea 메인 페이지 접속
    driver.get("https://www.jobkorea.co.kr")

    # 검색창 찾아서 입력
    element = driver.find_element(By.CLASS_NAME, "smKey")
    input_box = element.find_element(By.ID, "stext")

    if input:
        input_box.send_keys(input)
    else:
        input_box.send_keys("개발자")  # 디폴트 검색어
    input_box.send_keys(Keys.ENTER)

    # 크롤링
    link = []
    joblist = driver.find_element(By.CLASS_NAME, "list")
    jobtitle = joblist.find_elements(By.CLASS_NAME, "list-section-information")

    for jt in jobtitle:
        hiper = jt.find_elements(By.TAG_NAME, "a")
        for h in hiper:
            href = h.get_attribute("href")
            text = h.text
            link.append([href, text])

    driver.quit()
    return {"result": link}
