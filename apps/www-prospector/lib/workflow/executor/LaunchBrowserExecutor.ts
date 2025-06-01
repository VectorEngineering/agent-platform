import { ExecutionEnvironment } from '@/types/executor'
import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser'
import chromium from '@sparticuz/chromium'
import puppeteerCore from 'puppeteer-core'

chromium.setGraphicsMode = false
export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {
        const websiteUrl = environment.getInput('Website Url')
        const browser = await puppeteerCore.launch({
            headless: true,
            executablePath: await chromium.executablePath(),
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            ignoreDefaultArgs: ['--disable-extensions']
        })
        environment.log.info('Browser started successfully')
        environment.setBrowser(browser as any)
        const page = await browser.newPage()
        await page.goto(websiteUrl)
        environment.setPage(page as any)
        environment.log.info(`Opened page at: ${websiteUrl}`)

        return true
    } catch (error: any) {
        environment.log.error(error.message)
        return false
    }
}
