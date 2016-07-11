var exec = require('child_process').exec;
fs = require('fs');

new Vue({
  el: '#app',
  data: {
    log: 'Hello Vue.js!',
    fileName: '',
    content: '',
  },
  methods:{
    init: function() {
      var that = this;
      exec('mkdir blog && cd blog && hexo init', function(err, stdout, stderr) {
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
      exec('cd blog && hexo new ' + name, function(err, stdout, stderr) {
        if (err) throw err;
        that.log += stdout;
        that.openFile('../hexo-client/blog/source/_posts/'+ name+'.md');
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
      exec('cd blog && hexo s -o', function(err, stdout, stderr) {
        if (err) throw err;
        that.log += stdout;
      });
    },

  }
});
