
/**
 * Inicia o jogo
 * 
 * @return {void}
 */
function gameStart(){
    //COLOCARÁ MÉTODO choosePiece EM TODAS AS CASAS DO TABULEIRO
    putMethodChoosePiece();
    //COLOCA AS PEÇAS NO TABULEIRO
    putPieces();
}

/**
 * Responsável por colocar as peças no tabuleiro
 * 
 * @return {void}
 */
function putPieces(){
    //LINHAS DO TIME NO TABULEIRO
    var line_1, line_2;
        
    //RECEBERÁ QUAL TIME A PEÇA FAZ PARTE
    var time_color;

    //TIPO DE PEÇA
    var piece_type;

    //FOR QUE PERCORRERÁ DUAS VEZES, PARA COLOCAR OS DOIS TIMES(TIME PRETO E TIME BRANCO)
    for(var j = 0; j<2;j++){
        //VARIÁVEL QUE INFORMARÁ A COR DA PEÇA
        var color;
        if(j == 0){
            color = "white";
            line_1 = document.getElementById('row_1');
            line_2 = document.getElementById('row_2');
            time_color = "white";

        }else if(j == 1){
            color = "black";
            line_1 = document.getElementById('row_8');
            line_2 = document.getElementById('row_7');
            time_color = "black";
        }     
        //FOR QUE PERCORRERÁ 16 VEZES PARA QUE PEÇAS DE UM TIME SEJAM COLOCADAS
        for(var i = 0; i < (line_1.children.length) * 2; i++){
            var link_imagem;
            //CAMPO FLAG QUE AVISARÁ PARA O PROGRAMA QUE PASSAMOS PARA A SEGUNDA LINHA(A DOS PEÕES)
            var line = 'l1';

            if(i==0 || i==7){ //TORRE
                link_imagem = "img/if_" + color + "_rook.png";
                piece_type = "torre";
            }else if(i==1 || i==6){ //CAVALO
                link_imagem = "img/if_" + color + "_knight.png";
                piece_type = "cavalo";
            }else if(i==2 || i==5){ //BISPO
                link_imagem = "img/if_" + color + "_bishop.png";
                piece_type = "bispo";
            }else if(i==3){ //RAINHA
                link_imagem = "img/if_" + color + "_queen.png";
                piece_type = "rainha";
            }else if(i==4){ //REI
                link_imagem = "img/if_" + color + "_king.png";
                piece_type = "rei";
            }else if(i>7 && i<16){ //PEÃO
                link_imagem = "img/if_" + color + "_pawn.png";
                piece_type = "peao";
                line = 'l2';
            }

            //CRIANDO ELEMENTO IMG
            var img = document.createElement("img");
            //CRIANDO ATRIBUTO SRC PARA IMG
            var src = document.createAttribute("src");
            //SETANDO SRC COM LINK DA IMAGEM
            src.value = link_imagem;
            //CRIANDO ATRIBUTO PEÇA PARA IMG
            var piece = document.createAttribute("data-piece");
            //SETANDO ATRIBUTO PEÇA COM O TIPO DE PEÇA REPRESENTADO PELA IMAGEM
            piece.value = piece_type;
            //CRIANDO ATRIBUTO TIME PARA IMG
            var time_peca = document.createAttribute("data-time");
            //SETANDO TIME COM A COR DO TIME
            time_peca.value = time_color;
            //ADICIONANDO ATRIBUTOS À IMG
            img.setAttributeNode(src);
            img.setAttributeNode(piece);
            img.setAttributeNode(time_peca);

            //ADICIONANDO IMG À CÉLULA
            if(line == "l1"){
                line_1.children[i].appendChild(img); 
                
            }else if(line == "l2"){
                //O - 8 É PARA COMPENSAR O i, POIS FOR RODARÁ O DOBRO DE VEZES DO NUMERO DE CASAS DE UMA LINHA
                //ASSIM O ÍNDICE DA CASA FICARÁ CORRETO
                line_2.children[i - 8].appendChild(img);     
            }
        }
    }
}

