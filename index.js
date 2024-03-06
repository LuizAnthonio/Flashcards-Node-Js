const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const Funcoes = require("./funcoes");
const path = require("path")


//Transformando ejs em html
app.engine('html',require('ejs').renderFile);
app.set('views engine','html');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'))

//usando BodyParser
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));

//app.engine('html',require('ejs').renderFile);
//app.set('view engine','html');
//app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, '/views'));



app.get("/home", (req,res) => {





    //res.json(flasCard)
    res.render("home/home.html")

})

app.get("/flashcards/:materia/:qId",(req,res) => {

    let materia = req.params.materia;
    let qId = req.params.qId;

    let coisa = Funcoes.formatarDadosPerguntas("questoes/flashCards.csv")[0].split(";");

    coisa.shift()
    //console.log(coisa);

    let flasCard;

    const flasCards = coisa.map(e => {
        let infos = e.split(",");
        let objs = {};
        objs.id = parseInt(infos[0])
        objs.pergunta = infos[1]
        objs.resposta = infos[2]
        objs.materia = infos[3]

        return objs;
    })

  
   if(materia != undefined){
       flasCard = flasCards.filter(e => e.materia === materia)
       //res.redirect("/home")

   }else{
    flasCard = flasCards;
   }
   
      if(qId >= flasCard.length){
       //res.redirect("/home")
       res.redirect("/flashcards")
      }


   
   let card = flasCard[qId]
   console.log(flasCard.length > qId)
   
   //let card = flasCard.find(e => e.id === parseInt(qId))
   let idProx = flasCard.findIndex(e => e.id == card.id)
   console.log("oia ",idProx)
   

   console.log(card)

    let idAnt;
    res.render("flashcards/cards.html",{card:card,mostrarPergunta:true,prox:(idProx+1),antes:(idProx-1 < -1) ? idAnt = false : idProx-1 })
})

app.get("/flashcards",(req,res) => {

    let coisa = Funcoes.formatarDadosPerguntas("questoes/flashCards.csv")[0].split(";");

            coisa.shift()
            //console.log(coisa);

            let flasCard;

            const flasCards = coisa.map(e => {
                let infos = e.split(",");
                let objs = {};
                objs.id = parseInt(infos[0])
                objs.pergunta = infos[1]
                objs.resposta = infos[2]
                objs.materia = infos[3]

                return objs;
            })

            
            let todos_os_segmentos = [];
            let idArr = 0;
            
            for(let j = 0; j < flasCards.length; j++){
                !todos_os_segmentos.includes(flasCards[j].materia)&& flasCards[j].materia != undefined && console.log(idArr,"-",flasCards[j].materia)
                !todos_os_segmentos.includes(flasCards[j].materia) && flasCards[j].materia != undefined && idArr++
                !todos_os_segmentos.includes(flasCards[j].materia) && flasCards[j].materia != undefined && todos_os_segmentos.push(flasCards[j].materia);
                
            }

            console.log(todos_os_segmentos)

            res.render("flashcards/menu.html",{materia:todos_os_segmentos})



})


app.listen(3000,()=>{
    console.log("rodando ")
})
