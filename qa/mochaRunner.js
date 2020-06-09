const Mocha = require('mocha')

const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'docs/mochawesome-report'
    }
})

mocha.addFile('./test/service/app.spec.js')

mocha.run(function() {
    process.exit(0)
})