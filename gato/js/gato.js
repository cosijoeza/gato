	
	//En matriz almacenare los tiros que se vayan generando
	var matriz=[];
	tiros = 0; //global
	for(var i = 0; i < 3; i++)
	{
		matriz[i] = []; 
		for(var j = 0; j < 3; j++)
		{
			matriz[i][j] = 0;
		}
	}
	/*Tira la computadora
	444,444 para fila y columna,
	solo los ocupo para mandar algo 
	porque cuando es la computadora,
	genera numeros aleatorios*/
	tirar(1,444,444);

	function revisar(boton) 
	{
		//Obtengo el valor de la fila y la columna que marco el usuario
		var row = parseInt(boton.id / 10); //Fila
		var col = parseInt(boton.id % 10);	//Columna
		var winner;

		//Tira jugador
		var player_turn = true;
		if(matriz[row][col] == 0)
		{
			//Cambio el color del boton y cambio el icono
			boton.classList.remove("btn-outline-primary");
			boton.classList.add("btn-outline-success");
			boton.innerHTML = "<i class = 'fa fa-circle-o fa-4x' aria-hidden='true'></i>";
			//Tiro y termino el turno del jugador
			tirar(2,row,col);
			player_turn = false;
		}
		//VERIFICA SI HAY GANADOR
		winner = hasWinner();
		despliega(winner);
		if(winner!=0){ return;}
		//Tira computadora
		if(!player_turn) //Si no es turno del jugador puede tirar la compu
		{	
			tirar(1,row,col);
		}
		//VERIFICA SI HAY GANADOR
		winner = hasWinner();
		despliega(winner);
		if(tiros == 9 && winner == 0)
		{
			console.log("empate");
			var texto = document.getElementById("info");
			texto.innerHTML="¡EMPATE!";
		}
	}

	function tirar(turno,row,col)
	{	
		var sigue_tirando = true;

		//Computadora
		if(turno == 1)
		{
			do{
				//Numeros entre 0 y 2
				row = ( Math.round( Math.random() *10) ) % 3;
				col = ( Math.round( Math.random() *10) ) % 3;
				if(matriz[row][col] == 0)
				{
					matriz[row][col] = turno;
					var position = row+""+col; //Para que sea String
					var boton = document.getElementById(position);

					boton.classList.remove("btn-outline-primary");
					boton.classList.add("btn-outline-danger");
					boton.innerHTML = "<i class = 'fa fa-times fa-4x' aria-hidden='true'></i>";

					tiros++;
					sigue_tirando = false;
				}
				//console.log(boton.innerHTML);
			}while(sigue_tirando);

		}
		//Jugador
		else
		{
			matriz[row][col] = turno;
			tiros++;
		} 
	}

	//Verifica si algun jugador gano
	function hasWinner()
	{
		var winner = 0; //0 no hay ganador
		//Diagonales
		if(matriz[0][0]==matriz[1][1] && matriz[0][0]==matriz[2][2])
			return matriz[0][0];
		else if(matriz[0][2]==matriz[1][1] && matriz[0][2]==matriz[2][0])
			return matriz[0][0];
		//Filas y columnas
		else {
			//columnas
			for(var i=0; i<3; i++){
				if(matriz[0][i]==matriz[1][i] && matriz[0][i]==matriz[2][i])
					return matriz[0][i];
			}

			//filas
			for(var i=0; i<3; i++){
				if(matriz[i][0]==matriz[i][1] && matriz[i][1]==matriz[i][2])
					return matriz[i][0];
			}
		}
		return winner;
	}

	function despliega(ganador)
	{
		var texto = document.getElementById("info");
		switch(ganador)
		{	
			case 1:
				texto.innerHTML = "¡HAS PERDIDO :c!" ;
				break;
			case 2:
				texto.innerHTML = "¡FELICIDADES, GANASTE!";
				break;
		}
	}