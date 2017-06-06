var SoftUpload = {

  upload: document.getElementById("upload"),
  step1:  document.querySelector(".step1"),
  step2:  document.querySelector(".step2"),
  delays: [1,2,8,5,10],

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

    document.querySelector(".more-files").addEventListener("click", SoftUpload.backToFirstStep);
    document.querySelector(".close-import").addEventListener("click", SoftUpload.backToFirstStep);
  },

  backToFirstStep: function() {
    location.reload();
  },

  read: function(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      SoftUpload.preview(files[i]);
    }

    // TODO: Aqui deveriamos colocar um ajax para salvar o arquivo no servidor - @thiago
  },

  preview: function(file) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var node     = document.createElement("li");
      var span     = document.createElement("span");
      var bg       = document.createElement("div"); bg.className  = "bg";
      var div      = document.createElement("div"); div.className = "progress";
      var circle   = document.createElement("div"); circle.className = "circle";
      var filename = document.createTextNode(file.name);

      span.appendChild(filename);
      div.appendChild(bg).appendChild(span);
      div.appendChild(circle);
      node.appendChild(div);
      document.getElementById("files-list").append(node);

      // Aqui usei um cálculo para simular um upload (por não tratar a requisição de envio ao servidor)
      // O cálculo certo é baseado no file.size! - @thiago

      var width = 0;
      var fakeUpload = setInterval(function() {
        var random = SoftUpload.delays[Math.floor(Math.random() * SoftUpload.delays.length)]
        if((width + random) > 100)
          width = 100;
        else
          width += random;
        bg.style.width = width + "%"
        if(width >= 100) {
          clearInterval(fakeUpload);
          div.querySelector(".circle").className = "circle white"
        }
      }, 300);

    };

    reader.readAsDataURL(file);


  }

}
