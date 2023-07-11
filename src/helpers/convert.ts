import puppeteer from 'puppeteer';

async function convert(value: string, base: string, end: string) {
    const valueCoin = value;
    const coinBase = base;
    const coinEnd = end;

    try {

        const umountedUrl = urlCoinInsert(valueCoin, coinBase, coinEnd);

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(umountedUrl);

        const result = await page.evaluate(() => {
            const ElementHtml = document.querySelector('.lWzCpb.a61j6') as HTMLInputElement;
            return ElementHtml.value;
        });

        await browser.close();
        return {
            value: result,
            error: false,
        };

    } catch (error) {
        return {
            value: `Erro ao fazer o Scraping, confira se inseriu moedas validas e tente novamente ou consulte o adm do site!`,
            error: true,
        };
    };
};

function urlCoinInsert(value: string, base: string, end: string) {
    return `https://www.google.com/search?q=${value}+${base}+para+${end}`;
};

export default convert;