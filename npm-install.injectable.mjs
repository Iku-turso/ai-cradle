// Merged npm-install functionality
export async function npmInstall(packageName, global = false) {
    const command = global ? `npm install -g ${packageName}` : `npm install ${packageName}`;
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing package: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Package installed: ${stdout}`);
    });
}