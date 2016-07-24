var exec = require('child_process').exec;
var fs = require('fs');
var shell = require('shelljs');

new Vue({
  el: '#app',
  data: {
    log: 'Hello Vue.js!',
    fileName: '',
    content: '',
    previewUrl: 'http://hanks.xyz',
  },
  methods:{

    init: function() {
      var that = this;
      shell.exec('mkdir blog && cd blog && hexo init && npm install', function(err, stdout, stderr) {
        if (err) throw err;
        that.log += stdout;
      });
    },

    new: function() {
      var that = this;
      var name = that.fileName.trim();
      // filename 只能是数字，字母，-
      if(!/^[A-Za-z0-9-]+$/.test(name)){
        alert('filename 只能包含数字，字母，横线（-）');
        return;
      }

      var path = '../hexo-client/blog/source/_posts/'+ name+'.md';
      var exit = true;
      fs.readFile(path, 'utf8', function (err,data) {
        if (err) {
          shell.exec('cd blog && hexo new ' + name, function(err, stdout, stderr) {
            if (err) throw err;
            that.log += stdout;
            that.openFile(path);
          });
        }else {
          that.openFile(path);
        }
      });

    },
    setting: function() {
      this.openFile('../hexo-client/blog/_config.yml');
    },
    openFile: function(filePath) {
      var that = this;
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        that.content = data;
      });
    },
    saveFile: function(){
      var that = this;
      var name = that.fileName.trim();
      var filePath = '../hexo-client/blog/source/_posts/'+ name +'.md';
      fs.writeFile(filePath, that.content, 'utf8', (err) => {
        if (err) throw err;
        alert(filePath+' have been saved !');
      });
    },
    preview: function() {
      var that = this;
      shell.exec('cd blog && hexo server', function(err, stdout, stderr) {
        if (err) throw err;
        that.log += stdout;
        that.previewUrl = 'http://localhost:4000/';
      });
    },

    stop: function() {
      var that = this;
      shell.kill();
    },

  }
});
