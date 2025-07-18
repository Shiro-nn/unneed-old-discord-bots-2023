const { compile } = require('C:/Users/fydne/AppData/Roaming/npm/node_modules/nexe')

compile({
  input: './app.js',
  ico: './logo.ico',
  rc: {
    CompanyName: 'Qurre Team',
    ProductName: 'SCP Discord Logs',
    FileDescription: 'Sends game logs to your discord guild',
    OriginalFilename: 'sdl.exe',
    InternalName: 'sdl',
    LegalCopyright: 'Copyright © Qurre Team 2022',
    PRODUCTVERSION: "1,3,0,0",
    FILEVERSION: "1,3,0"
  },
  build: true, //required to use patches
}).then(() => {
  console.log('success')
})