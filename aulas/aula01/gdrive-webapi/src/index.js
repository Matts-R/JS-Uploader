import http from "http";
import fs from "fs";
import { logger } from "./logger.js";
import { Server } from "socket.io";
import Routes from "./routes.js";

const PORT = process.env.PORT || 3000;

// const localHostSSL = {
// 	key: fs.readFileSync("./certificates/key.pem"),
// 	certificate: fs.readFileSync("./certificates/cert.pem"),
// };

const routes = new Routes();

const server = http.createServer(routes.handler.bind(routes));

const io = new Server(server, {
	cors: {
		credentials: false,
		origin: "*",
	},
});

routes.setSocketInstance(io);

io.on("connection", (socket) => {
	logger.info(`Someone connected to the server ${socket}`);
});

const start = () => {
	const { address, port } = server.address();
	logger.info(`App running on http://${address}:${port}`);
};

server.listen(3000, start);
