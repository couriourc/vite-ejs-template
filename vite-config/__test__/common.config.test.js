import {excludePrivate, getRootDir} from "../common.config";

describe('get_root_dir ', function () {
    it('should return the root dir', function () {
        const rootDir = getRootDir(excludePrivate)
        expect(rootDir.length).not.toBe(0)
    })
});