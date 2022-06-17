const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

export default {
    localPath: resolve("./dist"),
    default: "ubuntu",
    servers: {
        ubuntu: {
            remotePath: "/home/web/vueapp",
            server: {
                host: "ubuntu.wsl",
                port: 22,
                username: "zhangyu",
                password: "0000"
            }
        },
        ubuntu1: {
            remotePath: "/home/web/vueapp",
            server: {
                host: "ubuntu.wsl",
                port: 22,
                username: "zhangyu",
                password: "0000"
            }
        }
    }
}