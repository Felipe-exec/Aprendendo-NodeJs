//inclusão de bibliotecas
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

//definição de endereço / url
const hostname = '127.0.0.1';
const port = 3000;

//implementação da regra de negócio
const server = http.createServer((req, res) => {
  var resposta;
  const urlparse = url.parse(req.url, true);
  //criar um usuario e atualizar um usuario
  //receber informações do usuario
  const params = queryString.parse(urlparse.search);

  if(urlparse.pathname == '/criar-atualizar-usuario')
  {
    //salvar informacoes do usuario
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function(err)
    {
      if(err) throw err;
      console.log('saved!');

      resposta = 'usuario criado/atualizado!';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
    
  }
//selecionar usuario
 else if(urlparse.pathname == '/selecionar-usuario')
 {
  fs.readFile('users/' + params.id + '.txt', function(err, data)
  {
    resposta = data;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
  })
 }
  //remover usuario
  else if(urlparse.pathname == '/remover-usuario')
  {
   fs.unlink('users/' + params.id + '.txt', function(err, data)
   {
     resposta = data;
     
     resposta = err ? "usuario nao encontrado" : 'usuario removido.';

     res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
   });
  }

});

//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//localhost:3000/criar-atualizar-usuario?nome=felipe&idade=21&id=1
//localhost:3000/criar-atualizar-usuario?nome=felipe&idade=120&id=1
//localhost:3000/selecionar-usuario?id=1
//localhost:3000/remover-usuario?id=1