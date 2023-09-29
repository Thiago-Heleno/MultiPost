import asyncio
import random
import threading
import time

import requests
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async


class MultiPost:
    def __init__(self):
        pass

    async def main(self, socialMedia: str):
        print(socialMedia)
        async with async_playwright() as p:
            browser_type = p.chromium
            # browser_type.LaunchOptions().setExecutablePath(
            #     "C:\\Users\\theki\AppData\\Local\\Chromium\\Application\\chrome.exe"
            # )
            self.browser = await browser_type.launch(
                headless=False,
                executable_path="C:\\Users\\theki\AppData\\Local\\Chromium\\Application\\chrome.exe",
            )
            self.context = await self.browser.new_context()
            self.page = await self.context.new_page()
            await stealth_async(self.page)

            extra_headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                "Accept-Language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            }
            await self.page.set_extra_http_headers(extra_headers)

            if socialMedia == "TikTok":
                await self.Tiktok()
            if socialMedia == "Instagram":
                await self.Instagram()
            if socialMedia == "YouTube":
                await self.Youtube()

            await asyncio.sleep(random.uniform(4, 5))
            await self.browser.close()

    async def Tiktok(self):
        try:
            await self.page.goto("https://www.tiktok.com/explore")
        except:
            print("Site didn't load")
            await self.context.close()
            return False

        await asyncio.sleep(random.uniform(4, 5))
        await self.page.wait_for_load_state("networkidle")

    async def Instagram(self):
        try:
            await self.page.goto("https://www.instagram.com")
        except:
            print("Site didn't load")
            await self.context.close()
            return False

        await asyncio.sleep(random.uniform(4, 5))
        await self.page.wait_for_load_state("networkidle")

    async def Youtube(self):
        try:
            await self.page.goto("https://www.youtube.com")
        except:
            print("Site didn't load")
            await self.context.close()
            return False

        await asyncio.sleep(random.uniform(25, 30))
        await self.page.wait_for_load_state("networkidle")

    def thread_function(self, socialMedia: str):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.main(socialMedia))

    def start(self):
        social_medias = ["TikTok", "Instagram", "YouTube"]
        for social_media in social_medias:
            threading.Thread(target=self.thread_function, args=(social_media,)).start()
            time.sleep(1)


if __name__ == "__main__":
    MultiPost().start()
