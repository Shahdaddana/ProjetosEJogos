function receberQR(urlDaImagem){
    let img = new Image()
    img.onload = function() {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        let imageData = ctx.getImageData(0, 0, img.width, img.height)
        let code = jsQR(imageData.data, imageData.width, imageData.height)
        const texto = document.getElementById('texto')
        let textoFinal = ""
        
        if (code) {
            // Envia apenas o conteúdo do código
            textoFinal = code.data

            // Envia o conteúdo em formatação WIFI
            if (code.data.includes("WIFI") && code.data.includes("P")) {
                const regexNome = /S:(.*?);/;
                const matchNome = regexNome.exec(code.data);
                const nomeDaRede = matchNome && matchNome[1];
                
                const regexSenha = /P:(.*?);/;
                const matchSenha = regexSenha.exec(code.data);
                const senhaDaRede = matchSenha && matchSenha[1];
                
                textoFinal = "Wifi: " + nomeDaRede + "\n" + "Senha: " + senhaDaRede;
            }
        }
        if (!code){
            textoFinal = "erro"
        }
        texto.value = textoFinal
    }
    img.src = urlDaImagem
}