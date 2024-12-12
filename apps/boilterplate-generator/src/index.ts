import fs from "fs"
import path from "path"

const problemFolderName = process.argv[2];
const basePath = path.resolve(__dirname, '../../problems');
const filePath = path.join(basePath, `/${problemFolderName}/structure.md`);
const folderPath = path.join(basePath, `/${problemFolderName}/boilerplate`);

function getFromat(parts: string[][]) {
    let problemName = '';
    let functionName = '';
    let inputFields: string[] = [];
    let outputField = '';

    parts.forEach(([key, value]) => {
        switch (key) {
            case 'Problem Name':
            problemName = value;
            break;
            case 'Function Name':
            functionName = value;
            break;
            case 'Input Field':
            inputFields.push(value);
            break;
            case 'Output Field':
            outputField = value;
            break;
        }
    });

    return {
        problemName,
        functionName,
        inputFields,
        outputField,
    }
}

function wrapperTypes(type: string): string {
    switch(type) {
        case "int": return "Integer";
        case "boolean": return "Boolean";
        case "string": return "String";
        case "float": return "Float";
        case "double": return "Double";
        case "char": return "Character";
        case "long": return "Long";
        case "short": return "Short";
        case "byte": return "Byte";
        default: return "";
    }
}

function Javatypes(type: string): string {
    if(type.includes("vector<vector<")) {
        let innerType = type.slice(type.lastIndexOf('<') + 1, type.indexOf('>'));
        return `List<List<${wrapperTypes(Javatypes(innerType))}>>`
    } else if(type.includes("vector<")) {
        let innerType = type.slice(type.indexOf('<') + 1, type.lastIndexOf('>'));
        return `List<${wrapperTypes(Javatypes(innerType))}>`
    }

    if(type.includes('[]')) {
        return Javatypes(type.replace('[]', '')) + '[]';
    }

    switch(type) {
        case "short": return "short";
        case "int": return "int";
        case "long": return "long";
        case "float": return "float";
        case "double": return "double";
        case "bool": return "boolean"; 
        case "char": return "char";
        case "string": return "String";
        case "void": return "void";
        case "unsigned short": return "short"; 
        case "unsigned int": return "int"; 
        case "unsigned long": return "long";
        case "unsigned char": return "char";  
        default: return "";
    }
}

interface PayloadType {
    problemName: string;
    functionName: string;
    inputFields: string[];
    outputField: string;
}

function getFormatedCodeForJAVA(payload: PayloadType) {
    return `class Solution {\n\tpublic ${Javatypes(payload.outputField.split(' ')[0])} ${payload.functionName}(${payload.inputFields.map((inputField, index) => Javatypes(inputField.split(" ")[0]) + " " + inputField.split(" ")[1] + (index < payload.inputFields.length - 1 ? ',' : '')).join(' ')}) {\n\t\t// write your code here\n\n\t}\n}`;
}
 
function getFormatedCodeForJS(payload: PayloadType) {
    return `function ${payload.functionName}(${payload.inputFields.map((inputField, index) => inputField.split(' ')[1] + (index < payload.inputFields.length - 1 ? ', ' : '')).join('')}) {\n\t// write your code here\n\n}`;
}

function getFormatedCodeForCPP(payload: PayloadType) {
    return`${payload.outputField.split(' ')[0]} ${payload.functionName}(${payload.inputFields.map((inputField, index) => inputField + (index < payload.inputFields.length - 1 ? ', ' : '')).join('')}) {\n\t// write your code here\n\n}`;
}

function parseStructure(structure: any) {
    const lines = structure.split("\n")

    const split = lines.map((line: any, idx: any) => {
        const parts = line.split(":")
        
        if(parts[0] != '') {
            parts[0] = parts[0].trim(); 
            parts[1] = parts[1].trim();
        }

        return parts
    })

    const payload = getFromat(split)

    try {
        fs.mkdirSync(folderPath, { recursive: true });
    } catch (err) {
        console.log('Error while creating folder:', err);
    }

    try {
        fs.writeFileSync(`${folderPath}/function.java`, getFormatedCodeForJAVA(payload))
    } catch(err) {
        console.error(err);
    }

    try {
        fs.writeFileSync(`${folderPath}/function.js`, getFormatedCodeForJS(payload))
    } catch(err) {
        console.error(err);
    }

    try {
        fs.writeFileSync(`${folderPath}/function.cpp`, getFormatedCodeForCPP(payload))
    } catch(err) {
        console.error(err);
    }
}

fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const structure = data.toString();
    parseStructure(structure)
});