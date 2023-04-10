/*
    # Criando um servido Web para servir na rede interna
    TODO: - Criar webservice com Nodemoon
    TODO: - Criar rotas para diferentes para diversos portal ( portal-01, portal-02)
    TODO: - Servir diferentes vídeos para cada rota
    TODO: - Teste
*/

/* Declara biblioteca para criação do webservice */
const express = require("express");
const app = express();

/* Declara biblioteca filesystem (fs) para leitura de arquivos e pastas */
const fs = require("fs");

/* Declara que usaremos path para servir pastas public e views */
var path = require("path");

app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  fs.readFile("./views/index.html", (err, html) => res.end(html));
});

app.listen(3000, "IP-DA-SUA-MAQUINA", () =>
  console.log("Video-TV-Portal está Online!!")
);
