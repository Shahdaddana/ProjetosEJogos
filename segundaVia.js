import { launch } from 'puppeteer'
const website = 'https://www.gisa.energisa.com.br'
const website2 = 'https://energisa.chat.blip.ai/?appKey=ZW5lcmdpc2FzZXJnaXBlZXNlcHJkOmM4MTQxYmQyLWQ0YzMtNGFiNi1hNjBkLTdiZWUyODAyMmZkNQ=='

function teste(){
    
    document.getElementById('codigo').value = 1
}

async function esperar(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    })
}

async function abrirChat(url){
    const browser = await launch({
        headless:  false,
        defaultViewport: false,
        devtools: false
    })
    const page = await browser.newPage()
    await page.goto(url)
    /*
    await page.evaluate(() => {
        console.log('ola')
    })
    */
    //1. Altera o estado de origem, assunto e abre o chat
    const caixaUF = await page.$('#uf')
    await caixaUF.click()
    await page.keyboard.type('SE')
    await page.keyboard.press('Enter')
    const caixaAcao = await page.$('#about')
    await caixaAcao.click()
    await page.keyboard.type('Segunda Via')
    await page.keyboard.press('Enter')
    const falarComGisa = await page.$('button.btn')
    await falarComGisa.click()
}


async function receberCodigoPix(matricula){
    const browser = await launch({
        headless:  false,
        defaultViewport: false,
        devtools: false
    })
    const page = await browser.newPage()
    await page.goto(website2)
    
    await page.waitForSelector('button.blip-chat-start')
    await page.click('button.blip-chat-start')

    await esperar(8000)
    const textarea = await page.$('#msg-textarea');
    await textarea.click()
    await page.keyboard.type('1')
    await page.keyboard.press('Enter')

    await esperar(8000)
    await page.keyboard.type('simplificada')
    await page.keyboard.press('Enter')

    await esperar(5000)
    await page.keyboard.type('89751123062')
    await page.keyboard.press('Enter')

    await esperar(5000)
    await page.keyboard.type('unidade consumidora')
    await page.keyboard.press('Enter')

    await esperar(5000)
    await page.keyboard.type(matricula)// 38142903
    await page.keyboard.press('Enter')

    await esperar(5000)
    await page.keyboard.type('sim')
    await page.keyboard.press('Enter')

    await esperar(10000)
    const conteudo = await page.content()
    const conteudoCortado = conteudo.substring(conteudo.length - 17000)
    const posicaoPix = conteudoCortado.indexOf("pix")
    const posicaoMaiorAntes = conteudoCortado.lastIndexOf(">", posicaoPix)
    const posicaoMenorDepois = conteudoCortado.indexOf("<", posicaoPix)
    const qrCode = conteudoCortado.substring(posicaoMaiorAntes + 1, posicaoMenorDepois)
    await browser.close()
    return qrCode
}

 const codigo = await receberCodigoPix('38142903')
 console.log(codigo)