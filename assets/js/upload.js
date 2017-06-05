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
      SoftUpload.step1.className = "hidden";
      SoftUpload.step2.className = "";

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
      var image = new Image();
      image.src = event.target.result;
      image.width = 200;
      SoftUpload.step2.appendChild(image);
    };

    reader.readAsDataURL(file);
  }

}
