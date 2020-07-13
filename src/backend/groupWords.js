// Recebe um array de palavras


module.exports = words => {
    return new Promise((resolver, reject) => {
        try {
            //  Transformaçãoa ser feita
            // ['ana', 'ana', 'ana', 'bia', 'bia']
            // { ana: 3, bia: 2 }
            // ['ana', 'bia']

            const groupedWords = words.reduce((obj, word) => {
                // Verificando que uma palavra ja existe
                if (obj[word]) {
                    obj[word] = obj[word] + 1
                } else { //caso seja uma palavra nova
                    obj[word] = 1
                }
                return obj
            }, {})

            // Gerando um array com as palavras sem duplição
            const groupedWordsArray = Object
                .keys(groupedWords)
                .map(key => ({ name: key, amount: groupedWords[key] })) // gerando o objeto com palavra e quantidade
                .sort((w1, w2) => w2.amount - w1.amount) // Ordenando de forma decrescente

            resolver(groupedWordsArray)
        } catch (e) {
            reject(e)
        }
    })
}
