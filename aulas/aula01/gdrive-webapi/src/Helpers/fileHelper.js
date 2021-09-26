import fs from "fs";
import prettyBytes from "pretty-bytes";

export default class FileHelper {
	static async getFileStatus(downLoadsFolder) {
    const currentFiles = await fs.promises.readdir(downLoadsFolder);
		const statuses = await Promise.all(
			currentFiles.map((file) => fs.promises.stat(`${downLoadsFolder}/${file}`))
		);

		const filesStatuses = [];
		for (const file in currentFiles) {
			const { birthtime, size } = statuses[file];
			filesStatuses.push({
				size: prettyBytes(size),
				file: currentFiles[file],
				lastModified: birthtime,
				owner: process.env.USER,
			});
    }
    
    return filesStatuses;
	}
}