/**
 * Seleciona casa, marca possibilidades de jogada e realiza a jogada
 * 
 * @return {void}
 */
function choosePiece(){
    //VARIÁVEL QUE RECEBERÁ IMG DA PEÇA, CASO HOUVER
    var img_piece = this.children[0];

    //SE UMA JOGADA NÃO ESTIVER SENDO FEITA, PEÇA SERÁ SELECIONADA PARA JOGADA
    if(document.getElementById("jogada").value == "0"){

        //VÊ SE img_piece ESTÁ COM undefined.(SE ESTIVER, SIGNIFICA QUE CASA CLICADA NÃO TEM PEÇA)
        if( !(img_piece == undefined) ){

            //IF QUE VÊ SE A VEZ BATE COM A PEÇA ESCOLHIDA
            if(img_piece.dataset.time == document.getElementById("vez").value){

                document.getElementById("jogada").value = "1"; //ATRIBUI CAMPO DE CONTROLE DE JOGADA PARA 1

                //MARCA PEÇA COM CSS PARA MOSTRAR QUE ELA FOI SELECIONADA PELO JOGADOR
                var attr_style = document.createAttribute("style");
                attr_style.value = "background-color: rgba(0,255,0, 0.9); border: 2px double yellow";
                img_piece.setAttributeNode(attr_style);

                //CRIANDO ATRIBUTO PARA MARCAR PEÇA COMO SELECIONADA
                var attr = document.createAttribute("data-select");
                attr.value = "1";
                img_piece.setAttributeNode(attr);

                var piece = img_piece.dataset.piece; //NOME DA PEÇA

                //MARCA CAMPOS QUE A PEÇA PODE IR
                showAvailablePlays(img_piece, piece);
            }else{
                alert("Escolha uma peça do seu time!");
            }
        }
    }else{
        if( !(img_piece == undefined) && img_piece.dataset.time == document.getElementById("vez").value){
            alert("JOGADA EM ANDAMENTO");
        }else{
            makeMove(this);
        }
    }
}

/**
 * Analisa as possibilidades de jogada da peça escolhida
 * 
 * @param {HTMLImageElement} instance_piece
 * @param {String} piece Nome da peça
 * 
 * @return {void}
 */
function showAvailablePlays(instance_piece, piece){
    //SWITCH RESPONSÁVEL POR VERIFICAR O TIPO DE PEÇA ESCOLHIDA E QUAIS SÃO OS MOVIMENTOS POSSÍVEIS PARA ELA
    //IRÁ MARCAR AS CASAS CUJA PEÇA PODE IR
    switch(piece){
        case "peao":
            possiblePlaysPawn.call(this, instance_piece);
        break;
        case "torre":
            possiblePlaysTower.call(this, instance_piece);
        break;
        case "cavalo":
            possiblePlaysHorse.call(this, instance_piece);
        break;
        case "bispo":
            possiblePlaysBishop.call(this, instance_piece);
        break;  
        case "rainha":
            possiblePlaysQueen.call(this, instance_piece);
        break;
        case "rei":
            possiblePlaysKing.call(this, instance_piece);       
    }

    if( numberPossibilities() == 0 ){
        closePlay(instance_piece);
        alert("A peça escolhida não pode ser movida! Escolha outra peça!");
    }
}

/**
 * Função que realiza a jogada. 
 * É chamada pelo choosePieace quando o jogador clica em uma casa com possibilidade de jogada
 * 
 * @param {HTMLTableDataCellElement} casa_escolhida Célula onde a peça está
 * 
 * @return {void}
 */
