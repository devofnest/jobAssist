from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from flask import flask

service=Service("chromedriver-win64/chromedriver.exe")
driver = webdriver.Chrome(service=service)
