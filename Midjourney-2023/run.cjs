const { spawn } = require('child_process');

function Create() {
    let closing = false;
    const script = spawn('node', ['.']);
    script.on('close', () => {
        if(closing) return;
        Create();
    });
    setTimeout(() => {
        closing = true;
        script.stdin.pause();
        script.kill();
        setTimeout(() => Create(), 1000);
    }, 1000 * 60 * 60);
}

Create();