function makeMove(casa_escolhida){
    if(!casa_escolhida.dataset.possibility == "1"){
        alert("Jogada inválida! Escolha outra casa!");
    }else{
        //SELECIONANDO PEÇA ESCOLHIDA PARA JOGADA
        var selected_piece = document.querySelector("img[data-select='1']");
        
        //VERIFICA SE A CASA ESCOLHIDA PARA A JOGADA JÁ POSSUI UMA PEÇA
        if(casa_escolhida.children[0] != undefined){
           //SE SIM, A PEÇA É REMOVIDA
           alert("comeu uma peça");
           casa_escolhida.removeChild(casa_escolhida.children[0]);
            
           //MOVENDO PEÇA PARA CASA ESCOLHIDA
           casa_escolhida.appendChild(selected_piece);
        }else{
           //MOVENDO PEÇA PARA CASA ESCOLHIDA
           casa_escolhida.appendChild(selected_piece);
        }
        closePlay(selected_piece, true);
    }
}

/**
 * Coloca a função choosePiece no onclick de todas as casas do tabuleiro
 * 
 * @return {void}
 */
function putMethodChoosePiece(){
    for(i=1;i<9;i++){
        var line = document.getElementById('row_'+i);
        for(j=0;j<line.children.length;j++){
            line.children[j].addEventListener("click", function(){
                choosePiece.call(this);
            });
        }
    }
}

/**
 * Função que marca uma casa como uma possível jogada 
 * 
 * @param {HTMLTableDataCellElement} possibility Célula cuja jogada é possível
 * 
 * @return {void}
 */
function markPossibilityPlay(possibility){
    var attr = document.createAttribute("data-possibility");
    attr.value = "1";
    possibility.setAttributeNode(attr);
}

/**
 * Retorna o número de possibilidades maracadas para a jogada
 * 
 * @return {Integer}
 */
function numberPossibilities(){
    var possibilities = document.querySelectorAll("td[data-possibility='1']");
    return possibilities.length;
}

/**
 * Encerra a jogada, podendo ou não passar a vez para o outro time
 * 
 * @param {HTMLImageElement} selected_piece
 * @param {Boolean} playedTaken Se verdadeiro, passa a vez para o time adversário
 * 
 * @return {void}
 */
function closePlay(selected_piece, playedTaken = false){
    
    //REMOVE CSS INLINE DA PEÇA.(ESSE CSS MOSTRAVA QUE A PEÇA FOI SELECIONADA)
    selected_piece.removeAttribute("style");
    //LIMPA POSIBILIDADES DE JOGADA
    var possibilities = document.querySelectorAll("td[data-possibility='1']");
    possibilities.forEach(function(possibility){
        possibility.removeAttribute("data-possibility");
    });
    //DESSELECIONA PEÇA SELECIONADA ANTERIORMENTE
    selected_piece.removeAttribute("data-select");
    //TERMINA A JOGADA
    document.getElementById("jogada").value = "0";
    
    //SE A JOGADA FOI CONCLUÍDA, A VEZ É PASSADA. SENÃO, APENAS A PEÇA DEIXA DE SER MARCADA E AS POSSIBILIDADES LIMPAS, PARA QUE O JOGADOR POSSA ESCOLHER UMA OUTRA PEÇA PARA REALIZAR SUA JOGADA
    if(playedTaken){
        //VEZ DO OUTRO TIME
        var time_vez;
        if(document.getElementById("vez").value == "white"){
            time_vez = "black";
            document.getElementById("img_vez").src = "img/if_black_king.png";
        }else{
            time_vez = "white";
            document.getElementById("img_vez").src = "img/if_white_king.png";
        }
        document.getElementById("vez").value = time_vez;
    }
}

//====================================
//===========REGRAS DO JOGO===========
//====================================

/**
 * Calcula as possibilidades de jogada de um peão e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTMLImageElement} instance_piece
 * @param {Boolean} moveTwo Se verdadeiro, peão poderá andar duas casas para frente
 * 
 * @return {void}
 */
