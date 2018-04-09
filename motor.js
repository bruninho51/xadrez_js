function iniciarJogo(){
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
function showAvailablePlays(instance, piece){
    var id_piece, id_row, id_cel;
    var num_line, num_cel;
    //PEGANDO ID DA CASA ONDE ESTÁ A PEÇA
    id_piece = instance.parentElement.id;
    //USANDO ID PARA PEGAR COORDENADAS DA PEÇA NO TABULEIRO
    var arr = id_piece.split("-");
    id_row = arr[0];
    id_cel = arr[1];
    //PEGANDO NÚMERO DA LINHA
    num_line = id_row.split("_")[1];
    //PEGANDO NÚMERO DA CÉLULA
    num_cel = id_cel.split("_")[1];
    
    //SWITCH RESPONSÁVEL POR VERIFICAR O TIPO DE PEÇA ESCOLHIDA E QUAIS SÃO OS MOVIMENTOS POSSÍVEIS PARA ELA
    //IRÁ MARCAR AS CASAS CUJA PEÇA PODE IR
    switch(piece){
        case "peao":
            for(i=(num_cel-1);i<(num_cel-1)+3;i++){
                //POSSIBILITY RECEBERÁ INSTÂNCIA DAS CÉLULAS CUJO MOVIMENTO DA PEÇA SELECIONADA É POSSÍVEL
                var possibility = document.getElementById("row_"+ (+num_line+1) + "-cel_"+i);
                
                if(possibility == null){
                    continue;
                }
                
                //CASAS QUE A PEÇA PODE IR SÃO MARCADAS COM AMARELO
                //possibility.style.backgroundColor = "yellow";
                
                //COLOCANDO ATRIBUTO QUE DIZ QUE É PERMITIDO QUE A PEÇA ANDE PARA ESTA CASA
                var attr = document.createAttribute("data-possibility");
                attr.value = "1";
                possibility.setAttributeNode(attr);
            }
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
        //MOVENDO PEÇA PARA CASA ESCOLHIDA
        casa_escolhida.appendChild(selected_piece);
        
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
        document.getElementById("vez").value = time_vez;
        
        
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