const fs = require('fs')

module.exports = paths => {
    // retorna uma promise paara casos de varios arquivos
    return new Promise((resolver, reject) => {
        try {
            // Mapeando o caminho do arquivo, para o conteudo do arquivo
            const rows = paths
                .map(path => fs.readFileSync(path).toString('utf-8'))
                .reduce((fullText, fileText) => `${fullText}\n${fileText}`) // Jutando todos os conteudos em uma string
                .split('\n') // Retornando todas as linhas
            resolver(rows)
        } catch (e) {
            reject(e)
        }
    })
}