function possiblePlaysPawn(instance_piece, moveTwo = true){
    //CORDENADAS DAS PEÇAS NO TABUIRO
    var numLine = numLinePiece(instance_piece);
    var numCel = numCelPiece(instance_piece);
    
    for(i=(numCel-1);i<(numCel-1)+3;i++){
        //POSSIBILITY RECEBERÁ INSTÂNCIA DAS CÉLULAS CUJO MOVIMENTO DA PEÇA SELECIONADA É POSSÍVEL
        //DIMINUI NUM_LINE NO TIME BLACK, POIS OS PEÕES DESSE TIME ANDARÃO NO SENTIDO INVERSO DOS PEÕES DO TIME WHITE
        if(document.getElementById('vez').value == 'white'){
            var possibility = document.getElementById("row_"+ (+numLine+1) + "-cel_"+i);
        }else if(document.getElementById('vez').value == 'black'){
            var possibility = document.getElementById("row_"+ (+numLine-1) + "-cel_"+i);
        }

        if(possibility == null){
            continue;
        }

        //TESTA SE 1 E 3 CASAS COM POSIBILIDADES DE JOGADA POSSUEM PEÇAS DO TIME ADVERSÁRIO, POIS PEÃO SÓ PODE IR NA DIAGONAL SE FOR COMER PEÇAS DO ADVERSÁRIO
        if(i == (numCel-1) || i == (numCel-1)+2 ){
            if( (possibility.children[0] == undefined) || possibility.children[0].dataset.time == document.getElementById("vez").value ){
                continue;
            }  
        }

        //SERVIRÁ PARA VERIFICAR SE PEÇA ADVERSÁRIA OBSTRUI CAMPO À FRENTE DO PEÃO
        var obstructionTheFront = (possibility.children[0] != undefined);

        if( !(i == numCel && obstructionTheFront) ){
            //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
            markPossibilityPlay(possibility);
        }

        //TESTA PARA SABER SE CÉLULA ANALISADA É A CÉLULA QUE ESTÁ À FRENTE DA PEÇA SELECIONADA
        if(i == numCel){
            if(moveTwo){
                //PEGA O NÚMERO DA LINHA ONDE A PEÇA SELECIONADA SE ENCONTRA
                //O PRIMEIRO PARENT É PARA SELECIONAR A CÉLULA. O SEGUNDO PARA SELECIONAR A LINHA

                //CONDIÇÕES QUE VERIFICAM SE PEÇA PRETA ESTÁ NA LINHA 7 E SE PEÇA BRANCA ESTÁ NA LINHA 2
                //DESSA FORMA, É POSSÍVEL SABER SE É PERMITIDO QUE O PEÃO ANDE DUAS CASAS PARA FRENTE
                var condicao_black = document.getElementById("vez").value == "black" && numLine == "7";
                var condicao_white = document.getElementById("vez").value == "white" && numLine == "2";

                if(condicao_white || condicao_black){
                    if(document.getElementById("vez").value == "white"){
                        //SE A CASA À FRENTE ESTIVER OCUPADA, NÃO SERÁ POSSÍVEL ANDAR DUAS CASAS, VISTO QUE A PASSAGEM ESTARÁ OBSTRUÍDA
                        if(  document.getElementById("row_"+ (+numLine+1) + "-cel_"+i).children[0] == undefined  ){
                            possibility = document.getElementById("row_"+ (+numLine+2) + "-cel_"+i);    
                        }else{
                            possibility = null;
                        }
                    }else if(document.getElementById("vez").value == "black"){
                        //SE A CASA À FRENTE ESTIVER OCUPADA, NÃO SERÁ POSSÍVEL ANDAR DUAS CASAS, VISTO QUE A PASSAGEM ESTARÁ OBSTRUÍDA
                        if(  document.getElementById("row_"+ (+numLine-1) + "-cel_"+i).children[0] == undefined  ){
                            possibility = document.getElementById("row_"+ (+numLine-2) + "-cel_"+i);            
                        }else{
                            possibility = null;
                        }
                    }

                    //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                    if(possibility != null){
                        markPossibilityPlay(possibility);    
                    }
                }    
            }  
        }
    }
}

/**
 * Calcula as possibilidades de jogada de um cavalo e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTMLImageElement} instance_piece
 * 
 * @return {void}
 */
