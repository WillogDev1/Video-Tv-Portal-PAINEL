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

/* Inicia declaração das pastas public e views */
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/* Serve o arquivo html portal 01 */
app.get("/portal01", (req, res) => {
  fs.readFile("../views/Web-Video-Portal-01.html", (err, html) =>
    res.end(html)
  );
});

/* Serve o arquivo html portal 02 */
app.get("/portal02", (req, res) => {
  fs.readFile("../views/Web-Video-Portal-02.html", (err, html) =>
    res.end(html)
  );
});

/* Serve o arquivo html portal 03 */
app.get("/portal03", (req, res) => {
  fs.readFile("../views/Web-Video-Portal-03.html", (err, html) =>
    res.end(html)
  );
});

/* Serve o arquivo html portal 04 */
app.get("/portal04", (req, res) => {
  fs.readFile("../views/Web-Video-Portal-04.html", (err, html) =>
    res.end(html)
  );
});

/* Cria vídeo */
let currenVideoIndex = 0;
var nomeArquivoVideo01 = [];
var nomeArquivoVideo02 = [];
var nomeArquivoVideo03 = [];
var nomeArquivoVideo04 = [];

// Buscar arquivos do diretorio /video-portal-01
fs.readdir(__dirname + "/video-portal-01", (err, files) => {
  if (err)
    // Se houver erro imprime o erro
    console.log(err);
  else {
    // Imprime Os nomes dos arquivos atuais no diretorio
    console.log("\nNomes dos arquivos atuais:");
    files.forEach((file) => {
      // Inseri os nomes do videos no arquivos
      nomeArquivoVideo01.push("video-portal-01/" + file);
      // Verifica Array Criado
      console.log("Vídeo à transmitir ", nomeArquivoVideo01);
    });
  }
});

// Buscar arquivos do diretorio /video-portal-02
fs.readdir(__dirname + "/video-portal-02", (err, files) => {
  if (err)
    // Se houver erro imprime o erro
    console.log(err);
  else {
    // Imprime Os nomes dos arquivos atuais no diretorio
    console.log("\nNomes dos arquivos atuais:");
    files.forEach((file) => {
      // Inseri os nomes do videos no arquivos
      nomeArquivoVideo02.push("video-portal-02/" + file);
      // Verifica Array Criado
      console.log("Vídeo à transmitir ", nomeArquivoVideo02);
    });
  }
});

// Buscar arquivos do diretorio /video-portal-03
fs.readdir(__dirname + "/video-portal-03", (err, files) => {
  if (err)
    // Se houver erro imprime o erro
    console.log(err);
  else {
    // Imprime Os nomes dos arquivos atuais no diretorio
    console.log("\nNomes dos arquivos atuais:");
    files.forEach((file) => {
      // Inseri os nomes do videos no arquivos
      nomeArquivoVideo03.push("video-portal-03/" + file);
      // Verifica Array Criado
      console.log("Vídeo à transmitir ", nomeArquivoVideo03);
    });
  }
});

// Buscar arquivos do diretorio /video-portal-04
fs.readdir(__dirname + "/video-portal-04", (err, files) => {
  if (err)
    // Se houver erro imprime o erro
    console.log(err);
  else {
    // Imprime Os nomes dos arquivos atuais no diretorio
    console.log("\nNomes dos arquivos atuais:");
    files.forEach((file) => {
      // Inseri os nomes do videos no arquivos
      nomeArquivoVideo04.push("video-portal-04/" + file);
      // Verifica Array Criado
      console.log("Vídeo à transmitir ", nomeArquivoVideo04);
    });
  }
});

/* Serve o vídeo em um endpoint */
app.get("/portal01-video", (req, res) => {
  console.log("Terminal " + nomeArquivoVideo01 + " Conectado!");
  const videoFile = nomeArquivoVideo01[currenVideoIndex];
  fs.stat(videoFile, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end("<h1Video não encontrado</h1>");
    }

    // Variáveis necessárias para montar o chunk header corretamente
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || "").replace(/bytes=/, "").split("-")[0]);
    const end = size - 1;
    const chunkSize = end - start + 1;
    // Definindo headers de chunk
    res.set({
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    // É importante usar status 206 - Partial Content para o streaming funcionar
    res.status(206);
    // Utilizando ReadStream do Node.js
    // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
    const stream = fs.createReadStream(videoFile, { start, end });

    stream.on("open", () => stream.pipe(res));
    stream.on("error", (streamErr) => res.end(streamErr));
  });
});

/* Serve o vídeo em um endpoint */
app.get("/portal02-video", (req, res) => {
  const videoFile = nomeArquivoVideo02[currenVideoIndex];
  fs.stat(videoFile, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end("<h1Video não encontrado</h1>");
    }

    // Variáveis necessárias para montar o chunk header corretamente
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || "").replace(/bytes=/, "").split("-")[0]);
    const end = size - 1;
    const chunkSize = end - start + 1;
    // Definindo headers de chunk
    res.set({
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    // É importante usar status 206 - Partial Content para o streaming funcionar
    res.status(206);
    // Utilizando ReadStream do Node.js
    // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
    const stream = fs.createReadStream(videoFile, { start, end });

    stream.on("open", () => stream.pipe(res));
    stream.on("error", (streamErr) => res.end(streamErr));
  });
});


/* Serve o vídeo em um endpoint */
app.get("/portal03-video", (req, res) => {
  const videoFile = nomeArquivoVideo03[currenVideoIndex];
  fs.stat(videoFile, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end("<h1Video não encontrado</h1>");
    }

    // Variáveis necessárias para montar o chunk header corretamente
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || "").replace(/bytes=/, "").split("-")[0]);
    const end = size - 1;
    const chunkSize = end - start + 1;
    // Definindo headers de chunk
    res.set({
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    // É importante usar status 206 - Partial Content para o streaming funcionar
    res.status(206);
    // Utilizando ReadStream do Node.js
    // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
    const stream = fs.createReadStream(videoFile, { start, end });

    stream.on("open", () => stream.pipe(res));
    stream.on("error", (streamErr) => res.end(streamErr));
  });
});

/* Serve o vídeo em um endpoint */
app.get("/portal04-video", (req, res) => {
  const videoFile = nomeArquivoVideo04[currenVideoIndex];
  fs.stat(videoFile, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end("<h1Video não encontrado</h1>");
    }

    // Variáveis necessárias para montar o chunk header corretamente
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || "").replace(/bytes=/, "").split("-")[0]);
    const end = size - 1;
    const chunkSize = end - start + 1;
    // Definindo headers de chunk
    res.set({
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });
    // É importante usar status 206 - Partial Content para o streaming funcionar
    res.status(206);
    // Utilizando ReadStream do Node.js
    // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
    const stream = fs.createReadStream(videoFile, { start, end });

    stream.on("open", () => stream.pipe(res));
    stream.on("error", (streamErr) => res.end(streamErr));
  });
});


/* Cria o webservice no seu ip e porta escolihdo */
app.listen(3000, "192.168.0.3", () =>
  console.log("Video-TV-Portal está Online!!")
);