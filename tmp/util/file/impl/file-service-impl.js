var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
import { LocalFileSystem } from '../index';
import { FileUtil } from '../util/file-util';
var FileServiceImpl = /** @class */ (function () {
    function FileServiceImpl() {
        this.initialized = false;
    }
    FileServiceImpl.prototype.init = function () {
        var _this = this;
        file.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            _this.initialized = true;
            _this.fileSystem = fs;
        }, function () {
        });
    };
    FileServiceImpl.prototype.readAsText = function (path, filePath) {
        return this.readFile(path, filePath, 'Text');
    };
    FileServiceImpl.prototype.readAsBinaryString = function (path, filePath) {
        return this.readFile(path, filePath, 'BinaryString');
    };
    FileServiceImpl.prototype.readFileFromAssets = function (fileName) {
        return new Promise(function (resolve, reject) {
            try {
                sbutility.readFromAssets(fileName, function (entry) {
                    resolve(entry);
                }, function (err) {
                    reject(err);
                });
            }
            catch (xc) {
                reject(xc);
            }
        });
    };
    FileServiceImpl.prototype.writeFile = function (path, fileName, text, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var getFileOpts = {
            create: !options.append,
            exclusive: !options.replace
        };
        return this.resolveDirectoryUrl(path)
            .then(function (directoryEntry) {
            return _this.getFile(directoryEntry, fileName, getFileOpts);
        })
            .then(function (fileEntry) {
            return _this.writeFileEntry(fileEntry, text, options);
        });
    };
    /**
     * Creates a new file in the specific path.
     * The replace boolean value determines whether to replace an existing file with the same name.
     * If an existing file exists and the replace value is false, the promise will fail and return an error.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystem above
     * @param {string} fileName Name of file to create
     * @param {boolean} replace If true, replaces file with same name. If false returns error
     * @returns {Promise<FileEntry>} Returns a Promise that resolves to a FileEntry or rejects with an error.
     */
    FileServiceImpl.prototype.createFile = function (path, fileName, replace) {
        var _this = this;
        var options = {
            create: true
        };
        if (!replace) {
            options.exclusive = true;
        }
        return this.resolveDirectoryUrl(path).then(function (fse) {
            return _this.getFile(fse, fileName, options);
        });
    };
    FileServiceImpl.prototype.getFile = function (directoryEntry, fileName, flags) {
        return new Promise(function (resolve, reject) {
            try {
                directoryEntry.getFile(fileName, flags, function (entry) {
                    resolve(entry);
                }, function (err) {
                    reject(err);
                });
            }
            catch (xc) {
                reject(xc);
            }
        });
    };
    /**
     * Removes a file from a desired location.
     *
     * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystem above
     * @returns {Promise<RemoveResult>} Returns a Promise that resolves to a RemoveResult or rejects with an error.
     */
    FileServiceImpl.prototype.removeFile = function (path) {
        var _this = this;
        var parentDir = FileUtil.getParentDir(path);
        var fileName = FileUtil.getFileName(path).replace('/', '');
        return this.resolveDirectoryUrl(parentDir)
            .then(function (fse) {
            return _this.getFile(fse, fileName, { create: false });
        })
            .then(function (fe) {
            return _this.remove(fe);
        });
    };
    FileServiceImpl.prototype.createDir = function (path, replace) {
        var _this = this;
        var options = {
            create: true
        };
        if (!replace) {
            options.exclusive = true;
        }
        var parentDir = FileUtil.getParentDir(path);
        var dirName = FileUtil.getFileName(path).replace('/', '');
        return this.exists(path).then(function () {
            return _this.resolveDirectoryUrl(path);
        }).catch(function () {
            return _this.resolveDirectoryUrl(parentDir).then(function (fse) {
                return _this.getDirectory(fse, dirName, options);
            });
        });
    };
    /**
     * List files and directory from a given path.
     *
     * @param {string} directoryPath. Please refer to the iOS and Android filesystems above
     * @returns {Promise<Entry[]>} Returns a Promise that resolves to an array of Entry objects or rejects with an error.
     */
    FileServiceImpl.prototype.listDir = function (directoryPath) {
        var _this = this;
        return this.resolveDirectoryUrl(FileUtil.getDirecory(directoryPath))
            .then(function (fse) {
            return _this.getDirectory(fse, FileUtil.getFileName(directoryPath), {
                create: false,
                exclusive: false
            });
        })
            .then(function (de) {
            var reader = de.createReader();
            return _this.readEntries(reader);
        });
    };
    FileServiceImpl.prototype.removeDir = function (path, dirName) {
        var _this = this;
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getDirectory(fse, dirName, { create: false });
        })
            .then(function (de) {
            return _this.remove(de);
        });
    };
    /**
     * Removes all files and the directory from a desired location.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
     * @returns {Promise<RemoveResult>} Returns a Promise that resolves with a RemoveResult or rejects with an error.
     */
    FileServiceImpl.prototype.removeRecursively = function (path) {
        var _this = this;
        path = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        var parentDir = FileUtil.getParentDir(path);
        var dirName = FileUtil.getFileName(path).replace('/', '');
        return this.resolveDirectoryUrl(parentDir)
            .then(function (fse) {
            return _this.getDirectory(fse, dirName, { create: false });
        })
            .then(function (de) {
            return _this.rimraf(de);
        });
    };
    /**
     * Copy a directory in various methods. If destination directory exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
     * @param {string} dirName Name of directory to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newDirName New name of directory to copy to (leave blank to remain the same)
     * @returns {Promise<Entry>} Returns a Promise that resolves to the new Entry object or rejects with an error.
     */
    FileServiceImpl.prototype.copyDir = function (path, dirName, newPath, newDirName) {
        var _this = this;
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getDirectory(fse, dirName, { create: false });
        })
            .then(function (srcde) {
            return _this.resolveDirectoryUrl(newPath).then(function (deste) {
                return _this.copy(srcde, deste, newDirName);
            });
        });
    };
    /**
     * Copy a file in various methods. If file exists, will fail to copy.
     *
     * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
     * @param {string} fileName Name of file to copy
     * @param {string} newPath Base FileSystem of new location
     * @param {string} newFileName New name of file to copy to (leave blank to remain the same)
     * @returns {Promise<Entry>} Returns a Promise that resolves to an Entry or rejects with an error.
     */
    FileServiceImpl.prototype.copyFile = function (path, fileName, newPath, newFileName) {
        var _this = this;
        newFileName = newFileName || fileName;
        return this.resolveDirectoryUrl(path)
            .then(function (fse) {
            return _this.getFile(fse, fileName, { create: false });
        })
            .then(function (srcfe) {
            return _this.resolveDirectoryUrl(newPath).then(function (deste) {
                return _this.copy(srcfe, deste, newFileName);
            });
        });
    };
    FileServiceImpl.prototype.exists = function (path) {
        return this.resolveLocalFilesystemUrl(path);
    };
    FileServiceImpl.prototype.getTempLocation = function (destinationPath) {
        var _this = this;
        return this.resolveDirectoryUrl(destinationPath)
            .then(function (directoryEntry) {
            return _this.resolveDirectoryUrl(destinationPath.concat('tmp'));
        }).catch(function () {
            return _this.createDir(destinationPath.concat('tmp'), false);
        });
    };
    FileServiceImpl.prototype.getFreeDiskSpace = function () {
        return new Promise(function (resolve, reject) {
            cordova.exec(resolve, reject, 'File', 'getFreeDiskSpace', []);
        });
    };
    /**
     * Resolves a local file system URL
     * @param fileUrl {string} file system url
     * @returns {Promise<Entry>}
     */
    FileServiceImpl.prototype.resolveLocalFilesystemUrl = function (fileUrl) {
        if (!fileUrl.includes('file://')) {
            fileUrl = 'file://' + fileUrl;
        }
        console.log(fileUrl);
        return new Promise(function (resolve, reject) {
            try {
                resolveLocalFileSystemURL(fileUrl, function (entry) {
                    resolve(entry);
                }, function (err) {
                    reject(err);
                });
            }
            catch (xc) {
                reject(xc);
            }
        });
    };
    FileServiceImpl.prototype.getMetaData = function (path) {
        var _this = this;
        if (typeof path === 'string') {
            return this.resolveLocalFilesystemUrl(path).then(function (entry) {
                return _this.getMetaData(entry);
            });
        }
        var fileEntry = path;
        return new Promise(function (resolve) {
            fileEntry.getMetadata(function (metadata) {
                resolve(metadata);
            }, function () { return resolve(); });
        });
    };
    FileServiceImpl.prototype.getExternalApplicationStorageDirectory = function () {
        return file.externalApplicationStorageDirectory;
    };
    FileServiceImpl.prototype.getDirectorySize = function (path) {
        var _this = this;
        return this.resolveDirectoryUrl(path)
            .then(function (directoryEntry) {
            return _this.size(directoryEntry);
        }).catch(function () {
            return 0;
        });
    };
    FileServiceImpl.prototype.size = function (entry) {
        var _this = this;
        if (entry.isFile) {
            return new Promise(function (resolve, reject) {
                entry.getMetadata(function (f) { return resolve(f.size); }, function (error) { return reject(error); });
            });
        }
        else if (entry.isDirectory) {
            return new Promise(function (resolve, reject) {
                var directoryReader = entry.createReader();
                directoryReader.readEntries(function (entries) {
                    Promise.all(entries.map(function (e) { return _this.size(e); })).then(function (size) {
                        var dirSize = size.reduce(function (prev, current) { return prev + current; }, 0);
                        resolve(dirSize);
                    }).catch(function (err) { return reject(err); });
                }, function (error) { return reject(error); });
            });
        }
        else {
            return Promise.resolve(0);
        }
    };
    FileServiceImpl.prototype.readEntries = function (dr) {
        return new Promise(function (resolve, reject) {
            dr.readEntries(function (entries) {
                resolve(entries);
            }, function (err) {
                reject(err);
            });
        });
    };
    // remove(path: string | Entry): Promise<Metadata> {
    //     if (typeof path === 'string') {
    //         return this.resolveLocalFilesystemUrl(path).then(entry => {
    //             return this.remove(entry);
    //         });
    //     }
    //
    //     const fileEntry = path;
    //     return new Promise<Metadata>((resolve) => {
    //         fileEntry.remove(() => {
    //             resolve();
    //         }, () => resolve());
    //     });
    // }
    FileServiceImpl.prototype.readFile = function (path, filePath, readAs) {
        var _this = this;
        return this.resolveDirectoryUrl(path)
            .then(function (directoryEntry) {
            return _this.getFile(directoryEntry, filePath, { create: false });
        })
            .then(function (fileEntry) {
            var reader = new FileReader();
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fileEntry.file(function (entry) {
                    reader["readAs" + readAs].call(reader, entry);
                }, function (error) {
                    reject(error);
                });
            });
        }).catch(function (err) {
            throw err;
        });
    };
    FileServiceImpl.prototype.resolveDirectoryUrl = function (directoryUrl) {
        return this.resolveLocalFilesystemUrl(directoryUrl).then(function (de) {
            if (de.isDirectory) {
                return de;
            }
            else {
                return Promise.reject('input is not a directory');
            }
        });
    };
    FileServiceImpl.prototype.remove = function (fe) {
        return new Promise(function (resolve, reject) {
            fe.remove(function () {
                resolve({ success: true, fileRemoved: fe });
            }, function (err) {
                reject(err);
            });
        });
    };
    FileServiceImpl.prototype.copy = function (srce, destdir, newName) {
        return new Promise(function (resolve, reject) {
            srce.copyTo(destdir, newName, function (deste) {
                resolve(deste);
            }, function (err) {
                reject(err);
            });
        });
    };
    FileServiceImpl.prototype.getDirectory = function (directoryEntry, directoryName, flags) {
        return new Promise(function (resolve, reject) {
            try {
                directoryEntry.getDirectory(directoryName, flags, function (de) {
                    resolve(de);
                }, function (err) {
                    reject(err);
                });
            }
            catch (xc) {
                reject(xc);
            }
        });
    };
    FileServiceImpl.prototype.rimraf = function (de) {
        return new Promise(function (resolve, reject) {
            de.removeRecursively(function () {
                resolve({ success: true, fileRemoved: de });
            }, function (err) {
                reject(err);
            });
        });
    };
    FileServiceImpl.prototype.createWriter = function (fe) {
        return new Promise(function (resolve, reject) {
            fe.createWriter(function (writer) {
                resolve(writer);
            }, function (err) {
                reject(err);
            });
        });
    };
    /**
     * Write content to FileEntry.
     * @hidden
     * Write to an existing file.
     * @param {FileEntry} fe file entry object
     * @param {string | Blob | ArrayBuffer} text text content or blob to write
     * @param {IWriteOptions} options replace file if set to true. See WriteOptions for more information.
     * @returns {Promise<FileEntry>}  Returns a Promise that resolves to updated file entry or rejects with an error.
     */
    FileServiceImpl.prototype.writeFileEntry = function (fe, text, options) {
        var _this = this;
        return this.createWriter(fe)
            .then(function (writer) {
            if (options.append) {
                writer.seek(writer.length);
            }
            if (options.truncate) {
                writer.truncate(options.truncate);
            }
            return _this.write(writer, text);
        })
            .then(function () { return fe; });
    };
    FileServiceImpl.prototype.write = function (writer, gu) {
        return new Promise(function (resolve, reject) {
            writer.onwriteend = function (evt) {
                if (writer.error) {
                    reject(writer.error);
                }
                else {
                    resolve(evt);
                }
            };
            writer.write(gu);
        });
    };
    FileServiceImpl = __decorate([
        injectable()
    ], FileServiceImpl);
    return FileServiceImpl;
}());
export { FileServiceImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZXJ2aWNlLWltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC9maWxlL2ltcGwvZmlsZS1zZXJ2aWNlLWltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVyQyxPQUFPLEVBWUgsZUFBZSxFQUdsQixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFzQzNDO0lBQUE7UUFHWSxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQWlpQmhDLENBQUM7SUEvaEJHLDhCQUFJLEdBQUo7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFDLEVBQUU7WUFDckQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFO1FBRUgsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLElBQVksRUFBRSxRQUFnQjtRQUNyQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLElBQVksRUFBRSxRQUFnQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLFFBQWdCO1FBQy9CLE9BQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxJQUFJO2dCQUNBLFNBQVMsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFVB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aW5qZWN0YWJsZX0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCB7RmlsZVNlcnZpY2V9IGZyb20gJy4uL2RlZi9maWxlLXNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RvcnlFbnRyeSxcbiAgICBEaXJlY3RvcnlSZWFkZXIsXG4gICAgRW50cnksXG4gICAgRW50cnlDYWxsYmFjayxcbiAgICBFcnJvckNhbGxiYWNrLFxuICAgIEZpbGVFbnRyeSxcbiAgICBGaWxlRXJyb3IsXG4gICAgRmlsZVN5c3RlbSxcbiAgICBGaWxlV3JpdGVyLFxuICAgIEZsYWdzLFxuICAgIElXcml0ZU9wdGlvbnMsXG4gICAgTG9jYWxGaWxlU3lzdGVtLFxuICAgIE1ldGFkYXRhLFxuICAgIFJlbW92ZVJlc3VsdFxufSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi91dGlsL2ZpbGUtdXRpbCc7XG5cbmRlY2xhcmUgdmFyIGNvcmRvdmE6IHtcbiAgICBleGVjKFxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6ICgpID0+IHZvaWQsXG4gICAgICAgIGVycm9yQ2FsbGJhY2s6ICgpID0+IHZvaWQsXG4gICAgICAgIHNlcnZpY2U6IHN0cmluZyxcbiAgICAgICAgYWN0aW9uOiBzdHJpbmcsXG4gICAgICAgIGFyZ3VtZW50czogc3RyaW5nW10pXG59O1xuXG4vKipcbiAqIEFsbG93cyB0aGUgdXNlciB0byBsb29rIHVwIHRoZSBFbnRyeSBmb3IgYSBmaWxlIG9yIGRpcmVjdG9yeSByZWZlcnJlZCB0byBieSBhIGxvY2FsIFVSTC5cbiAqIEBwYXJhbSB1cmwgQSBVUkwgcmVmZXJyaW5nIHRvIGEgbG9jYWwgZmlsZSBpbiBhIGZpbGVzeXN0ZW0gYWNjZXNzYWJsZSB2aWEgdGhpcyBBUEkuXG4gKiBAcGFyYW0gc3VjY2Vzc0NhbGxiYWNrIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgdG8gcmVwb3J0IHRoZSBFbnRyeSB0byB3aGljaCB0aGUgc3VwcGxpZWQgVVJMIHJlZmVycy5cbiAqIEBwYXJhbSBlcnJvckNhbGxiYWNrIEEgY2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBlcnJvcnMgaGFwcGVuLCBvciB3aGVuIHRoZSByZXF1ZXN0IHRvIG9idGFpbiB0aGUgRW50cnkgaXMgZGVuaWVkLlxuICovXG5cbmRlY2xhcmUgdmFyIHJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkw6IChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBzdWNjZXNzQ2FsbGJhY2s6IEVudHJ5Q2FsbGJhY2ssXG4gICAgZXJyb3JDYWxsYmFjaz86IEVycm9yQ2FsbGJhY2tcbikgPT4gdm9pZDtcblxuZGVjbGFyZSB2YXIgZmlsZToge1xuICAgIFRFTVBPUkFSWTogbnVtYmVyO1xuICAgIFBFUlNJU1RFTlQ6IG51bWJlcjtcbiAgICAvKiBBbmRyb2lkOiB0aGUgYXBwbGljYXRpb24gc3BhY2Ugb24gZXh0ZXJuYWwgc3RvcmFnZS4gKi9cbiAgICBleHRlcm5hbEFwcGxpY2F0aW9uU3RvcmFnZURpcmVjdG9yeTogc3RyaW5nO1xuXG4gICAgcmVxdWVzdEZpbGVTeXN0ZW0oXG4gICAgICAgIHR5cGU6IExvY2FsRmlsZVN5c3RlbSxcbiAgICAgICAgc2l6ZTogbnVtYmVyLFxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2s6IChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB2b2lkLFxuICAgICAgICBlcnJvckNhbGxiYWNrPzogKGZpbGVFcnJvcjogRmlsZUVycm9yKSA9PiB2b2lkKTogdm9pZDtcbn07XG5cbkBpbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlU2VydmljZUltcGwgaW1wbGVtZW50cyBGaWxlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGZpbGVTeXN0ZW06IEZpbGVTeXN0ZW07XG4gICAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgZmlsZS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVN5c3RlbSA9IGZzO1xuICAgICAgICB9LCAoKSA9PiB7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZEFzVGV4dChwYXRoOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkRmlsZTxzdHJpbmc+KHBhdGgsIGZpbGVQYXRoLCAnVGV4dCcpO1xuICAgIH1cblxuICAgIHJlYWRBc0JpbmFyeVN0cmluZyhwYXRoOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkRmlsZTxzdHJpbmc+KHBhdGgsIGZpbGVQYXRoLCAnQmluYXJ5U3RyaW5nJyk7XG4gICAgfVxuXG4gICAgcmVhZEZpbGVGcm9tQXNzZXRzKGZpbGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNidXRpbGl0eS5yZWFkRnJvbUFzc2V0cyhmaWxlTmFtZSwgKGVudHJ5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlbnRyeSk7XG4gICAgICAgICAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoICh4Yykge1xuICAgICAgICAgICAgICAgIHJlamVjdCh4Yyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlRmlsZShcbiAgICAgICAgcGF0aDogc3RyaW5nLFxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nLFxuICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgIG9wdGlvbnM6IElXcml0ZU9wdGlvbnMgPSB7fVxuICAgICk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGdldEZpbGVPcHRzOiBGbGFncyA9IHtcbiAgICAgICAgICAgIGNyZWF0ZTogIW9wdGlvbnMuYXBwZW5kLFxuICAgICAgICAgICAgZXhjbHVzaXZlOiAhb3B0aW9ucy5yZXBsYWNlXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZURpcmVjdG9yeVVybChwYXRoKVxuICAgICAgICAgICAgLnRoZW4oKGRpcmVjdG9yeUVudHJ5OiBEaXJlY3RvcnlFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbGUoZGlyZWN0b3J5RW50cnksIGZpbGVOYW1lLCBnZXRGaWxlT3B0cyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGZpbGVFbnRyeTogRmlsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVGaWxlRW50cnkoZmlsZUVudHJ5LCB0ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZmlsZSBpbiB0aGUgc3BlY2lmaWMgcGF0aC5cbiAgICAgKiBUaGUgcmVwbGFjZSBib29sZWFuIHZhbHVlIGRldGVybWluZXMgd2hldGhlciB0byByZXBsYWNlIGFuIGV4aXN0aW5nIGZpbGUgd2l0aCB0aGUgc2FtZSBuYW1lLlxuICAgICAqIElmIGFuIGV4aXN0aW5nIGZpbGUgZXhpc3RzIGFuZCB0aGUgcmVwbGFjZSB2YWx1ZSBpcyBmYWxzZSwgdGhlIHByb21pc2Ugd2lsbCBmYWlsIGFuZCByZXR1cm4gYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAgQmFzZSBGaWxlU3lzdGVtLiBQbGVhc2UgcmVmZXIgdG8gdGhlIGlPUyBhbmQgQW5kcm9pZCBmaWxlc3lzdGVtIGFib3ZlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIE5hbWUgb2YgZmlsZSB0byBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcGxhY2UgSWYgdHJ1ZSwgcmVwbGFjZXMgZmlsZSB3aXRoIHNhbWUgbmFtZS4gSWYgZmFsc2UgcmV0dXJucyBlcnJvclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEZpbGVFbnRyeT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBGaWxlRW50cnkgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgICAqL1xuICAgIGNyZWF0ZUZpbGUoXG4gICAgICAgIHBhdGg6IHN0cmluZyxcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZyxcbiAgICAgICAgcmVwbGFjZTogYm9vbGVhblxuICAgICk6IFByb21pc2U8RmlsZUVudHJ5PiB7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogRmxhZ3MgPSB7XG4gICAgICAgICAgICBjcmVhdGU6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXJlcGxhY2UpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZXhjbHVzaXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGF0aCkudGhlbihmc2UgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZShmc2UsIGZpbGVOYW1lLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBnZXRGaWxlKFxuICAgICAgICBkaXJlY3RvcnlFbnRyeTogRGlyZWN0b3J5RW50cnksXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGZsYWdzOiBGbGFnc1xuICAgICk6IFByb21pc2U8RmlsZUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxGaWxlRW50cnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5RW50cnkuZ2V0RmlsZShmaWxlTmFtZSwgZmxhZ3MsIChlbnRyeTogRmlsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xuICAgICAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoeGMpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoeGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgZmlsZSBmcm9tIGEgZGVzaXJlZCBsb2NhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoICBCYXNlIEZpbGVTeXN0ZW0uIFBsZWFzZSByZWZlciB0byB0aGUgaU9TIGFuZCBBbmRyb2lkIGZpbGVzeXN0ZW0gYWJvdmVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZW1vdmVSZXN1bHQ+fSBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgUmVtb3ZlUmVzdWx0IG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICAgKi9cbiAgICByZW1vdmVGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8UmVtb3ZlUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudERpciA9IEZpbGVVdGlsLmdldFBhcmVudERpcihwYXRoKTtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBGaWxlVXRpbC5nZXRGaWxlTmFtZShwYXRoKS5yZXBsYWNlKCcvJywgJycpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKHBhcmVudERpcilcbiAgICAgICAgICAgIC50aGVuKGZzZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZShmc2UsIGZpbGVOYW1lLCB7Y3JlYXRlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmUoZmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVEaXIoXG4gICAgICAgIHBhdGg6IHN0cmluZyxcbiAgICAgICAgcmVwbGFjZTogYm9vbGVhblxuICAgICk6IFByb21pc2U8RGlyZWN0b3J5RW50cnk+IHtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBGbGFncyA9IHtcbiAgICAgICAgICAgIGNyZWF0ZTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5leGNsdXNpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudERpciA9IEZpbGVVdGlsLmdldFBhcmVudERpcihwYXRoKTtcbiAgICAgICAgY29uc3QgZGlyTmFtZSA9IEZpbGVVdGlsLmdldEZpbGVOYW1lKHBhdGgpLnJlcGxhY2UoJy8nLCAnJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhwYXRoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGF0aCk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGFyZW50RGlyKS50aGVuKGZzZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0b3J5KGZzZSwgZGlyTmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdCBmaWxlcyBhbmQgZGlyZWN0b3J5IGZyb20gYSBnaXZlbiBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdG9yeVBhdGguIFBsZWFzZSByZWZlciB0byB0aGUgaU9TIGFuZCBBbmRyb2lkIGZpbGVzeXN0ZW1zIGFib3ZlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8RW50cnlbXT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYXJyYXkgb2YgRW50cnkgb2JqZWN0cyBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAgICovXG4gICAgbGlzdERpcihkaXJlY3RvcnlQYXRoOiBzdHJpbmcpOiBQcm9taXNlPEVudHJ5W10+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKEZpbGVVdGlsLmdldERpcmVjb3J5KGRpcmVjdG9yeVBhdGgpKVxuICAgICAgICAgICAgLnRoZW4oZnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3RvcnkoZnNlLCBGaWxlVXRpbC5nZXRGaWxlTmFtZShkaXJlY3RvcnlQYXRoKSwge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBleGNsdXNpdmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IGRlLmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRFbnRyaWVzKHJlYWRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHJlbW92ZURpcihwYXRoOiBzdHJpbmcsIGRpck5hbWU6IHN0cmluZyk6IFByb21pc2U8UmVtb3ZlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGF0aClcbiAgICAgICAgICAgIC50aGVuKGZzZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlyZWN0b3J5KGZzZSwgZGlyTmFtZSwge2NyZWF0ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihkZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlKGRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGZpbGVzIGFuZCB0aGUgZGlyZWN0b3J5IGZyb20gYSBkZXNpcmVkIGxvY2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggQmFzZSBGaWxlU3lzdGVtLiBQbGVhc2UgcmVmZXIgdG8gdGhlIGlPUyBhbmQgQW5kcm9pZCBmaWxlc3lzdGVtIGFib3ZlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UmVtb3ZlUmVzdWx0Pn0gUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGEgUmVtb3ZlUmVzdWx0IG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cbiAgICAgKi9cbiAgICByZW1vdmVSZWN1cnNpdmVseShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPFJlbW92ZVJlc3VsdD4ge1xuICAgICAgICBwYXRoID0gcGF0aC5lbmRzV2l0aCgnLycpID8gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSAxKSA6IHBhdGg7XG4gICAgICAgIGNvbnN0IHBhcmVudERpciA9IEZpbGVVdGlsLmdldFBhcmVudERpcihwYXRoKTtcbiAgICAgICAgY29uc3QgZGlyTmFtZSA9IEZpbGVVdGlsLmdldEZpbGVOYW1lKHBhdGgpLnJlcGxhY2UoJy8nLCAnJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGFyZW50RGlyKVxuICAgICAgICAgICAgLnRoZW4oZnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXJlY3RvcnkoZnNlLCBkaXJOYW1lLCB7Y3JlYXRlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGRlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yaW1yYWYoZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29weSBhIGRpcmVjdG9yeSBpbiB2YXJpb3VzIG1ldGhvZHMuIElmIGRlc3RpbmF0aW9uIGRpcmVjdG9yeSBleGlzdHMsIHdpbGwgZmFpbCB0byBjb3B5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggQmFzZSBGaWxlU3lzdGVtLiBQbGVhc2UgcmVmZXIgdG8gdGhlIGlPUyBhbmQgQW5kcm9pZCBmaWxlc3lzdGVtcyBhYm92ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJOYW1lIE5hbWUgb2YgZGlyZWN0b3J5IHRvIGNvcHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGF0aCBCYXNlIEZpbGVTeXN0ZW0gb2YgbmV3IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld0Rpck5hbWUgTmV3IG5hbWUgb2YgZGlyZWN0b3J5IHRvIGNvcHkgdG8gKGxlYXZlIGJsYW5rIHRvIHJlbWFpbiB0aGUgc2FtZSlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxFbnRyeT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIG5ldyBFbnRyeSBvYmplY3Qgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgICAqL1xuICAgIGNvcHlEaXIoXG4gICAgICAgIHBhdGg6IHN0cmluZyxcbiAgICAgICAgZGlyTmFtZTogc3RyaW5nLFxuICAgICAgICBuZXdQYXRoOiBzdHJpbmcsXG4gICAgICAgIG5ld0Rpck5hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8RW50cnk+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKHBhdGgpXG4gICAgICAgICAgICAudGhlbihmc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERpcmVjdG9yeShmc2UsIGRpck5hbWUsIHtjcmVhdGU6IGZhbHNlfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oc3JjZGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwobmV3UGF0aCkudGhlbihkZXN0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvcHkoc3JjZGUsIGRlc3RlLCBuZXdEaXJOYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcHkgYSBmaWxlIGluIHZhcmlvdXMgbWV0aG9kcy4gSWYgZmlsZSBleGlzdHMsIHdpbGwgZmFpbCB0byBjb3B5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggQmFzZSBGaWxlU3lzdGVtLiBQbGVhc2UgcmVmZXIgdG8gdGhlIGlPUyBhbmQgQW5kcm9pZCBmaWxlc3lzdGVtIGFib3ZlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIE5hbWUgb2YgZmlsZSB0byBjb3B5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1BhdGggQmFzZSBGaWxlU3lzdGVtIG9mIG5ldyBsb2NhdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdGaWxlTmFtZSBOZXcgbmFtZSBvZiBmaWxlIHRvIGNvcHkgdG8gKGxlYXZlIGJsYW5rIHRvIHJlbWFpbiB0aGUgc2FtZSlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxFbnRyeT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gRW50cnkgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgICAqL1xuICAgIGNvcHlGaWxlKFxuICAgICAgICBwYXRoOiBzdHJpbmcsXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIG5ld1BhdGg6IHN0cmluZyxcbiAgICAgICAgbmV3RmlsZU5hbWU6IHN0cmluZ1xuICAgICk6IFByb21pc2U8RW50cnk+IHtcbiAgICAgICAgbmV3RmlsZU5hbWUgPSBuZXdGaWxlTmFtZSB8fCBmaWxlTmFtZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKHBhdGgpXG4gICAgICAgICAgICAudGhlbihmc2UgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbGUoZnNlLCBmaWxlTmFtZSwge2NyZWF0ZTogZmFsc2V9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihzcmNmZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZURpcmVjdG9yeVVybChuZXdQYXRoKS50aGVuKGRlc3RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weShzcmNmZSwgZGVzdGUsIG5ld0ZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4aXN0cyhwYXRoOiBzdHJpbmcpOiBQcm9taXNlPEVudHJ5PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVMb2NhbEZpbGVzeXN0ZW1VcmwocGF0aCk7XG4gICAgfVxuXG4gICAgZ2V0VGVtcExvY2F0aW9uKGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nKTogUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKGRlc3RpbmF0aW9uUGF0aClcbiAgICAgICAgICAgIC50aGVuKChkaXJlY3RvcnlFbnRyeTogRGlyZWN0b3J5RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGlyZWN0b3J5VXJsKGRlc3RpbmF0aW9uUGF0aC5jb25jYXQoJ3RtcCcpKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEaXIoZGVzdGluYXRpb25QYXRoLmNvbmNhdCgndG1wJyksIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZyZWVEaXNrU3BhY2UoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29yZG92YS5leGVjKHJlc29sdmUsIHJlamVjdCwgJ0ZpbGUnLCAnZ2V0RnJlZURpc2tTcGFjZScsIFtdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgYSBsb2NhbCBmaWxlIHN5c3RlbSBVUkxcbiAgICAgKiBAcGFyYW0gZmlsZVVybCB7c3RyaW5nfSBmaWxlIHN5c3RlbSB1cmxcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxFbnRyeT59XG4gICAgICovXG4gICAgcmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChmaWxlVXJsOiBzdHJpbmcpOiBQcm9taXNlPEVudHJ5PiB7XG4gICAgICAgIGlmICghZmlsZVVybC5pbmNsdWRlcygnZmlsZTovLycpKSB7XG4gICAgICAgICAgICBmaWxlVXJsID0gJ2ZpbGU6Ly8nICsgZmlsZVVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhmaWxlVXJsKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEVudHJ5PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoXG4gICAgICAgICAgICAgICAgICAgIGZpbGVVcmwsXG4gICAgICAgICAgICAgICAgICAgIChlbnRyeTogRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBjYXRjaCAoeGMpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoeGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRNZXRhRGF0YShwYXRoOiBzdHJpbmcgfCBFbnRyeSk6IFByb21pc2U8TWV0YWRhdGE+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChwYXRoKS50aGVuKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRNZXRhRGF0YShlbnRyeSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IHBhdGg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxNZXRhZGF0YT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGZpbGVFbnRyeS5nZXRNZXRhZGF0YShtZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShtZXRhZGF0YSk7XG4gICAgICAgICAgICB9LCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRFeHRlcm5hbEFwcGxpY2F0aW9uU3RvcmFnZURpcmVjdG9yeSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZmlsZS5leHRlcm5hbEFwcGxpY2F0aW9uU3RvcmFnZURpcmVjdG9yeTtcbiAgICB9XG5cbiAgICBnZXREaXJlY3RvcnlTaXplKHBhdGg6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEaXJlY3RvcnlVcmwocGF0aClcbiAgICAgICAgICAgIC50aGVuKChkaXJlY3RvcnlFbnRyeTogRGlyZWN0b3J5RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaXplKGRpcmVjdG9yeUVudHJ5KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpemUoZW50cnk6IEVudHJ5KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgaWYgKGVudHJ5LmlzRmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGVudHJ5LmdldE1ldGFkYXRhKGYgPT4gcmVzb2x2ZShmLnNpemUpLCBlcnJvciA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5UmVhZGVyID0gKGVudHJ5IGFzIERpcmVjdG9yeUVudHJ5KS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBkaXJlY3RvcnlSZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXM6IEVudHJ5W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKGVudHJpZXMubWFwKGUgPT4gdGhpcy5zaXplKGUpKSkudGhlbigoc2l6ZTogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJTaXplID0gc2l6ZS5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHByZXYgKyBjdXJyZW50LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpclNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZEVudHJpZXMoZHI6IERpcmVjdG9yeVJlYWRlcik6IFByb21pc2U8RW50cnlbXT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RW50cnlbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZHIucmVhZEVudHJpZXMoXG4gICAgICAgICAgICAgICAgZW50cmllcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIHJlbW92ZShwYXRoOiBzdHJpbmcgfCBFbnRyeSk6IFByb21pc2U8TWV0YWRhdGE+IHtcbiAgICAvLyAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZUxvY2FsRmlsZXN5c3RlbVVybChwYXRoKS50aGVuKGVudHJ5ID0+IHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmUoZW50cnkpO1xuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBmaWxlRW50cnkgPSBwYXRoO1xuICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2U8TWV0YWRhdGE+KChyZXNvbHZlKSA9PiB7XG4gICAgLy8gICAgICAgICBmaWxlRW50cnkucmVtb3ZlKCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgLy8gICAgICAgICB9LCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIHJlYWRGaWxlPFQ+KFxuICAgICAgICBwYXRoOiBzdHJpbmcsXG4gICAgICAgIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRBczogJ0FycmF5QnVmZmVyJyB8ICdCaW5hcnlTdHJpbmcnIHwgJ0RhdGFVUkwnIHwgJ1RleHQnXG4gICAgKTogUHJvbWlzZTxUPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZURpcmVjdG9yeVVybChwYXRoKVxuICAgICAgICAgICAgLnRoZW4oKGRpcmVjdG9yeUVudHJ5OiBEaXJlY3RvcnlFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbGUoZGlyZWN0b3J5RW50cnksIGZpbGVQYXRoLCB7Y3JlYXRlOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChmaWxlRW50cnk6IEZpbGVFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFkZXIucmVzdWx0ICE9PSB1bmRlZmluZWQgfHwgcmVhZGVyLnJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKHJlYWRlci5yZXN1bHQgYXMgYW55KSBhcyBUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVhZGVyLmVycm9yICE9PSB1bmRlZmluZWQgfHwgcmVhZGVyLmVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh7Y29kZTogbnVsbCwgbWVzc2FnZTogJ1JFQURFUl9PTkxPQURFTkRfRVJSJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZpbGVFbnRyeS5maWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlcltgcmVhZEFzJHtyZWFkQXN9YF0uY2FsbChyZWFkZXIsIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNvbHZlRGlyZWN0b3J5VXJsKGRpcmVjdG9yeVVybDogc3RyaW5nKTogUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlTG9jYWxGaWxlc3lzdGVtVXJsKGRpcmVjdG9yeVVybCkudGhlbihkZSA9PiB7XG4gICAgICAgICAgICBpZiAoZGUuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGUgYXMgRGlyZWN0b3J5RW50cnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxEaXJlY3RvcnlFbnRyeT4oJ2lucHV0IGlzIG5vdCBhIGRpcmVjdG9yeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZShmZTogRW50cnkpOiBQcm9taXNlPFJlbW92ZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UmVtb3ZlUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmZS5yZW1vdmUoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtzdWNjZXNzOiB0cnVlLCBmaWxlUmVtb3ZlZDogZmV9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29weShcbiAgICAgICAgc3JjZTogRW50cnksXG4gICAgICAgIGRlc3RkaXI6IERpcmVjdG9yeUVudHJ5LFxuICAgICAgICBuZXdOYW1lOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPEVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxFbnRyeT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc3JjZS5jb3B5VG8oXG4gICAgICAgICAgICAgICAgZGVzdGRpcixcbiAgICAgICAgICAgICAgICBuZXdOYW1lLFxuICAgICAgICAgICAgICAgIGRlc3RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkZXN0ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpcmVjdG9yeShcbiAgICAgICAgZGlyZWN0b3J5RW50cnk6IERpcmVjdG9yeUVudHJ5LFxuICAgICAgICBkaXJlY3RvcnlOYW1lOiBzdHJpbmcsXG4gICAgICAgIGZsYWdzOiBGbGFnc1xuICAgICk6IFByb21pc2U8RGlyZWN0b3J5RW50cnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPERpcmVjdG9yeUVudHJ5PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRpcmVjdG9yeUVudHJ5LmdldERpcmVjdG9yeShcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MsXG4gICAgICAgICAgICAgICAgICAgIGRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGUpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBjYXRjaCAoeGMpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoeGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJpbXJhZihkZTogRGlyZWN0b3J5RW50cnkpOiBQcm9taXNlPFJlbW92ZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UmVtb3ZlUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBkZS5yZW1vdmVSZWN1cnNpdmVseShcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe3N1Y2Nlc3M6IHRydWUsIGZpbGVSZW1vdmVkOiBkZX0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVXcml0ZXIoZmU6IEZpbGVFbnRyeSk6IFByb21pc2U8RmlsZVdyaXRlcj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZVdyaXRlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmUuY3JlYXRlV3JpdGVyKFxuICAgICAgICAgICAgICAgIHdyaXRlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod3JpdGVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlIGNvbnRlbnQgdG8gRmlsZUVudHJ5LlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBXcml0ZSB0byBhbiBleGlzdGluZyBmaWxlLlxuICAgICAqIEBwYXJhbSB7RmlsZUVudHJ5fSBmZSBmaWxlIGVudHJ5IG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgQmxvYiB8IEFycmF5QnVmZmVyfSB0ZXh0IHRleHQgY29udGVudCBvciBibG9iIHRvIHdyaXRlXG4gICAgICogQHBhcmFtIHtJV3JpdGVPcHRpb25zfSBvcHRpb25zIHJlcGxhY2UgZmlsZSBpZiBzZXQgdG8gdHJ1ZS4gU2VlIFdyaXRlT3B0aW9ucyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxGaWxlRW50cnk+fSAgUmV0dXJucyBhIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byB1cGRhdGVkIGZpbGUgZW50cnkgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxuICAgICAqL1xuICAgIHByaXZhdGUgd3JpdGVGaWxlRW50cnkoXG4gICAgICAgIGZlOiBGaWxlRW50cnksXG4gICAgICAgIHRleHQ6IHN0cmluZyxcbiAgICAgICAgb3B0aW9uczogSVdyaXRlT3B0aW9uc1xuICAgICkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVXcml0ZXIoZmUpXG4gICAgICAgICAgICAudGhlbih3cml0ZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFwcGVuZCkge1xuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuc2Vlayh3cml0ZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy50cnVuY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICB3cml0ZXIudHJ1bmNhdGUob3B0aW9ucy50cnVuY2F0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGUod3JpdGVyLCB0ZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiBmZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3cml0ZShcbiAgICAgICAgd3JpdGVyOiBGaWxlV3JpdGVyLFxuICAgICAgICBndTogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd3JpdGVyLm9ud3JpdGVlbmQgPSBldnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh3cml0ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdyaXRlci5lcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3cml0ZXIud3JpdGUoZ3UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=