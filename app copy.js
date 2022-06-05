//inclusão de bibliotecas
const http = require('http');
const url = require('url');
const queryString = require('query-string');

//definição de endereço / url
const hostname = '127.0.0.1';
const port = 3000;

//implementação da regra de negócio
const server = http.createServer((req, res) => {
  //pegar pergunta na url
  const params = queryString.parse(url.parse(req.url, true).search);

  //verificar a pergunta e escolher resposta
  let resposta;
  if (params.pergunta == 'melhor-filme')
  {
    resposta = 'Star wars';
  }
  else if (params.pergunta == 'melhor-tecnologia-backend')
  {
    resposta = 'nodejs';
  }
  else
  {
    resposta = 'nao sei, foi mal ;('
  }
  //retornar pergunta escolhida

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});

//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});