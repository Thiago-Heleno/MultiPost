import asyncio
import os
import random
import subprocess
import threading
import time

import customtkinter
import requests
from selenium import webdriver
from selenium.webdriver import ActionChains, Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def main(socialMedia: str):
    if socialMedia == "TikTok":
        Tiktok()
        print("Tiktok")
    if socialMedia == "Instagram":
        # Instagram()
        print("IG")
    if socialMedia == "YouTube":
        # Youtube()
        print("Youtube")

    return


def Tiktok():
    try:
        browser.get("https://www.tiktok.com/upload?lang=pt-BR")

        # Wait for the iframe to be present before switching to it
        iframe = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "iframe"))
        )
        browser.switch_to.frame(iframe)

        # Locate the file input element and upload a file
        file_input = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[@id="root"]/div/div/div/div/div/div/div/input')
            )
        )
        file_input.send_keys(os.getcwd() + "/data/video.mp4")

        # Click the upload button
        upload_button = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[@id="root"]/div/div/div/div/div/div/div/input')
            )
        )
        upload_button.click()

        videoTitleInput = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    '//*[@id="root"]/div/div/div/div[2]/div[2]/div[2]/div[1]/div/div[1]/div[2]/div/div/div/div/div/div/div/div/div/span/span',
                )
            )
        )
        # Set the inner text of the element using JavaScript
        new_text = "New Video Title"
        browser.execute_script(
            "arguments[0].innerText = arguments[1];", videoTitleInput, new_text
        )

        uploadBtn = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    '//*[@id="root"]/div/div/div/div[2]/div[2]/div[2]/div[8]/div[2]',
                )
            )
        )
        uploadBtn.click()

        print("DONE")

        browser.switch_to.default_content()
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False
    finally:
        browser.quit()


def Instagram():
    try:
        browser.get("https://www.instagram.com")
    except:
        print("Site didn't load")
        return False


def Youtube():
    try:
        browser.get("https://www.youtube.com")
    except:
        print("Site didn't load")
        return False


# Init Variables and Browser
service = Service(
    executable_path="C:\\Users\\theki\\OneDrive\\Documents\\dyrkClothing\\MultiUpload\\chromedriver.exe"
)

chrome_options = Options()
chrome_options.add_argument(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
)
chrome_options.add_experimental_option("debuggerAddress", "localhost:9222")

browser = webdriver.Chrome(options=chrome_options, service=service)


def Start():
    social_medias = ["TikTok", "Instagram", "YouTube"]
    for social_media in social_medias:
        main(social_media)


customtkinter.set_appearance_mode("System")
customtkinter.set_default_color_theme("dark-blue")
root = customtkinter.CTk()
root.title("MultiPost")
root.geometry("500x350")
frame = customtkinter.CTkFrame(master=root)
frame.pack(pady=20, padx=60, fill="both", expand=True)
label = customtkinter.CTkLabel(master=frame, text="MultiPost", font=("Roboto", 24))
label.pack(pady=12, padx=10)
button = customtkinter.CTkButton(master=frame, text="Upload", command=Start)
button.pack(pady=12, padx=10)

root.mainloop()
