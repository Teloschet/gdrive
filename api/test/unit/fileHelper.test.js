import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import Routes from '../../src/routes.js'
import FileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {

  describe('#getFileStats', () => {
    test('it should return files statuses in correct form', async () => {
      const statMock = {
        dev: 66306,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 2786408,
        size: 14054,
        blocks: 32,
        atimeMs: 1690228574063.9573,
        mtimeMs: 1690228573811.9604,
        ctimeMs: 1690228573811.9604,
        birthtimeMs: 1690228573811.9604,
        atime: '2023-07-24T19:56:14.064Z',
        mtime: '2023-07-24T19:56:13.812Z',
        ctime: '2023-07-24T19:56:13.812Z',
        birthtime: '2023-07-24T19:56:13.812Z'
      }

      const mockUser = 'telos'
      process.env.USER = mockUser

      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus("/tmp")

      const expectedResult = [
        {
          size: "14.1 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})