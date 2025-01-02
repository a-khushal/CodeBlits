import path from "path"
import fs from "fs"

function readFileFn(path: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } 

            resolve(data)
        })
    })
}

function getDefaultCode(folderPath: string) {
    return new Promise((resolve, reject) => {
        fs.read
    })
}

async function main(slug: string) {
    const basePath = path.resolve(__dirname, '../../../apps/problems');
    const problemFilePath = basePath + `/${slug}/problem.md`;
    const defaultCodeFolderPath = basePath + `/${slug}/boilerplate`

    const problemFileContent = await readFileFn(problemFilePath) as string;
    const problemFileContentArr = problemFileContent.split("\n").filter(val => val !== '')
    
    const problemTitle = problemFileContentArr[0].replace(/^##\s*/, "").trim();
    const problemDescription = problemTitle[1];

    
    const defaultCode = await getDefaultCode(defaultCodeFolderPath)
}

main(process.argv[2])