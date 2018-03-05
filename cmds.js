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
    log("test <id> - Probar el quiz indicado. ");
    log("p|play - Jugar a preguntar aleatoriamente todos los quizzes.");
    log("credits - Creditos.");
    log("q|quit - Salir del programa.");
    rl.prompt();
};



exports.addCmd = rl =>
{
    rl.question(colorize(' Introduzca una pregunta: ', 'red'),question => {
        rl.question(colorize ('Introduzca la respuesta: ', 'red'), answer => {
            model.add(question, answer);
            log(` ${colorize('Se ha añadido: ','magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
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
    if (typeof id === "undefined") {
        errorlog(`Falta el parametro id`);

        rl.prompt();
    }else {

        try{
            const quiz = model.getByIndex (id);
            rl.question(colorize(`${quiz.question}? `,'red' ), answer =>
            {

                    let textoF1 = (answer.trim()).toLowerCase();
                    let textoF2 = (quiz.answer.trim()).toLowerCase();
                if(textoF1 === textoF2){

                    log (colorize('Su respuesta es correcta. ', 'black'));
                    biglog ('Correcto','green');
                }else{
                    log (colorize('Su respuesta es incorrecta. ', 'black'));
                    biglog('Incorrecto','red');
                }
                rl.prompt();

            });


        }catch (error){
            errorlog (error.message);
            rl.prompt();

        }
    }
};

exports.playCmd =rl => {
    let score = 0;
    let toBeResolved = [];


        for (idm = 0; idm < model.count(); idm++) {
            toBeResolved[idm]=model.getByIndex(idm);

        }
        const playOne = () => {
            if (toBeResolved.length === 0) {
                log('No hay nada más que preguntar.');
                log(`Final del juego. Aciertos: ${score}`);
                biglog(`${score}`, 'magenta');
                rl.prompt();
            } else {

                let id = Math.floor(Math.random() * (toBeResolved.length ));
                toBeResolved.splice(id,1);
                let quiz = model.getByIndex(id);


                rl.question(colorize(`${quiz.question}? `, 'red'), answer => {

                    let textoF1 = (answer.trim()).toLowerCase();
                    let textoF2 = (quiz.answer.trim()).toLowerCase();

                    if (textoF1=== textoF2) {
                        score++;
                        log(`CORRECTO - Lleva ${score} ${colorize(' aciertos')}`);
                        


                        playOne();
                    }else {
                        log('INCORRECTO.');

                        log(`Fin del juego. Aciertos: ${score}`);
                        biglog(`${score}`, 'magenta');
                        rl.prompt();
                    }
                });
            }
        };
    playOne();
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
            log(`Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>','magenta')} ${answer}`);
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

    log('CRISTINA GONZALEZ Y DANIEL CONDE PARRAGA');

    rl.prompt();
};
exports.quitCmd = rl => {
    rl.close();
    rl.prompt();
};

