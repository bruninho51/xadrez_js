//INICIA O JOGO
function gameStart(){
    //LINHAS DO TIME NO TABULEIRO
    var line_1, line_2;
    
    //RECEBERÁ QUAL TIME A PEÇA FAZ PARTE
    var time_color;
    
    //TIPO DE PEÇA
    var piece_type;

    //COLOCARÁ MÉTODO choosePiece EM TODAS AS CASAS DO TABULEIRO
    putMethodChoosePiece();
    
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
            switch(true){
                //TORRES
                case (i==0 || i==7):
                    link_imagem = "img/if_" + color + "_rook.png";
                    piece_type = "torre";
                break;

                //CAVALOS
                case (i==1 || i==6):
                    link_imagem = "img/if_" + color + "_knight.png";
                    piece_type = "cavalo";
                break;

                //BISPOS
                case (i==2 || i==5):
                    link_imagem = "img/if_" + color + "_bishop.png";
                    piece_type = "bispo";
                break;

                //RAINHA    
                case (i==3):
                    link_imagem = "img/if_" + color + "_queen.png";
                    piece_type = "rainha";
                break;

                //REI
                case (i==4):
                    link_imagem = "img/if_" + color + "_king.png";
                    piece_type = "rei";
                break;

                //PEÕES
                case (i>7 && i<16):
                    link_imagem = "img/if_" + color + "_pawn.png";
                    piece_type = "peao";
                    line = 'l2';
                break;

            }
            //CRIANDO ELEMENTO IMG
            var img = document.createElement("img");
            //CRIANDO ATRIBUTO SRC PARA IMG
            var src = document.createAttribute("src");
            //SETANDO SRC COM LINK DA IMAGEM
            src.value = link_imagem;
            //CRIANDO ATRIBUTO PEÇA PARA IMG
            var piece = document.createAttribute("data-piece");
            //SETANDO SRC COM O TIPO DE PEÇA REPRESENTADO PELA IMAGEM
            piece.value = piece_type;
            //CRIANDO ATRIBUTO TIME PARA IMG
            var time_peca = document.createAttribute("data-time");
            //SETANDO TIME COM A COR DO TIME
            time_peca.value = time_color;
            //ADICIONANDO ATRIBUTOS À IMG
            img.setAttributeNode(src);
            img.setAttributeNode(piece);
            img.setAttributeNode(time_peca);
            
            //EVENTO CLICK IMG
            //img.addEventListener("click", function(){
            //    choosePiece.call(this);
            //});

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

//SELECIONA PEÇA CLICADA
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
                //img_piece.parentElement.style.backgroundColor = "rgba(0,255,0, 0.9)";
                //img_piece.parentElement.style.border = "2px double yellow";

                //CRIANDO ATRIBUTO PARA MARCAR PEÇA COMO SELECIONADA
                var attr = document.createAttribute("data-select");
                attr.value = "1";
                img_piece.setAttributeNode(attr);

                var piece = img_piece.dataset.piece; //NOME DA PEÇA
                //MOSTRA CAMPOS QUE A PEÇA PODE IR
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

//RESPONSÁVEL POR ANÁLISAR JOGADAS DISPONÍVEIS
function showAvailablePlays(instance_piece, piece){
    //var id_piece, id_row, id_cel;
    var num_line, num_cel;
    //PEGANDO ID DA CASA ONDE ESTÁ A PEÇA
    //id_piece = instance_piece.parentElement.id;
    //USANDO ID PARA PEGAR COORDENADAS DA PEÇA NO TABULEIRO
    //var arr = id_piece.split("-");
    //id_row = arr[0];
    //id_cel = arr[1];
    //PEGANDO NÚMERO DA LINHA ONDE A PEÇA ESCOLHIDA SE ENCONTRA
    //num_line = id_row.split("_")[1];
    //PEGANDO NÚMERO DA CÉLULA ONDE A PEÇA ESCOLHIDA SE ENCONTRA
    //num_cel = id_cel.split("_")[1];
    
    //SWITCH RESPONSÁVEL POR VERIFICAR O TIPO DE PEÇA ESCOLHIDA E QUAIS SÃO OS MOVIMENTOS POSSÍVEIS PARA ELA
    //IRÁ MARCAR AS CASAS CUJA PEÇA PODE IR
    switch(piece){
        case "peao":
            possiblePlaysPawn.call(this, instance_piece);
            
        break;
            
        case "torre":
            possiblePlaysTower.call(this, instance_piece);
            
        break;
    }
}

//FUNÇÃO RESPONSÁVEL POR FAZER A JOGADA
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
        
        /*
                            //----------------------------------------
                            //-----LIMPANDO E TERMINANDO A JOGADA-----
                            //----------------------------------------
        
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
        
                            //----------------------------------------
                            //----------------------------------------
        
        //VEZ DO OUTRO TIME
        var time_vez;
        if(document.getElementById("vez").value == "white"){
            time_vez = "black";
        }else{
            time_vez = "white";
        }
        document.getElementById("vez").value = time_vez;*/
        closePlay(selected_piece, true);
        
        
    }
    
}

