module.exports = {
    apps : [{
        name   : "manager",
        script : "./manager/fydne.js",
        out_file: "/dev/null",
        error_file: "/dev/null",
        exec_mode : "cluster",
        watch: true,//--watch
        instances : "max",// -i
        max_memory_restart: "256M"
    }]
}