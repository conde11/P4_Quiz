const {log, biglog, errorlog,colorize}=require ("./out");
const model = require ('./model');

exports.helpCmd = rl =>{
    log("Commandos:");
    log(" h|help - Muestra esta ayuda.");
    log(" list - Listas los quizzes existentes.");
    log(" show<id> - Muestra la pregunta y la respuesta el quiz indicado.");
    log(" add - Añadir un nuevo quiz interactivamente");
    log("delete <id> - Borrar el quiz indicado");
    log(" edit <id> - Editar el quiz indicado.");
    log("test <id> - Probar el quiz indicado ");
    log("p|play - Jugar a preguntar aleatoriamente todos los quizzes");
    log("credits - Creditos.");
    log("q|quit - Salir del programa");
    rl.prompt();
};



exports.addCmd = rl =>
{
    rl.question(colorize(' Introduzca una pregunta: ', 'red'),question => {
        rl.question(colorize ('Introduzca la respuesta:', 'red'), answer => {
            model.add(question, answer);
            log(` ${colorize('Se ha añadido','magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
            rl.prompt();
        });
    });

};

exports.listCmd = rl =>
{
    model.getAll().forEach((quiz,id) => {
        log(`[${colorize(id,'magenta')}]: ${quiz.question}`);

    });
    rl.prompt();
};

exports.showCmd  = (rl,id) =>
{
    if (typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else {
        try{
            const quiz = model.getByIndex (id);
            log(`[${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
        }catch (error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};
exports.testCmd = (rl,id) =>
{
   // if id undefine
    //prompt
    //else

      //  try

        //quiz =
         //rl.question quiz.question resp =>{
          //respuesta === quiz.answer CORRECTO o INCORRECTO
        //prompt
//}

  //      catch
    //        prompt
            
};

exports.playCmd =rl =>
{
    log('Jugar', 'red');
    rl.prompt();
};
exports.deleteCmd = (rl,id) =>
{
    if (typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else {
        try{
             model.deleteByIndex (id);

        }catch (error){
            errorlog(error.message);
        }
    }

    rl.prompt();
};
exports.editCmd = (rl,id) =>
{
    if (typeof id === "undefined"){
        errorlog (`Falta el parametro id.`);
        rl.prompt();
    }else {
        try {
            const quiz = model.getByIndex(id);
            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);

            rl.question(colorize('Introduzca una pregunta: ', 'red'), question => {

                process.stdout.isTTY && setTimeout(()=> {rl.write(quiz.answer)},0);
                rl.question(colorize('Introduzca la respuesta: ', 'red'), answer => {
                model.update(id, question, answer);
            log(`Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize(id, 'magenta')}`);
            rl.prompt();
        })
            ;
        })
            ;
        } catch (error) {
            errorlog(error.message);
            rl.prompt();
        }
    }

};

exports.creditsCmd = rl =>
{
    log('Autores de la practica:');
    log('Nombre1: Cristina Gonzalez Alcala','green');
    log('Nombre2: Daniel Conde Parraga','green');
    rl.prompt();
};
exports.quitCmd = rl => {
    rl.close();
    rl.prompt();
};
