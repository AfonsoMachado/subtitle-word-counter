// Processo principal
const { ipcMain } = require('electron')

const pathsToRows = require('./pathsToRows')
const prepareData = require('./prepareData')

ipcMain.on('process-subtitles', (event, paths) => {

    pathsToRows(paths)
        .then(rows => prepareData(rows))
        .then(words => console.log(words))
        .then(() => {
            event.reply('process-subtitles', [
                { name: 'you', amount: 900 },
                { name: 'he', amount: 853 },
                { name: 'i', amount: 1234 },
                { name: 'she', amount: 853 },
                { name: 'our', amount: 133 },
                { name: 'house', amount: 23 }
            ])
        })
})