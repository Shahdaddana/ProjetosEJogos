/*
const websiteUrl = 'https://www.gisa.energisa.com.br'
import { launch } from 'puppeteer'

async function getContentFromWebsite(url) {
    // Inicializar o Puppeteer
    const browser = await launch()
    const page = await browser.newPage()

    try {
        // Carregar a página da web
        await page.goto(url, { waitUntil: 'networkidle2' })

        // Extrair o conteúdo da página
        const content = await page.content()

        return content
    } catch (error) {
        console.error('Erro ao acessar o site:', error)
        return null
    } finally {
        // Fechar o navegador
        await browser.close()
    }
}

// Chamada da função para obter o conteúdo da página
getContentFromWebsite(websiteUrl)
    .then(content => {
        console.log(content)
    })
    .catch(error => {
        console.error('Erro:', error)
    })
*/



    import { launch } from 'puppeteer';

    const websiteUrl = 'https://www.gisa.energisa.com.br'
    
    async function automatizarGisa() {
        const browser = await launch();
        const page = await browser.newPage();
    
        try {
            //1. Acessar o site
            await page.goto(websiteUrl, { waitUntil: 'networkidle2' });
    
            //2. Preencher o formulário com UF "SE" e Assunto "Segunda Via"
            const inputElement = document.querySelector('input.vs__search');
            inputElement.setAttribute('aria-activedescendant', 'vs1__option-0');

            

           
            
            console.log(await page.content())
    
            // Clicar no botão "Falar com Gisa"
            //await page.click('button[type="submit"]');
    
            // Esperar até que a página de conversa esteja pronta
            //await page.waitForSelector('.message-input');
    
            // 3. Clicar em "Começar"
            //await page.click('.message-input button');
    
            // 4. Digitar "segunda via" e enviar
            //await page.type('.message-input textarea', 'segunda via');
            //await page.keyboard.press('Enter');
    
            // 5. Digitar "simplificada" e enviar
            //await page.type('.message-input textarea', 'simplificada');
            //await page.keyboard.press('Enter');
    
            // 6. Digitar "00854639063" e enviar
            //await page.type('.message-input textarea', '00854639063');
            //await page.keyboard.press('Enter');
    
            // 7. Digitar "Unidade Consumidora" e enviar
            //await page.type('.message-input textarea', 'Unidade Consumidora');
            //await page.keyboard.press('Enter');
    
            // 8. Digitar "38142903" e enviar
            //await page.type('.message-input textarea', '38142903');
            //await page.keyboard.press('Enter');
    
            // 9. Digitar "sim" e enviar
            //await page.type('.message-input textarea', 'sim');
            //await page.keyboard.press('Enter');
    
            // Esperar um pouco para receber o código PIX
            //await page.waitForTimeout(3000);
    
            // Pegar o código PIX recebido
            //const pixCode = await page.evaluate(() => {
            //    const lastMessage = document.querySelector('.messages-list li:last-child .message-text');
            //    return lastMessage.textContent.trim();
            //});
    
            // Imprimir o código PIX no console
            //console.log('Código PIX recebido:', pixCode);
        } catch (error) {
            console.error('Erro ao executar a automação:', error);
        } finally {
            // Fechar o navegador
            await browser.close();
        }
    }
    
    // Chamar a função para automatizar o processo
    automatizarGisa();
    