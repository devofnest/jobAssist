from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from flask import flask

from fastapi import FastAPI

app = FastAPI()

@app.get("/search")
def jobsearch(input):
  service=Service("chromedriver-win64/chromedriver.exe")
  driver = webdriver.Chrome(service=service)
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
  return link