import { logger } from "./logger.js";
import FileHelper from "./Helpers/fileHelper.js";
import {dirname, resolve} from 'path'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDowloadsFolder = resolve(__dirname, '../', 'downloads');

export default class Routes {
	io;
	constructor(downloadsFolder = defaultDowloadsFolder ) {
		this.downloadsFolder = downloadsFolder;
		this.fileHelper = FileHelper;
	}

	setSocketInstance(io) {
		this.io = io;
	}

	handler(request, response) {
		response.end("Ola");
	}

	async defaultRoute(request, response) {
		response.end("Caiu na default");
	}

	async options(request, response) {
		response.writeHead(204);
		response.end("Caiu na options");
	}

	async post(request, response) {
		logger.info("caiu na post");
		response.end();
	}

	async get(request, response) {
		const files = await this.fileHelper.getFileStatus(this.downloadsFolder);
		response.writeHead(200);
		response.end(JSON.stringify(files));
	}

	handler(request, response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		const chosen = this[request.method.toLowerCase()] || this.defaultRoute;

		return chosen.apply(this, [request, response]);
	}
}
