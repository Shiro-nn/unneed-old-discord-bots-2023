module.exports = {
    apps : [{
        name   : "ChatGPT Bot",
        script : "./start.cjs",
        out_file: "/dev/null",
        error_file: "/dev/null",
        exec_mode : "cluster",
        max_memory_restart: "512M"
    }]
}