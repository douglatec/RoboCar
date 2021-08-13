//https://www.youtube.com/watch?v=4W55nFDyIrc

const puppeteer = require('puppeteer');
const xlsxFile = require('read-excel-file/node');


// Lendo os dados de uma planilha EXCEL
let j=0;
let dados='';

xlsxFile('./Car.xlsx').then((rows)=>{ 
  for (i in rows){
         dados = dados +','+ rows[i][j];
  }
  
console.log('Bem vindo a consulta Automatica do CAR!');

//Rerecendo a lista de CAR's e CPF do CPF da pessoa objeto de bsuca
let listaDeCars =dados.split(',').slice(1);
let cpf ='67464254791';

console.log("INICIO DA ANALISE.....");


//Robo que acesse o site do Car e faz loop comparando CPF e Codigo CAR.
for (let i=0;i<listaDeCars.length;i++){

  async function robo() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();     
    const numeroCar = listaDeCars[i];    
    const numeroCpf = cpf;    
    const qualquerUrl = `https://www.car.gov.br/intranet/autenticacao/listarPerguntasVerificacao?car=${numeroCar}&cpfCnpj=${numeroCpf} `;
  
    await page.goto(qualquerUrl);
    
  
   const resultado = await page.evaluate(() => {
     
     let retornoDaConsulta = document.querySelector('body').innerText.split(":"); 
     let tamanhoDaMenssagem = retornoDaConsulta[2].length;
     let tamanhoCalculadoDaMenssagem = tamanhoDaMenssagem - 14;
     return retornoDaConsulta[2].substring(1, tamanhoCalculadoDaMenssagem);
  });
  
  
  
  let resultadoDaAnalise = "";  
  let menssagemDeSucesso = "O CPF / CNPJ e o Número do Recibo informados não possuem registro no sistema. Verifique se digitou corretamente as informações.";

  if(resultado==menssagemDeSucesso){    
    resultadoDaAnalise =`Este numero CAR ${numeroCar} NÃO pertence ao CPF ${numeroCpf}`;
  } else{    
    resultadoDaAnalise =`Este numero CAR ${numeroCar} pertence ao CPF ${numeroCpf}`;
  }

  var fs = require('fs');
  fs.writeFile('./arquivoCar.txt',resultadoDaAnalise+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
    if (err) throw err;    
});  
  await browser.close();  
  }
  robo();
}
  })

  








