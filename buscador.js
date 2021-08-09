//https://www.youtube.com/watch?v=4W55nFDyIrc

const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


console.log('Bem vindo a consulta Automatica do CAR!');

let listaDeCars = ['ES-3204559-F8B20493993B44C79DCFCD9BE477027F','ES-3204559-65A5DCAE055D4191A1F94C1D941B7010','ES-3204559-9078E20FF36F4E75806D127F57E3E9A6','ES-3204559-6013209B174D41E8AB60B9C09AAF69E7','ES-3204559-CB92004348BC4BA78D116868F2AFF29E','ES-3204559-A83E73C17AFF4FE58B4F7BB512001318','ES-3204559-947C2A202C3B461E8DB2BD8059FAC773','ES-3204559-0D1E608CBA2646E48D9B076AD76F7474','ES-3204559-C4D0478CA21047EC815A7B0907D51BB1','ES-3204559-7B4CC2F26E654059B4508790E5D371AB','ES-3204559-E661E7D413AA411F9AC49C516C4F6547','ES-3204559-F952582C9E6C44F09C484D91D0E31BB1','ES-3204559-193D985E0641470DBDAC32E7C2616126','ES-3204559-B6C3D4688EB6408AABB3220BD59CA319','ES-3204559-73F5B83D471E4088987E49E6F6436DE0','ES-3204559-0BC60CC726E84F6F813C8688C9D22027','ES-3204559-E32D34AEB545420BA45E435A15726812','ES-3204559-34B0FEB38ADC47DEB2247986FECC0D22'];
//let listaDeCars =['TO-1712405-5A24A3CB62E54854A727379F9AB893CA'];
let cpf ='67464254791';

console.log("INICIO DA ANALISE.....");

for (let i=0;i<listaDeCars.length;i++){

  async function robo() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    //const numeroCar = readlineSync.question('Informe numero do car: ') || 'ES-3204559-73F5B83D471E4088987E49E6F6436DE0';  
    const numeroCar = listaDeCars[i];

    //const numeroCpf = readlineSync.question('Informe o CPF: ') || '67464254791';
    const numeroCpf = cpf;
    
    const qualquerUrl = `https://www.car.gov.br/intranet/autenticacao/listarPerguntasVerificacao?car=${numeroCar}&cpfCnpj=${numeroCpf} `;
  
    await page.goto(qualquerUrl);
    
  
   const resultado = await page.evaluate(() => {
     
     let retornoDaConsulta = document.querySelector('body').innerText.split(":"); 
     let tamanhoDaMenssagem = retornoDaConsulta[2].length;
     let tamanhoCalculadoDaMenssagem = tamanhoDaMenssagem - 14;
     return retornoDaConsulta[2].substring(1, tamanhoCalculadoDaMenssagem);
  });
  
  //console.log(resultado);  //Debug
  
  let resultadoDaAnalise = "";
  //let menssagemDeSucesso = "O login informado já está cadastrado no sistema com perfil de usuário externo.";
  let menssagemDeSucesso = "O CPF / CNPJ e o Número do Recibo informados não possuem registro no sistema. Verifique se digitou corretamente as informações.";
  if(resultado==menssagemDeSucesso){
    //resultadoDaAnalise =`Este numero CAR ${numeroCar} pertence ao CPF ${numeroCpf}`;
    resultadoDaAnalise =`Este numero CAR ${numeroCar} NÃO pertence ao CPF ${numeroCpf}`;
  } else{
    //resultadoDaAnalise =`Este numero CAR ${numeroCar} NÃO pertence ao CPF ${numeroCpf}`;
    resultadoDaAnalise =`Este numero CAR ${numeroCar} pertence ao CPF ${numeroCpf}`;
  }

  var fs = require('fs');
  fs.writeFile('./arquivoCar.txt',resultadoDaAnalise+'\n',{enconding:'utf-8',flag: 'a'}, function (err) {
    if (err) throw err;
    //console.log('Arquivo salvo!');
});
  
  await browser.close();
  }

  robo();
  
  
}






