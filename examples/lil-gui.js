import * as WEBGIS from '../build/bundle.module.js';
import { pointFun, deletePointFun, _deletePointObject } from './point.js';
import { renderer, scene, camera, _getPointPosition } from './Demo.js';
import { lineCreateFun, dottedLineFun } from './line.js';
import { createBoxFun, _deleteBoxObject, deleteBoxFun } from './box.js';
import { textureTextFun, DOMTextFun } from './text.js';

let saveAs;
(() => {
  saveAs =
    saveAs ||
    // IE 10+ (native saveAs)
    (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator)) ||
    // Everyone else
    (function (view) {
      'use strict';
      // IE <10 is explicitly unsupported
      if (typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
      }
      var doc = view.document,
        // only get URL when necessary in case Blob.js hasn't overridden it yet
        get_URL = function () {
          return view.URL || view.webkitURL || view;
        },
        save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
        can_use_save_link = 'download' in save_link,
        click = function (node) {
          var event = doc.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          node.dispatchEvent(event);
        },
        webkit_req_fs = view.webkitRequestFileSystem,
        req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
        throw_outside = function (ex) {
          (view.setImmediate || view.setTimeout)(function () {
            throw ex;
          }, 0);
        },
        force_saveable_type = 'application/octet-stream',
        fs_min_size = 0,
        // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
        // https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
        // for the reasoning behind the timeout and revocation flow
        arbitrary_revoke_timeout = 500, // in ms
        revoke = function (file) {
          var revoker = function () {
            if (typeof file === 'string') {
              // file is an object URL
              get_URL().revokeObjectURL(file);
            } else {
              // file is a File
              file.remove();
            }
          };
          if (view.chrome) {
            revoker();
          } else {
            setTimeout(revoker, arbitrary_revoke_timeout);
          }
        },
        dispatch = function (filesaver, event_types, event) {
          event_types = [].concat(event_types);
          var i = event_types.length;
          while (i--) {
            var listener = filesaver['on' + event_types[i]];
            if (typeof listener === 'function') {
              try {
                listener.call(filesaver, event || filesaver);
              } catch (ex) {
                throw_outside(ex);
              }
            }
          }
        },
        FileSaver = function (blob, name) {
          // First try a.download, then web filesystem, then object URLs
          var filesaver = this,
            type = blob.type,
            blob_changed = false,
            object_url,
            target_view,
            dispatch_all = function () {
              dispatch(filesaver, 'writestart progress write writeend'.split(' '));
            },
            // on any filesys errors revert to saving with object URLs
            fs_error = function () {
              // don't create more object URLs than needed
              if (blob_changed || !object_url) {
                object_url = get_URL().createObjectURL(blob);
              }
              if (target_view) {
                target_view.location.href = object_url;
              } else {
                var new_tab = view.open(object_url, '_blank');
                if (new_tab == undefined && typeof safari !== 'undefined') {
                  //Apple do not allow window.open, see http://bit.ly/1kZffRI
                  view.location.href = object_url;
                }
              }
              filesaver.readyState = filesaver.DONE;
              dispatch_all();
              revoke(object_url);
            },
            abortable = function (func) {
              return function () {
                if (filesaver.readyState !== filesaver.DONE) {
                  return func.apply(this, arguments);
                }
              };
            },
            create_if_not_found = { create: true, exclusive: false },
            slice;
          filesaver.readyState = filesaver.INIT;
          if (!name) {
            name = 'download';
          }
          if (can_use_save_link) {
            object_url = get_URL().createObjectURL(blob);
            save_link.href = object_url;
            save_link.download = name;
            click(save_link);
            filesaver.readyState = filesaver.DONE;
            dispatch_all();
            revoke(object_url);
            return;
          }
          // Object and web filesystem URLs have a problem saving in Google Chrome when
          // viewed in a tab, so I force save with application/octet-stream
          // http://code.google.com/p/chromium/issues/detail?id=91158
          // Update: Google errantly closed 91158, I submitted it again:
          // https://code.google.com/p/chromium/issues/detail?id=389642
          if (view.chrome && type && type !== force_saveable_type) {
            slice = blob.slice || blob.webkitSlice;
            blob = slice.call(blob, 0, blob.size, force_saveable_type);
            blob_changed = true;
          }
          // Since I can't be sure that the guessed media type will trigger a download
          // in WebKit, I append .download to the filename.
          // https://bugs.webkit.org/show_bug.cgi?id=65440
          if (webkit_req_fs && name !== 'download') {
            name += '.download';
          }
          if (type === force_saveable_type || webkit_req_fs) {
            target_view = view;
          }
          if (!req_fs) {
            fs_error();
            return;
          }
          fs_min_size += blob.size;
          req_fs(
            view.TEMPORARY,
            fs_min_size,
            abortable(function (fs) {
              fs.root.getDirectory(
                'saved',
                create_if_not_found,
                abortable(function (dir) {
                  var save = function () {
                    dir.getFile(
                      name,
                      create_if_not_found,
                      abortable(function (file) {
                        file.createWriter(
                          abortable(function (writer) {
                            writer.onwriteend = function (event) {
                              target_view.location.href = file.toURL();
                              filesaver.readyState = filesaver.DONE;
                              dispatch(filesaver, 'writeend', event);
                              revoke(file);
                            };
                            writer.onerror = function () {
                              var error = writer.error;
                              if (error.code !== error.ABORT_ERR) {
                                fs_error();
                              }
                            };
                            'writestart progress write abort'.split(' ').forEach(function (event) {
                              writer['on' + event] = filesaver['on' + event];
                            });
                            writer.write(blob);
                            filesaver.abort = function () {
                              writer.abort();
                              filesaver.readyState = filesaver.DONE;
                            };
                            filesaver.readyState = filesaver.WRITING;
                          }),
                          fs_error,
                        );
                      }),
                      fs_error,
                    );
                  };
                  dir.getFile(
                    name,
                    { create: false },
                    abortable(function (file) {
                      // delete file if it already exists
                      file.remove();
                      save();
                    }),
                    abortable(function (ex) {
                      if (ex.code === ex.NOT_FOUND_ERR) {
                        save();
                      } else {
                        fs_error();
                      }
                    }),
                  );
                }),
                fs_error,
              );
            }),
            fs_error,
          );
        },
        FS_proto = FileSaver.prototype,
        saveAs = function (blob, name) {
          return new FileSaver(blob, name);
        };
      FS_proto.abort = function () {
        var filesaver = this;
        filesaver.readyState = filesaver.DONE;
        dispatch(filesaver, 'abort');
      };
      FS_proto.readyState = FS_proto.INIT = 0;
      FS_proto.WRITING = 1;
      FS_proto.DONE = 2;

      FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
          null;

      return saveAs;
    })((typeof self !== 'undefined' && self) || (typeof window !== 'undefined' && window) || this.content);
  // `self` is undefined in Firefox for Android content script context
  // while `this` is nsIContentFrameMessageManager
  // with an attribute `content` that corresponds to the window

  if (typeof module !== 'undefined' && module !== null) {
    module.exports = saveAs;
  } else if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define([], function () {
      return saveAs;
    });
  }
})();

