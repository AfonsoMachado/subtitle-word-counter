// Processo principal
const { ipcMain } = require('electron')

ipcMain.on('process-subtitles', (event, args) => {
    console.log(args)

    event.reply('process-subtitles', [
        { name: 'you', amount: 900 },
        { name: 'he', amount: 853 },
        { name: 'i', amount: 1234 },
        { name: 'she', amount: 853 },
        { name: 'our', amount: 133 },
        { name: 'house', amount: 23 }
    ])
})