function possiblePlaysHorse(instance_piece){
    //PEGANDO AS COORDENADAS DA PEÇA ESCOLHIDA
    var numLine = numLinePiece(instance_piece);
    var numCel = numCelPiece(instance_piece);
    
    for(i=1; i<=4;i++){ //FOR RESPONSÁVEL POR PERCORRER AS DUAS LINHAS ACIMA E ABAIXO DA PEÇA ESCOLHIDA
        
        if(i == 1 || i == 2){
           var line = numLine - i; //LINHA ACIMA DA PEÇA
           //PEGA AS DUAS POSSIBILIDADES DA LINHA
            
            if(i==1){
                var possibilities = [];
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel-2))); 
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel+2)));    
            }else if(i==2){
                var possibilities = [];
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel-1))); 
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel+1)));    
            }  
            
           //VERIFICA SE EXISTE UMA PEÇA NA CASA ONDE TEORICAMENTE A PEÇA PODERIA SE MOVER
            for(k=0; k<possibilities.length;k++){
                
                if(possibilities[k] != null){
                    if(possibilities[k].children[0] == undefined || possibilities[k].children[0].dataset.time != document.getElementById("vez").value){
                        //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                        markPossibilityPlay(possibilities[k]);
                    }  
                }
            }
            
        }else if(i == 3 || i == 4){
            var line = numLine+(i-2); //LINHA ABAIXO DA PEÇA
           //PEGA AS DUAS POSSIBILIDADES DA LINHA
           if(i==3){
                var possibilities = [];
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel-2))); 
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel+2)));    
            }else if(i==4){
                var possibilities = [];
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel-1))); 
                possibilities.push(document.getElementById("row_"+ (line) + "-cel_"+ (numCel+1)));    
            }
        
           //VERIFICA SE EXISTE UMA PEÇA NA CASA ONDE TEORICAMENTE A PEÇA PODERIA SE MOVER
            for(k=0;k<possibilities.length;k++){
                
                if(possibilities[k] != null){
                    if(possibilities[k].children[0] == undefined || possibilities[k].children[0].dataset.time != document.getElementById("vez").value){
                        markPossibilityPlay(possibilities[k]);
                    }            
                }
            }
        }
    }
}

/**
 * Calcula as possibilidades de jogada de uma torre e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTMLImageElement} instance_piece
 * 
 * @return {void}
 */