const gui = new WEBGIS.GUI();

let sceneJson;
const obj = {
  getPositionVisible: false,
  exportJson: () => {
    sceneJson = scene.toJSON();
    console.log(sceneJson);
    /* var content = JSON.stringify(sceneJson);
    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'save.json'); */
  },
};
let _getPositionVisible = false;
gui.add(obj, 'getPositionVisible').onChange((val) => {
  _getPositionVisible = val;
});
// gui.add(obj, 'exportJson');
let dynamicFlag = false;
const point = () => {
  let pointX = 0,
    pointY = 0,
    pointZ = 0,
    pointColor = '#ff0000',
    pointSize = 1,
    pointOpacity = 1;

  const pointObj = {
    x: 0,
    y: 0,
    z: 0,
    color: '#ff0000',
    size: 1,
    opacity: 1,
    dynamicFlag: false,
    addPoint: () => {
      scene.add(
        pointFun({
          x: pointX,
          y: pointY,
          z: pointZ,
          color: pointColor,
          size: pointSize,
          opacity: pointOpacity,
        }),
      );
      renderer.render(scene, camera);
    },
    deletePoint: () => {
      deletePointFun(_deletePointObject);
    },
  };

  const pointFolder = gui.addFolder('point');

  pointFolder.add(pointObj, 'x', -10, 10, 0.1).onChange((val) => {
    pointX = val;
  });
  pointFolder.add(pointObj, 'y', -10, 10, 0.1).onChange((val) => {
    pointY = val;
  });
  pointFolder.add(pointObj, 'z', -10, 10, 0.1).onChange((val) => {
    pointZ = val;
  });
  pointFolder.addColor(pointObj, 'color').onChange((val) => {
    pointColor = val;
  });
  pointFolder.add(pointObj, 'size', 0, 5, 0.1).onChange((val) => {
    pointSize = val;
  });
  pointFolder.add(pointObj, 'opacity', 0, 1, 0.1).onChange((val) => {
    pointOpacity = val;
  });
  pointFolder.add(pointObj, 'dynamicFlag').onChange((val) => {
    console.log(val);
    dynamicFlag = val;
  });
  pointFolder.add(pointObj, 'addPoint');
  pointFolder.add(pointObj, 'deletePoint');
};
point();

