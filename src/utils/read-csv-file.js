import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('../../tasks.csv', import.meta.url)

async function readCSVFile(file) {
    const parser = fs.createReadStream(file)
        .pipe(parse({ delimiter: "|", from_line: 2 }))

    process.stdout.write('start...\n')

    let count = 1

    for await (const record of parser) {

        const [title, description] = record

        fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            duplex: "half"
        }).then(() => {
            process.stdout.write(`creating task ${count++}\n`)
        })

        await new Promise((resolve) => setTimeout(resolve, 100))
    }

    process.stdout.write('...done\n')
}

readCSVFile(csvPath)