function possiblePlaysTower(instance_piece){
    //----------------------------------//
    //------REFATORAÇÃO BEM VINDA :)----//
    //----------------------------------//
    
    //CORDENADAS DAS PEÇAS NO TABUIRO
    var numLine = numLinePiece(instance_piece);
    var numCel = numCelPiece(instance_piece);
    
    //EXISTEM 4 FILEIRAS: AS QUE FICAM DO LADO DA PEÇA ESCOLHIDA E AS QUE FICAM À FRENTE E ATRÁS DA PEÇA ESCOLHIDA
    //NA REPRESENTAÇÃO ABAIXO, X É A PEÇA E AS FILEIRAS SÃO OS F's. PENSE NA FILEIRA À ESQUERDA DA PEÇA: CHAMAREMOS A FILEIRA DIREITA DE CONTRAFILEIRA. O MESMO CONCEITO VALERÁ PARA AS FILEIRAS ACIMA E ABAIXO DA PEÇA. GUARDE ESSES CONCEITOS PARA ENTENDER OS COMENTÁRIOS ABAIXO :)
    
    // Q Q Q Q F Q Q Q Q
    // Q Q Q Q F Q Q Q Q
    // Q Q Q Q F Q Q Q Q
    // Q Q Q Q F Q Q Q Q
    // F F F F X F F F F 
    // Q Q Q Q F Q Q Q Q
    // Q Q Q Q F Q Q Q Q
    // Q Q Q Q F Q Q Q Q 
    
    //FOR QUE FARÁ COM QUE ESTRUTURA ABAIXO PERCORRA QUATRO FILEIRAS
    for(var k=0;k<2;k++){
        //FOR RESPONSÁVEL POR FAZER COM QUE FOR ABAIXO PERCORRA DUAS FILEIRAS
        for(var j=0;j<2;j++){
            var i = 0;
            //INCREDECRE TROCARÁ INCREMENTO POR DECREMENTO QUANDO J=1. DESSA FORMA SERÁ POSSÍVEL FAZER A ÁNALISE DAS POSSIBILIDADES TANTO EM UMA FILEIRA COMO NA "CONTRAFILEIRA"
            var increDecre = () => { (j==0? i++ : i--) };

            //IF RESPONSÁVEL POR TROCAR numCel POR numLine, NO SEGUNDO LOOP DO PRIMEIRO FOR, PARA QUE ESTRUTURA PERCORRA COM BASE NAS LINHAS, E NÃO MAIS COM BASE NAS COLUNAS.
            if(k==1){
                if(j == 0){
                    i = numLine+1;
                }else{
                    i = numLine-1;
                }
            }else{
                if(j == 0){
                    i = numCel+1;
                    
                }else{
                    i = numCel-1;
                }
            }

            //RETORNA CONDIÇÃO PARA QUE FOR CONTINUE RODANDO. SE CHAMA FINAL POIS CONTROLA O NÚMERO FINAL QUE O FOR PODERÁ EXECUTAR!
            //ALÉM DE TROCAR VALOR FINAL DO FOR, ELE MUDA A CONDIÇÃO DE <= PARA >=. JUNTAMENTE COM INCREDECRE, PERMITIRÁ QUE O FOR SEJA INVERTIDO E PERCORRA A "CONTRAFILEIRA" NO SEGUNDO LOOP DO FOR ACIMA
            var final = (incre) => {return (j==0)? incre<=8 : incre>=1};

            //FOR QUE PERCORRERÁ UMA FILEIRA
            for(i; final(i); increDecre()){
                //TRATA CASO i SEJA IGUAL A ZERO(i==0 SIGNIFICA QUE PEÇA ESTÁ NO CANTO DO TABULEIRO E NÃO HÁ COMO ANDAR PARA TRÁS)
                if(i==0){
                   break;
                }
                
                //SE K == 1, NÚMERO DA CÉLULA SERÁ A MESMA E NÚMERO DE LINHA MUDARÁ(FOR PERCORRERÁ AS LINHAS À PROCURA DE POSSIBILIDADES DE JOGADA)
                if(k==1){
                    var id = "row_"+ i + "-cel_"+numCel;
                    //SE K != 1, NÚMERO DA LINHA SERÁ A MESMA E NÚMERO DA CÉLULA MUDARÁ(FOR PERCORRERÁ AS CÉLULAS AO LADO DA PEÇA A PROCURA DE POSSIBILIDADES DE JOGADA)
                }else{ 
                    var id = "row_"+ numLine + "-cel_"+i;
                }
                   
                //POSSIBILITY RECEBERÁ INSTÂNCIA DAS CÉLULAS À FRENTE DA PEÇA ONDE MOVIMENTO DA PEÇA SELECIONADA É POSSÍVEL
                var possibility = document.getElementById(id);

                //VERIFICA SE EXISTE UMA PEÇA NA CASA ONDE TEORICAMENTE A PEÇA PODERIA SE MOVER
                if(possibility.children[0] == undefined || possibility.children[0].dataset.time != document.getElementById("vez").value){
                    //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                    markPossibilityPlay(possibility);
                }else{
                    break;
                }
            }    
        }
    }   
}

/**
 * Calcula as possibilidades de jogada de um bispo e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTMLImageElement} instance_piece
 * 
 * @return {void}
 */
