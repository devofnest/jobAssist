from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from flask import Flask
from selenium.webdriver.chrome.options import Options
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

chrome_options = Options()
chrome_options.add_argument("--headless")  # 헤드리스 모드 활성화
chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화 (일부 환경에서 필요)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# uvicorn main:app --reload --host 0.0.0.0 --port 8000

@app.get("/search")
def jobsearch(input):
# WebDriver 실행
    service=Service("chromedriver-win64/chromedriver.exe")
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get("https://www.jobkorea.co.kr")
    element = driver.find_element(By.CLASS_NAME,"smKey")
    elements = element.find_element(By.ID, "stext")
    elements.send_keys(input)
    elements.send_keys(Keys.ENTER)
    link = []
    joblist = driver.find_element(By.CLASS_NAME, "list")
    jobtitle = joblist.find_elements(By.CLASS_NAME,"list-section-information")
    for i in range(len(jobtitle)):
        hiper = jobtitle[i].find_elements(By.TAG_NAME, "a")
        for i in range(len(hiper)):
            link.append([hiper[i].get_attribute("href"),hiper[i].text])
    # print("성공했습니다")
    driver.quit()

    return link

print("****성공했습니다****")