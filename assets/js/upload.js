var SoftUpload = {

  upload: document.getElementById("upload"),
  step1: document.querySelector(".step1"),
  step2: document.querySelector(".step2"),

  initialize: function() {
    SoftUpload.bindEvents();
  },

  bindEvents: function() {
    upload.ondragover = function () { this.className = 'hover'; return false; };
    upload.ondragend  = function () { this.className = ''; return false; };
    upload.ondrop     = function (e) {
      e.preventDefault();
      this.className = '';
      SoftUpload.step1.className += " hidden";
      SoftUpload.step2.classList.remove("hidden");
      SoftUpload.read(e.dataTransfer.files);
    }
  },

  read: function(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      SoftUpload.preview(files[i]);
    }

    // TODO: aqui deveriamos colocar um ajax para salvar o arquivo no servidor

  },

  preview: function(file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var node = document.createElement("li");
      var div = document.createElement("div");
      var filename = document.createTextNode("Arquivo Fonte do site.zip");
      div.className = "progress";
      div.appendChild(filename);
      node.appendChild(div);
      document.getElementById("files-list").append(node);
    };

    reader.readAsDataURL(file);


  }

}