function possiblePlaysBishop(instance_piece){
    //CORDENADAS DAS PEÇAS NO TABUIRO.
    var numLine = numLinePiece(instance_piece);
    var numCel = numCelPiece(instance_piece);
    
    //VARIÁVEIS QUE SERÃO USADAS PARA CONTROLE DAS COORDENADAS DAS CÉLULAS QUE SERÃO MARCADAS NA PARTE DIREITA E ESQUERDA DA PEÇA.
    var celEsq = numCel;
    var celDir = numCel;
    
    //VARIÁVEIS QUE SERÃO USADAS PARA O CONTROLE DAS COORDENADAS DAS LINHAS QUE SERÃO ANALIZADAS AO NORTE E AO SUL DA PEÇA.
    var lineNorth = numLine;
    var lineSouth = numLine;
    
    //VARIÁVEL QUE INFORMA SE EXISTEM POSSIBILIDADES.
    var therePossibilities = true;
    //VARIÁVEL QUE INFORMARÁ QUANTAS CASAS SEGUINDAS FORAM DADAS COMO INEXISTENTES.
    var erro = 0;
    //RECEBE A DIAGONAL OBSTRUÍDA
    var diagObst = [0,0,0,0];
    
    //DO...WHILE PERCORRERÁ DIAGONAIS À PROCURA DE POSSIBILIDADES DE JOGADA.
    do{
        //FOR QUE PERCORRE DUAS VEZES PARA QUE DUAS LINHAS SEJAM ANALISADAS. UMA LINHA AO NORTE DA PEÇA, E A OUTRA A LINHA ESPELHADA, AO SUL.
        for(j=0;j<2;j++){
            //CONTROLA SE A LINHA ANALISADA SERÁ A QUE SE ENCONTRA AO NORTE OU A SUA LINHA ESPELHO, AO SUL DA PEÇA.
            if(j==0){
                var line = --lineNorth;
            }else if(j==1){
                var line = ++lineSouth;
            }

            //FOR QUE PERCORRE DUAS VEZES PARA QUE DUAS CÉLULAS DE UMA LINHA SEJAM MARCADAS. UMA CÉLULA À ESQUERDA DA PEÇA, E A CÉLULA ESPELO À DIREITA DA PEÇA.
            for(i=0;i<2;i++){
                //CONTROLA SE A CÉLULA ANALISADA NA LINHA SERÁ A QUE SE ENCONTRA À ESQUERDA OU À DIREITA DA PEÇA.
                //TERNÁRIO QUE IMPEDE PRÉ-DECREMENTO OU PRÉ-INCREMENTO DAS CÉLULAS, VISTO QUE AS COORDENADAS DAS CÉLULAS QUE SERÃO MARCADAS SÃO AS MESMAS TANTO PARA A LINHA NORTE, QUANDO PARA A LINHA ESPELHO NO SUL.
                if(i==0){
                    var cel = (j==0) ? --celEsq : celEsq;
                }else if(i==1){
                    var cel = (j==0) ? ++celDir : celDir;
                }    
                
                //ESTRUTURA RESPONSÁVEL POR BLOQUEAR ANÁLISE DAS DIAGONAIS, QUANDO ENCONTRA OBSTRUÇÃO
                if(j==0){
                    if(diagObst[i] == 1){
                        continue;
                    }
                }else if(j==1){
                    if(diagObst[i+2] == 1){
                        continue;
                    }
                }

                //DEFINE O ID DO CAMPO ONDE A JOGADA É TEORICAMENTE POSSÍVEL, RESGATA A CASA E JOGA NA VARIÁVEL POSSIBILITY.
                var id = "row_"+ line + "-cel_"+ cel;
                var possibility = document.getElementById(id);   

                //SÓ FAZ A CHECAGEM DE PEÇA SE A POSIÇÃO EXISTIR. SE NÃO EXISTIR, VARIÁVEL ERRO É PRÉ-INCREMENTADA.
                if(possibility != undefined){
                    //VERIFICA SE EXISTE UMA PEÇA NA CASA ONDE TEORICAMENTE A PEÇA PODERIA SE MOVER. CASO EXISTA, VARIÁVEL ERRO É INCREMENTADA E CASA NÃO É MARCADA COMO POSSIBILIDADE DE JOGADA, VISTO QUE OUTRA PEÇA JÁ SE ENCONTRA LÁ.
                    if(possibility.children[0] != undefined && possibility.children[0].dataset.time == document.getElementById("vez").value){
                        //TERNÁRIO
                        (j==0) ? (diagObst[i] = 1) : (diagObst[i+2] = 1);
                    }else{
                        //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                        markPossibilityPlay(possibility);
                        //CASO A CASA POSSUA UMA PEÇA DO OUTRO TIME, A MESMA DEVE SER MARCADA COMO UMA POSSIBILIDADE, MAS DEPOIS DESTA CASA, NÃO HAVERÁ MAIS POSSIBILIDADES, POIS O BISPO NÃO PODE SALTAR SOBRE UMA PEÇA ADVERSÁRIA. A DIAGONAL É TRANCADA.
                        if(possibility.children[0] != undefined && possibility.children[0].dataset.time != document.getElementById("vez").value){
                            (j==0) ? (diagObst[i] = 1) : (diagObst[i+2] = 1);
                        }
                    }    
                }else{
                    ++erro;
                    (j==0) ? (diagObst[i] = 1) : (diagObst[i+2] = 1);
                }
            }    
        }
        
        //SE AS 4 CASAS ANALISADAS PELA ESTRUTURA DEREM ERRO, SIGNIFICA QUE NÃO HÁ MAIS POSSIBILIDADES DE JOGADA, POIS AS 4 DIAGONAIS ESTÃO OBSTRUÍDAS. CASO CONTRÁRIO, ERRO RECEBE 0, E A ESTRUTURA É EXECUTADA NOVAMENTE ATÉ ERRO SER IGUAL A 4.
        diagObst.every
        if(diagObst.every(diag => diag == 1)){
            therePossibilities = false;
        }    
    }while(therePossibilities);
}

