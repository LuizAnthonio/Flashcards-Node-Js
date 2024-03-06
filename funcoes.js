const { error } = require("console");
const fs = require("fs");
const scan = require("readline-sync");

class Funcoes{

    static formatarDadosPerguntas(dir){
        const ques = fs.readFileSync(dir, "utf-8")

        //console.log(ques.split("@@").length);

         return ques.split("@@");


    }

    

    static verificaSeExiste(pasta){

        let cam = pasta;

        console.log(cam)
        
        try{
           const stat =  fs.statSync(cam);

           return stat.isDirectory();

       }catch(err){

        console.log(err)

        return false;

       }

    }

    static salvarDados(arquivo,dado){

        dado = dado+"\n";


        let arq_existe = this.verificaSeExiste(arquivo.split("/")[0]);
        
        !arq_existe ? fs.mkdirSync(arquivo.split("/")[0]) : 0;

        try{
            fs.appendFileSync(arquivo,dado);
            console.log("Deu bom!")
            return true;

        }catch(err){
            console.log("Deu erro:",err)
            return false;
        }


    }


    static materias(pergunta_materia){

        let materias_objs = []
       /// let pergunta_materia;

        while(pergunta_materia != -1){

            
            pergunta_materia = scan.question("Que materias vc vai estudar? ");
            
            if (pergunta_materia != -1){
                let numero_de_dificuldade = scan.questionInt("Qual o seu nivel de dificuldade com esta materia? ");
                
                let objeto = {};
            
                objeto.materia = pergunta_materia;
                objeto.numero_de_dificuldade = numero_de_dificuldade;
            
                materias_objs.push(objeto)

            }

        }

        return materias_objs;

    }

    static fabQuest(questoesTot) {

        let tudo = [];
    
        for (let a = 0; a < questoesTot.length; a++) {
    
    
    
            let obj = {};
    
    
            let p1 = questoesTot[a].split("@")
    
            obj.enun = p1[0]
    
            if(p1[1] != undefined){
    
               // console.log(p1[1] )
            
            let op1 = p1[1].split("\n");
    
            let opcoes = op1.map(e => {
                if (e != '\r') {
                    return e
                } else {
                    return ""
                }
            }) 
    
    
            let novoArr = []
    
            for (let i = 0; i < opcoes.length; i++) {
    
                opcoes[i].includes("\r") ? opcoes[i] = opcoes[i].split("\r")[0] : 0;
    
                opcoes[i] != '' && novoArr.push(opcoes[i]);
    
            }
    
            obj.op = novoArr;
            obj.res = p1[2].split("\r")[1].split("\n")[1]
    
    
    
            tudo.push(obj)
    
    
            }
    
            
    
    
        }
    
        return tudo;
    
    }

    static tabelaMaterias(materias_objs){
        
        let soma_os_numeros = materias_objs.map(e => e.numero_de_dificuldade).reduce((a,b) => a+b,0)
        
        console.log(soma_os_numeros)
        
        let dias_dispoveis = scan.questionInt("Quantos dias durante a semana vc tem disponivel para estudar? ");
        let quatidade_de_horas_disponiveis = scan.questionFloat("Quanto tempo vc deseja ou tem disponivel para estudar na semana? ");
        
        let qtd_horas_por_dia = quatidade_de_horas_disponiveis * dias_dispoveis;
        
        let valor_de_X = qtd_horas_por_dia/soma_os_numeros;
        
        console.log("valor de x ",valor_de_X)
        
        let novosObs = materias_objs.map(e => ({
            materia:e.materia,
            dificuldade:e.numero_de_dificuldade,
            horas: Math.round(e.numero_de_dificuldade * valor_de_X) > 1 ? Math.round(e.numero_de_dificuldade * valor_de_X) : 2
        })) 
        
        //Uma coisa interessante a dificuldado quando vc soma +1 se torna a quantidade de horas quando arredondamos para cima;
        // horas = dificuldade + 1 
        
        console.table(novosObs)
        
        return novosObs;
        
    }
    
    static fazerPerguntas(perguntas){

        let score = 0;
        let erros = [];
        let qtd_perguntas = scan.questionInt("Quantas perguntas quer responder?: ");
        
        qtd_perguntas <= perguntas.length ? 0 : qtd_perguntas = perguntas.length; 
        
        for(let i = 0; i < qtd_perguntas; i++){
            
            console.log(perguntas[i].enun)
            for(let j = 0; j < perguntas[i].op.length; j++){
                console.log(perguntas[i].op[j]);
            }
            
            let minhaResposta = scan.question(": ")

            perguntas[i].res.includes(minhaResposta) && score++;
            
            !perguntas[i].res.includes(minhaResposta) && erros.push(i);

            perguntas[i].res.includes(minhaResposta) ? console.log("Acertou") : console.log("Errou");
            
            
        }




        console.log("Score:",score)
        console.log(erros)

        return {score: score, qtdErros: erros.length, erros: erros}

    }
    

    
}

module.exports = Funcoes;