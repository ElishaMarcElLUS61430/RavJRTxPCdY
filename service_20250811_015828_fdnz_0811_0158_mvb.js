// 代码生成时间: 2025-08-11 01:58:28
import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { task, timeout } from 'ember-concurrency';

// 引入第三方压缩库
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default class File解压ToolComponent extends Component {
  @tracked filesToUnzip = A();
  @tracked errorMessage = '';

  // 服务注入
  @service notify;

  // 压缩文件解压任务
  *解压文件Task(压缩文件Blob) {
    try {
      const zip = new JSZip();
      yield zip.loadAsync(压缩文件Blob);
      const files = zip.file(/* 过滤条件 */);
      for (const file of files) {
        if (file.dir) continue;
        yield file.async('blob').then((blob) => {
          saveAs(blob, file.name);
          this.filesToUnzip.pushObject({ name: file.name, type: file.options.type });
        });
      }
    } catch (error) {
      this.errorMessage = `解压出错: ${error.message}`;
      this.notify.error(this.errorMessage);
    }
  }

  // 上传文件并解压
  @action
  uploadAndUnzipFiles(event) {
    const files = event.target.files;
    if (isEmpty(files)) {
      this.errorMessage = '没有上传文件';
      this.notify.error(this.errorMessage);
      return;
    }

    for (let file of files) {
      this.filesToUnzip.pushObject({ name: file.name, type: file.type });
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.解压文件Task.perform(e.target.result);
      };
      fileReader.onerror = (e) => {
        this.errorMessage = `文件读取出错: ${e.target.error.message}`;
        this.notify.error(this.errorMessage);
      };
      fileReader.readAsArrayBuffer(file);
    }
  }
}