/**
 * Calcula as possibilidades de jogada de uma rainha e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTTMLImageElement} instance_piece
 * 
 * @return {void}
 */
function possiblePlaysQueen(instance_piece){
    possiblePlaysBishop(instance_piece);
    possiblePlaysTower(instance_piece);
}

/**
 * Calcula as possibilidades de jogada de um rei e marca as casas usando o markPossibilityPlay.
 * É usado pelo showAvailablePlays
 * 
 * @param {HTMLImageElement} instance_piece
 * 
 * @return {void}
 */
function possiblePlaysKing(instance_piece){
    //CORDENADAS DAS PEÇAS NO TABUIRO
    var numLine = numLinePiece(instance_piece);
    var numCel = numCelPiece(instance_piece);
    
    for(i=(numCel-1);i<(numCel-1)+3;i++){
        var possibilitiesLines = new Array();
        possibilitiesLines.push(document.getElementById("row_"+ (+numLine-1) + "-cel_"+i));
        possibilitiesLines.push(document.getElementById("row_"+ (+numLine) + "-cel_"+i));
        possibilitiesLines.push(document.getElementById("row_"+ (+numLine+1) + "-cel_"+i));
        
        for(index in possibilitiesLines){
            if(possibilitiesLines[index] == null){
                continue;
            }
            if(possibilitiesLines[index].children[0] === undefined){
                markPossibilityPlay(possibilitiesLines[index]);
            }
        }
    }
}

//====================================
//=========FIM REGRAS DO JOGO=========
//====================================

/**
 * Retorna o número da linha onde a peça se encontra
 * 
 * @param {HTMLImageElement} instance_piece
 * @return {Integer} 
 */
function numLinePiece(instance_piece){
    return +(instance_piece.parentElement.id).split("-")[0].split("_")[1]; 
}

/**
 * Retorna o número da célula onde a peça se encontra 
 * @param {HTMLImageElement} instance_piece
 * @return {Integer}
 */
function numCelPiece(instance_piece){
    return +(instance_piece.parentElement.id).split("-")[1].split("_")[1];
}