var SoftUpload = {

  upload: document.getElementById("upload"),
  input:  document.getElementById("upload-field"),
  step1:  document.querySelector(".step1"),
  step2:  document.querySelector(".step2"),
  delays: [1,2,8,5,10],

  initialize: function() {
    // TODO: Fazer validações e fallback para tipo de arquivo, suporte de navegador para as tecnologias utilizadas
    SoftUpload.bindEvents();
  },

  bindEvents: function() {
    upload.ondragover  = function() { this.className = 'hover'; return false; };
    upload.ondragleave = function() { this.classList.remove('hover'); return false; };
    upload.ondragend   = function() { this.className = ''; return false; };
    upload.ondrop      = function(e) {
      e.preventDefault();
      this.className = '';
      SoftUpload.step1.className += " hidden";
      SoftUpload.step2.classList.remove("hidden");
      SoftUpload.read(e.dataTransfer.files);
    }

    document.querySelector(".more-files").addEventListener("click", SoftUpload.backToFirstStep);
    document.querySelector(".close-import").addEventListener("click", SoftUpload.cancel);
    document.querySelector(".cancel").addEventListener("click", SoftUpload.cancel);
    document.querySelector(".step1 p a").addEventListener("click", SoftUpload.bindClick);
    SoftUpload.input.onchange = function() { SoftUpload.readInput(this.files); }
  },

  read: function(files) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      SoftUpload.preview(files[i]);
    }

    // TODO: Aqui deveriamos colocar um ajax para salvar o arquivo no servidor - @thiago
  },

  readInput: function(files) {
    SoftUpload.upload.className = '';
    SoftUpload.step1.className += " hidden";
    SoftUpload.step2.classList.remove("hidden");

    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
      reader.onload = (function(file) {
        SoftUpload.appendFiles(file);
      })(f);
    }
  },

  appendFiles: function(file) {
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
  },

  preview: function(file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      SoftUpload.appendFiles(file);
    };
    reader.readAsDataURL(file);
  },

  backToFirstStep: function() {
    SoftUpload.upload.className = '';
    SoftUpload.step1.classList.remove("hidden");
    SoftUpload.step2.className += " hidden";
  },

  cancel: function() {
    location.reload();
  },

  bindClick: function() { SoftUpload.input.click(); },

}
