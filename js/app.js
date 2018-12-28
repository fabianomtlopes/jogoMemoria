/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

$(function(){
	
	let movesCount=0, movimento;
	const openCard=[];
	const matchCard = [];
	let timerClock;
	let segundos = 0, minutos = 0 , horas = 0;
	let secs = $('.seg'); 
	let mins = $('.min');

	const deckCartas = $('.deck');
	//armazendando todas as cartas em um array
  	const cards = ['fa fa-paper-plane-o','fa fa-anchor','fa fa-diamond','fa fa-bolt','fa fa-cube', 'fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o','fa fa-cube'];
      
    startGame();

  	//comecar o jogo assim que carregar a pagina
  	function startGame(){
  		//chama a funcao para gerar o grid de cartas
		gridCartas();

  		let card = $('.card');
  		//Zerar os movimentos
		movimento = 0;
		$('.moves').html(movimento);
		
  		//Chamada para iniciar o tempo de jogo
  		startTimer();
  		//Funcao para abrir as cartas
  		abrirCartas(card);
  	};



	 //Comeca a rodar o tempo
	function startTimer(){
		timerClock = setInterval(function(){
	        segundos++;
	        $('#seg').html(segundos);
	        if(segundos<=9){
	           $('#seg').html("0"+segundos); 
	        }
	        if(segundos>=60){
		    segundos = 0;
		     minutos++;
		    $('#min').html("0"+minutos);
		    }
		    if(minutos>=60){
		        minutos=0;
		        horas++;
		    }
	     }, 1000);
	};


	//Abrir as cartas para verificacao e envia para a soma dos movimentos
	function abrirCartas(card){
		card.on('click', function(){
				if(openCard.length === 1){
					$(this).addClass('open show');
					openCard.push($(this));
					movesCounter();
					verificarCarta($(this), openCard[0]);
				}else{
					$(this).addClass('open show');   //$(this).html();
					openCard.push($(this));
				}
		});
	};
	
 		
 	//Verifica se as cartas sao iguais ou não.	
	function verificarCarta(cartaB, cartaA){  
		//alert("entrou na funcao3"+ cartaB.html()+" - "+cartaA.html());
		 if(cartaA.html() === cartaB.html()){
			cartaA.addClass('match');
			cartaB.addClass('match');
			matchCard.push(this, openCard[0]);
			openCard.length = 0;
			verificarJogo();
		 }else {
		 	setTimeout(function() {
			cartaB.removeClass('open show');
			cartaA.removeClass('open show');
			}, 1000);
			openCard.length = 0;
		 }
		
	};


	//Verifica o jogo para executar o termino do mesmo
	function verificarJogo(){
	    setTimeout(function() {
	        if(cards.length === matchCard.length){
	            clearInterval(timerClock);
	          //chama a funcao game over para o score das jogadas, incluindo tempo, movimento e avaliacao de estrelas obtidas
	            gameOver();
	        }       
	    }  , 250);
	};


	//fim de jogo, abre o modal
	function gameOver(){
		$('#score').modal('show');
		$('.modal-body').children('p').html('Você concluiu no tempo '+$('#min').html()+":"+$('#seg').html()+ '. Com '+ $('.moves').html()+' movimentos e com a avaliação de '+$('.stars').html()+' estrela(s).');
		
	};

	//contagem de movimentos após abrir um par de cartas
	function movesCounter(){
	    movesCount++;
	    movimento = movesCount;
	    // $('section').children('span').html(movimento);
	     $('.moves').html(movimento);
        //chama a funcao e passa os movimentos para ver a avaliacao de estrelas Rating System
        ratingStar(movimento);
	}; 

	//Avaliacao de quantas estrelas obtera durante o jogo
	function ratingStar(moves){
	    if( movesCount <= 12 ){
	    	 	$('section').children('ul').html('<li><i class="fa fa-star"></i></li>'+
	    	 		'<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>');    
	    }
	    else if( movesCount > 12 && movesCount <= 19 ){     
	    	 $('section').children('ul').html('<li><i class="fa fa-star"></i></li>'+
	    	 		'<li><i class="fa fa-star"></i></li>');      	        
	    }
	    else if( movesCount > 20 ){
	     $('section').children('ul').html('<li><i class="fa fa-star"></i></li>');
	    }
	};


	//Gerando o grid de cartas
	function gridCartas(){
        //Embaralhar as cartas
   		shuffle(cards);
	    for(let i = 0; i < cards.length; i++){
	        const lista = document.createElement("li");
	        const icone = document.createElement("i");
	        lista.classList.add("card");
	        icone.className = cards[i]; 
	        lista.append(icone); 
	        deckCartas.append(lista);
	    }
	};

	// shuffle(cards);
	 //    for(let i = 0; i < cards.length; i++){
	 //        const lista = $(".deck").add(document.createElement("li"));  
	 //        const icone = document.createElement("i");//$('li').add(document.createElement("i")); 
	 //        //alert(icone.html());
	 //        lista.addClass("card"); 
	 //       //problemas ao executar esta linha, onde adicionaria a classe que possue o desenho do jogo
	 //        icone.addClass(cards[i]);//className = cards[i];
	 //        lista.append(icone);   
	 //        deckCartas.append(lista); 
	 //    }

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    var currentIndex = array.length, temporaryValue, randomIndex;

	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }

	    return array;
	};

	//Botao para o reset do jogo
	$('.restart').on('click', function(){
		//Parar o tempo
		clearInterval(timerClock);
		//limpar os dados do tempo
		clearTimer();
		//zerar o grid de cartas
		deckCartas.html(" ");
		//chamada para reiniciar o jogo
		startGame();

	});

	//Acionado pelo botao do modal - Jogar Novamente
	$("#score").on('click', '.playAgain', function(){
			clearTimer();
			deckCartas.html(" ");
			startGame();
			$('#score').modal('hide');		
	});

	//Limpa os tempos
	function clearTimer(){
	    segundos = 0;
	    minutos= 0;
	    $('#seg').html("00");
	    $('#min').html("00");
	    startTimer();
	};

});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