const line = () => {
  let lineX1 = 0,
    lineY1 = 0,
    lineZ1 = 0,
    lineX2 = 5,
    lineY2 = 5,
    lineZ2 = 5,
    lineColor = 0x6094ea,
    lineWidth = 1;
  const lineObj = {
    x1: 0,
    y1: 0,
    z1: 0,
    x2: 5,
    y2: 5,
    z2: 5,
    lineWidth: 1,
    lineColor: 0x6094ea,
    addLine: () => {
      scene.add(
        lineCreateFun({
          x1: lineX1,
          y1: lineY1,
          z1: lineZ1,
          x2: lineX2,
          y2: lineY2,
          z2: lineZ2,
          lineWidth,
          lineColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const lineFolder = gui.addFolder('line');

  lineFolder.add(lineObj, 'x1', -10, 10, 0.1).onChange((val) => {
    lineX1 = val;
  });
  lineFolder.add(lineObj, 'y1', -10, 10, 0.1).onChange((val) => {
    lineY1 = val;
  });
  lineFolder.add(lineObj, 'z1', -10, 10, 0.1).onChange((val) => {
    lineZ1 = val;
  });
  lineFolder.add(lineObj, 'x2', -10, 10, 0.1).onChange((val) => {
    lineX2 = val;
  });
  lineFolder.add(lineObj, 'y2', -10, 10, 0.1).onChange((val) => {
    lineY2 = val;
  });
  lineFolder.add(lineObj, 'z2', -10, 10, 0.1).onChange((val) => {
    lineZ2 = val;
  });
  lineFolder.add(lineObj, 'lineWidth', -10, 10, 0.1).onChange((val) => {
    lineWidth = val;
  });
  lineFolder.addColor(lineObj, 'lineColor').onChange((val) => {
    lineColor = val;
  });
  lineFolder.add(lineObj, 'addLine');
  lineFolder.close();
};
line();

const lineDotted = () => {
  let lineDottedX1 = 0,
    lineDottedY1 = 0,
    lineDottedZ1 = 0,
    lineDottedX2 = 5,
    lineDottedY2 = 5,
    lineDottedZ2 = 5,
    lineDottedColor = 0x6094ea,
    lineDottedWidth = 1;
  const lineDottedObj = {
    x1: 0,
    y1: 0,
    z1: 0,
    x2: 5,
    y2: 5,
    z2: 5,
    lineDottedWidth: 1,
    lineDottedColor: 0x6094ea,
    addLineDotted: () => {
      scene.add(
        dottedLineFun({
          x1: lineDottedX1,
          y1: lineDottedY1,
          z1: lineDottedZ1,
          x2: lineDottedX2,
          y2: lineDottedY2,
          z2: lineDottedZ2,
          lineDottedWidth,
          lineDottedColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const lineDottedFolder = gui.addFolder('lineDotted');

  lineDottedFolder.add(lineDottedObj, 'x1', -10, 10, 0.1).onChange((val) => {
    lineDottedX1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'y1', -10, 10, 0.1).onChange((val) => {
    lineDottedY1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'z1', -10, 10, 0.1).onChange((val) => {
    lineDottedZ1 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'x2', -10, 10, 0.1).onChange((val) => {
    lineDottedX2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'y2', -10, 10, 0.1).onChange((val) => {
    lineDottedY2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'z2', -10, 10, 0.1).onChange((val) => {
    lineDottedZ2 = val;
  });
  lineDottedFolder.add(lineDottedObj, 'lineDottedWidth', -10, 10, 0.1).onChange((val) => {
    lineDottedWidth = val;
  });
  lineDottedFolder.addColor(lineDottedObj, 'lineDottedColor').onChange((val) => {
    lineDottedColor = val;
  });
  lineDottedFolder.add(lineDottedObj, 'addLineDotted');
  lineDottedFolder.close();
};
lineDotted();

const boxGui = () => {
  let boxWidth = 1,
    boxHeight = 1,
    boxDepth = 1,
    boxColor = 0xee5253,
    boxMap = undefined;
  const boxObj = {
    width: 1,
    height: 1,
    depth: 1,
    boxColor: 0xee5253,
    boxMap: undefined,
    addBox: () => {
      scene.add(
        createBoxFun({
          with: boxWidth,
          height: boxHeight,
          width: boxDepth,
          boxColor,
          boxMap,
        }),
      );
      renderer.render(scene, camera);
    },
    deleteBox: () => {
      deleteBoxFun(_deleteBoxObject);
    },
  };
  const boxFolder = gui.addFolder('box');

  boxFolder.add(boxObj, 'width', 0, 10, 0.1).onChange((val) => {
    boxWidth = val;
  });
  boxFolder.add(boxObj, 'height', 0, 10, 0.1).onChange((val) => {
    boxHeight = val;
  });
  boxFolder.add(boxObj, 'depth', 0, 10, 0.1).onChange((val) => {
    boxDepth = val;
  });
  boxFolder
    .add(boxObj, 'boxMap', {
      null: undefined,
      sea: '../../examples/public/img/sea.jpg',
      desert: '../../examples/public/img/desert.jpg',
      forest: '../../examples/public/img/forest.jpg',
    })
    .onChange((val) => {
      boxMap = val;
    });
  boxFolder.addColor(boxObj, 'boxColor').onChange((val) => {
    boxColor = val;
  });
  boxFolder.add(boxObj, 'addBox');
  boxFolder.add(boxObj, 'deleteBox');
  boxFolder.close();
};
boxGui();

const textGui = () => {
  let x = 0,
    y = 0,
    z = 0,
    text = '聚米画沙',
    fontFamily = 1,
    fontSize = 1,
    fontColor = 1,
    fontOpacity = 0xee5253,
    backgroundColor = '#2980b9',
    moveToObject = false;

  const textObj = {
    x: 0,
    y: 0,
    z: 0,
    text: '聚米画沙',
    fontFamily: 1,
    fontSize: 1,
    fontColor: 1,
    fontOpacity: 0xee5253,
    backgroundColor: '#2980b9',
    moveToObject: false,
    addText: () => {
      scene.add(
        textureTextFun({
          x,
          y,
          z,
          text,
          fontFamily,
          fontSize,
          fontColor,
          fontOpacity,
          backgroundColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };
  const cantainer = document.getElementById('webgl-output');
  cantainer.addEventListener('click', function () {
    if (moveToObject === true) {
      const textObject = scene.children.find((item) => item.isTextureTextSymbol === true);

      textObject.position.set(_getPointPosition.x + 2, _getPointPosition.y + 3, _getPointPosition.z);
    }
  });
  const textFolder = gui.addFolder('textureText');

  textFolder.add(textObj, 'x', -10, 10, 1).onChange((val) => {
    x = val;
  });
  textFolder.add(textObj, 'y', -10, 10, 1).onChange((val) => {
    y = val;
  });
  textFolder.add(textObj, 'z', -10, 10, 1).onChange((val) => {
    z = val;
  });
  textFolder.add(textObj, 'text').onChange((val) => {
    text = val;
  });
  textFolder.add(textObj, 'fontFamily', ['arial', '微软雅黑']).onChange((val) => {
    fontFamily = val;
  });
  textFolder.add(textObj, 'fontSize', 0, 10, 0.1).onChange((val) => {
    fontSize = val;
  });
  textFolder.addColor(textObj, 'fontColor').onChange((val) => {
    fontColor = val;
  });
  textFolder.add(textObj, 'fontOpacity', 0, 1, 0.1).onChange((val) => {
    fontOpacity = val;
  });
  textFolder.addColor(textObj, 'backgroundColor').onChange((val) => {
    backgroundColor = val;
  });
  textFolder.add(textObj, 'moveToObject').onChange((val) => {
    moveToObject = val;
  });

  textFolder.add(textObj, 'addText');
  textFolder.close();
};
textGui();

const DOMTextGui = () => {
  let left = 100,
    top = 10,
    text = '聚米画沙',
    fontFamily = 1,
    fontSize = 1,
    fontColor = 1,
    fontOpacity = 0xee5253,
    backgroundColor = '#2980b9';

  const textObj = {
    left: 100,
    top: 10,
    text: '聚米画沙',
    fontFamily: 1,
    fontSize: 1,
    fontColor: 1,
    fontOpacity: 0xee5253,
    backgroundColor: '#2980b9',
    moveToObject: false,
    addText: () => {
      document.body.appendChild(
        DOMTextFun({
          left,
          top,
          text,
          fontFamily,
          fontSize,
          fontColor,
          fontOpacity,
          backgroundColor,
        }),
      );
      renderer.render(scene, camera);
    },
  };

  const textFolder = gui.addFolder('DOMText');

  textFolder.add(textObj, 'left', 0, 1920, 1).onChange((val) => {
    left = val;
  });
  textFolder.add(textObj, 'top', 0, 1080, 1).onChange((val) => {
    top = val;
  });
  textFolder.add(textObj, 'text').onChange((val) => {
    text = val;
  });
  textFolder.add(textObj, 'fontFamily', ['arial', '微软雅黑']).onChange((val) => {
    fontFamily = val;
  });
  textFolder.add(textObj, 'fontSize', 0, 10, 0.1).onChange((val) => {
    fontSize = val;
  });
  textFolder.addColor(textObj, 'fontColor').onChange((val) => {
    fontColor = val;
  });
  textFolder.add(textObj, 'fontOpacity', 0, 1, 0.1).onChange((val) => {
    fontOpacity = val;
  });
  textFolder.addColor(textObj, 'backgroundColor').onChange((val) => {
    backgroundColor = val;
  });

  textFolder.add(textObj, 'addText');
  textFolder.close();
};
DOMTextGui();

export { gui, dynamicFlag, _getPositionVisible };
