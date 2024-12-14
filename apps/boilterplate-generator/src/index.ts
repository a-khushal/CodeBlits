import fs from "fs"
import path from "path"

const problemFolderName = process.argv[2];
const basePath = path.resolve(__dirname, '../../problems');
const structureFilePath = path.join(basePath, `/${problemFolderName}/structure.md`);
const boilerplateFolderPath = path.join(basePath, `/${problemFolderName}/boilerplate`);
const fullBoilerplateFolderPath = path.join(basePath, `/${problemFolderName}/fullboilerplate`);

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

function getPartialCodeForJAVA(payload: PayloadType) {
    return `class Solution {\n\tpublic ${Javatypes(payload.outputField.split(' ')[0])} ${payload.functionName}(${payload.inputFields.map((inputField, index) => Javatypes(inputField.split(" ")[0]) + " " + inputField.split(" ")[1] + (index < payload.inputFields.length - 1 ? ',' : '')).join(' ')}) {\n\t\t// write your code here\n\n\t}\n}`;
}
 
function getPartialCodeForJS(payload: PayloadType) {
    return `function ${payload.functionName}(${payload.inputFields.map((inputField, index) => inputField.split(' ')[1] + (index < payload.inputFields.length - 1 ? ', ' : '')).join('')}) {\n\t// write your code here\n\n}`;
}

function getPartialCodeForCPP(payload: PayloadType) {
    return`${payload.outputField.split(' ')[0]} ${payload.functionName}(${payload.inputFields.map((inputField, index) => inputField + (index < payload.inputFields.length - 1 ? ', ' : '')).join('')}) {\n\t// write your code here\n\n}`;
}

function getFullCodeForCPP(payload: PayloadType) {
    return (
        `#include <bits/stdc++.h>\n\n` +
        `using namespace std;\n\n` +
        `// User code here //\n\n` +
        `int main(void) {\n` +
        payload.inputFields.map((inputField) => {
            const [type, variableName] = inputField.split(" ");
            if (type.includes("vector<")) {
                // Extract the type inside vector<>
                const vectorTypeMatch = type.match(/vector<(.+)>/);
                const vectorType = vectorTypeMatch ? vectorTypeMatch[1] : "int"; // Default to int if no match
                return (
                    `    int size_${variableName};\n` +
                    `    std::cin >> size_${variableName};\n` +
                    `    vector<${vectorType}> ${variableName};\n` +
                    `    for (int i = 0; i < size_${variableName}; i++) {\n` +
                    `        ${vectorType} ${variableName}_i;\n` +
                    `        std::cin >> ${variableName}_i;\n` +
                    `        ${variableName}.push_back(${variableName}_i);\n` +
                    `    }\n`
                );
            } else {
                return (
                    `    ${type} ${variableName};\n` +
                    `    std::cin >> ${variableName};\n`
                );
            }
        }).join('') +
        `\n\t${payload.outputField.split(" ")[0]} result = ${payload.functionName}(` +
        payload.inputFields
            .map((inputField, index) => {
                const variableName = inputField.split(" ")[1];
                return variableName + (index < payload.inputFields.length - 1 ? ', ' : '');
            })
            .join('') +
        `);\n` +
        `    std::cout << result << endl;\n` +
        `    return 0;\n` +
        `}`
    );        
}

function parseStructure(structure: string) {
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
        fs.mkdirSync(boilerplateFolderPath, { recursive: true });
    } catch (err) {
        console.log('Error while creating folder:', err);
    }

    try {
        fs.mkdirSync(fullBoilerplateFolderPath, { recursive: true });
    } catch (err) {
        console.log('Error while creating folder:', err);
    }

    try {
        fs.writeFileSync(`${boilerplateFolderPath}/function.java`, getPartialCodeForJAVA(payload))
    } catch(err) {
        console.error(err);
    }

    try {
        fs.writeFileSync(`${boilerplateFolderPath}/function.js`, getPartialCodeForJS(payload))
    } catch(err) {
        console.error(err);
    }

    try {
        fs.writeFileSync(`${boilerplateFolderPath}/function.cpp`, getPartialCodeForCPP(payload))
    } catch(err) {
        console.error(err);
    }

    try {
        fs.writeFileSync(`${fullBoilerplateFolderPath}/main.cpp`, getFullCodeForCPP(payload))
    } catch(err) {
        console.error(err);
    }
}

fs.readFile(structureFilePath, (err, data) => {
    if (err) throw err;
    const structure = data.toString();
    parseStructure(structure)
});