//MÉTODO RESPONSÁVEL POR COLOCAR choosePiece MÉTODO EM TODAS AS CASAS DO TABULEIRO
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

//FUNÇÃO QUE MARCA UMA CASA DO TABULEIRO COMO POSSÍVEL JOGADA
function markPossibilityPlay(possibility){
    var attr = document.createAttribute("data-possibility");
    attr.value = "1";
    possibility.setAttributeNode(attr);
}

//RETORNA NÚMERO DE POSSIBILIDADES MARCADAS PARA A JOGADA
function numberPossibilities(){
    var possibilities = document.querySelectorAll("td[data-possibility='1']");
    //alert( possibilities.length );
    return possibilities.length;
}

//ENCERRA A JOGADA. SE O SEGUNDO PARÂMETRO FOR TRUE, A VEZ É PASSADA
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

//CALCULA POSSIBILIDADES DE JOGADA DE UM PEÃO
function possiblePlaysPawn(instance_piece){
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

        //CASAS QUE A PEÇA PODE IR SÃO MARCADAS COM AMARELO
        //possibility.style.backgroundColor = "yellow";

        //SERVIRÁ PARA VERIFICAR SE PEÇA ADVERSÁRIA OBSTRUI CAMPO À FRENTE DO PEÃO
        var obstructionTheFront = (possibility.children[0] != undefined);


        if( !(i == numCel && obstructionTheFront) ){
            //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
            markPossibilityPlay(possibility);
        }



        //TESTA PARA SABER SE CÉLULA ANALISADA É A CÉLULA QUE ESTÁ À FRENTE DA PEÇA SELECIONADA
        if(i == numCel){

            //PEGA O NÚMERO DA LINHA ONDE A PEÇA SELECIONADA SE ENCONTRA
            //O PRIMEIRO PARENT É PARA SELECIONAR A CÉLULA. O SEGUNDO PARA SELECIONAR A LINHA
            //var line_peace = ((instance_piece.parentElement).parentElement.getAttribute("id")).split("_")[1];

            //CONDIÇÕES QUE VERIFICAM SE PEÇA PRETA ESTÁ NA LINHA 7 E SE PEÇA BRANCA ESTÁ NA LINHA 2
            //DESSA FORMA, É POSSÍVEL SABER SE É PERMITIDO QUE O PEÃO ANDE DUAS CASAS PARA FRENTE
            var condicao_black = document.getElementById("vez").value == "black" && numLine == "7";
            var condicao_white = document.getElementById("vez").value == "white" && numLine == "2";

            if(condicao_white || condicao_black){
                if(document.getElementById("vez").value == "white"){
                    possibility = document.getElementById("row_"+ (+numLine+2) + "-cel_"+i);     
                }else if(document.getElementById("vez").value == "black"){
                    possibility = document.getElementById("row_"+ (+numLine-2) + "-cel_"+i);        
                }

                //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                markPossibilityPlay(possibility);
            }

        }

    }

    if( numberPossibilities() == 0 ){
        closePlay(instance_piece);
        alert("A peça escolhida não pode ser movida! Escolha outra peça!");
    }
}

