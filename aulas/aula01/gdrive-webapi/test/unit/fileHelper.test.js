import { describe, test, expect, jest } from "@jest/globals";
import FileHelper from "./../../src/Helpers/fileHelper.js";
import fs from "fs";

describe("==> Routes test suite", () => {
	describe("==> getFileStatus", () => {
		test("setSocket should return files statuses in correct format", async () => {
			const fileInfo = {
				dev: 2056,
				mode: 33204,
				nlink: 1,
				uid: 1000,
				gid: 1000,
				rdev: 0,
				blksize: 4096,
				ino: 22941645,
				size: 67298,
				blocks: 136,
				atimeMs: 1632608310592.075,
				mtimeMs: 1632608310224.0674,
				ctimeMs: 1632608310232.0676,
				birthtimeMs: 1632608310224.0674,
				atime: "2021-09-25T22:18:30.592Z",
				mtime: "2021-09-25T22:18:30.224Z",
				ctime: "2021-09-25T22:18:30.232Z",
				birthtime: "2021-09-25T22:18:30.224Z",
			};

			const mockUser = 'Matts'
			process.env.USER = mockUser
			const fileName = "demo.png";

			jest
				.spyOn(fs.promises, fs.promises.readdir.name)
				.mockResolvedValue([fileName]);

			jest
				.spyOn(fs.promises, fs.promises.stat.name)
				.mockResolvedValue(fileInfo);
			
			const result = await FileHelper.getFileStatus("/tmp");

			const expectedResult = [
				{  
					size: '67.3 kB',
					lastModified: fileInfo.birthtime,
					owner: "Matts",
					file: fileName,
				},
			];

			expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${fileName}`);
			expect(result).toMatchObject(expectedResult);
		});
	});
});
