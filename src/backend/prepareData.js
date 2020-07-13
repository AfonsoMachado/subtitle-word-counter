
module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows
                .filter(filterValidRow)
                .map(hyphenatedWords)
                .map(removePunctuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(word => word.replace('"', ''))

            resolver(words)
        } catch (e) {
            reject(e)
        }
    })
}

function filterValidRow(row) {
    const notNumber = !parseInt(row.trim())
    const notEmpty = !!row.trim() // Se for uma linha vazia retorna falso
    const notInterval = !row.includes('-->') // Linhaque nao representa um intervalo de tempo
    return notNumber && notEmpty && notInterval
}

// Remove hífen das palavras
const hyphenatedWords = row => row.replace('-', ' ')
// Substitui os caracteres na reject por um espaço em branco
const removePunctuation = row => row.replace(/[,?!.-]/g, '')
// Remove possiveis tags encontradas nas legendas
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim()
//Juntando todas as linhas
const mergeRows = (fullText, row) => `${fullText} ${row}`