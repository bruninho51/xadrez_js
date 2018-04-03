function iniciarJogo(){
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
            img.addEventListener("click", function(){
                choosePiece.call(this);
            });

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
    this.style.backgroundColor = "rgb(0,100,0)";
}