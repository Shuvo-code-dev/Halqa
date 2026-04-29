const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const excludeDirs = ['.git', '.next', 'node_modules', 'dist', 'assets'];

function replaceContents(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Content replacements
        const newContent = content
            .replace(/Halqa/g, 'Bulz')
            .replace(/halqa/g, 'bulz')
            .replace(/HALQA/g, 'BULZ');

        if (content !== newContent) {
            content = newContent;
            modified = true;
        }

        // Specific metadata replacement in layout.tsx
        if (filePath.endsWith('layout.tsx')) {
            const metaRegex = /title:\s*['"`]Bulz(?:\s*\|.*?)?['"`]/g;
            const updatedMeta = content.replace(metaRegex, "title: 'Bulz | The Developer Sanctuary'");
            if (content !== updatedMeta) {
                content = updatedMeta;
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated content: ${filePath}`);
        }
    } catch (e) {
        // Ignore binary files
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (excludeDirs.includes(file)) continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        let currentPath = fullPath;

        // Rename file/folder if it contains "halqa" (case-insensitive)
        if (file.toLowerCase().includes('halqa')) {
            const newFileName = file.replace(/Halqa/g, 'Bulz').replace(/halqa/g, 'bulz').replace(/HALQA/g, 'BULZ');
            const newPath = path.join(dir, newFileName);
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed: ${fullPath} -> ${newPath}`);
            currentPath = newPath;
        }

        if (stat.isDirectory()) {
            processDirectory(currentPath);
        } else if (stat.isFile()) {
            if (currentPath === __filename || currentPath.endsWith('rename_brand.js')) continue;
            replaceContents(currentPath);
        }
    }
}

console.log('Starting AGGRESSIVE migration...');
processDirectory(rootDir);
console.log('Migration complete.');