//CALCULA POSSIBILIDADES DE JOGADA DE UM CAVALO
function possiblePlaysHorse(){}

//CALCULA POSSIBILIDADES DE JOGADA DE UMA TORRE
function possiblePlaysTower(instance_piece){
    alert("entrando no metodo");
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
    //for(var k=0;k<2;k++){
        //FOR RESPONSÁVEL POR FAZER COM QUE FOR ABAIXO PERCORRA DUAS FILEIRAS
        for(var j=0;j<2;j++){
            var i = 0;
            //INCREDECRE TROCARÁ INCREMENTO POR DECREMENTO QUANDO J=1. DESSA FORMA SERÁ POSSÍVEL FAZER A ÁNALISE DAS POSSIBILIDADES TANTO EM UMA FILEIRA COMO NA "CONTRAFILEIRA"
            var increDecre = () => { (j==0? i++ : i--) };

            if(j == 0){
                i = numLine+1;
                alert("No if os valores de i e j são, respectivamente: " + i + ", " + j);
            }else{
                i = numLine-1;
                alert("No if os valores de i e j são, respectivamente: " + i + ", " + j);
            }
            alert("Antes do for, j vale " + j);

            //RETORNA CONDIÇÃO PARA QUE FOR CONTINUE RODANDO. SE CHAMA FINAL POIS CONTROLA O NÚMERO FINAL QUE O FOR PODERÁ EXECUTAR!
            //ALÉM DE TROCAR VALOR FINAL DO FOR, ELE MUDA A CONDIÇÃO DE <= PARA >=. JUNTAMENTE COM INCREDECRE, PERMITIRÁ QUE O FOR SEJA INVERTIDO E PERCORRA A "CONTRAFILEIRA" NO SEGUNDO LOOP DO FOR ACIMA
            var final = (incre) => {return (j==0)? incre<=8 : incre>=1};

            //FOR QUE PERCORRERÁ UMA FILEIRA
            for(i; final(i); increDecre()){

                //TRATA CASO i SEJA IGUAL A ZERO(i==0 SIGNIFICA QUE PEÇA ESTÁ NO CANTO DO TABULEIRO E NÃO HÁ COMO ANDAR PARA TRÁS)
                if(i==0){
                   break;
                }

                alert("Esse é o j: " + j + ".Estamos no for :)");
                //POSSIBILITY RECEBERÁ INSTÂNCIA DAS CÉLULAS À FRENTE DA PEÇA ONDE MOVIMENTO DA PEÇA SELECIONADA É POSSÍVEL
                var id = "row_"+ i + "-cel_"+numCel;
                alert(id);
                var possibility = document.getElementById(id);

                //VERIFICA SE EXISTE UMA PEÇA NA CASA ONDE TEORICAMENTE A PEÇA PODERIA SE MOVER
                if(possibility.children[0] != undefined){
                    break;

                }else{
                    possibility.style.backgroundColor = "aqua";

                }

            }    
        }
    //}
    
        
}

//CALCULA POSSIBILIDADES DE JOGADA DE UM BISPO
function possiblePlaysBishop(){}

//CALCULA POSSIBILIDADES DE JOGADA DE UMA RAINHA
function possiblePlaysQueen(){}

//CALCULA POSSIBILIDADES DE JOGADA DE UM REI
function possiblePlaysKing(){}

//====================================
//=========FIM REGRAS DO JOGO=========
//====================================

//RETORNA NÚMERO DA LINHA ONDE A PEÇA SE ENCONTRA
function numLinePiece(instance_piece){
    return +(instance_piece.parentElement.id).split("-")[0].split("_")[1]; 
}

//RETORNA NÚMERO DA CÉLULA ONDE A PEÇA SE ENCONTRA
function numCelPiece(instance_piece){
    return +(instance_piece.parentElement.id).split("-")[1].split("_")[1];
}