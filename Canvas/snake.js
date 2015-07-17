	var canvas = document.getElementById("canvas-area"),
		ctx = canvas.getContext("2d"),
		result = document.getElementById("results"),
		startOver = document.getElementById("start"),
    	x = 50,
    	y = 50,
    	w = 10,
    	h = 10,
    	j = 10,
    	finalResult = 0,
    	speed = 2,
    	applesCount = false,
		directions = {
						"up": -1,
						"down": 1,
						"left": -1,
						"right": 1
					},
		curDirection,
		snakeHead = new SnakeHead(x, y, w, h),
		headX = [],
		headY = [],
		appleX = [],
		appleY = [],
		eatSelf = false;

	function play(){
		var headCenterX,
			headCenterY,
			appleCenterX,
			appleCenterY,
			distance;

		ctx.strokeStyle = "#f0f";
		ctx.fillStyle = "#a6ffa6";
		ctx.lineWidth = 2;
   		ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(snakeHead.x, snakeHead.y, w, h);
        ctx.strokeRect(snakeHead.x, snakeHead.y, w, h);
		extendSnake(j);

        if(applesCount === false){
        	appleX.pop();
        	appleY.pop();
			appleX.push((Math.random()*(canvas.width) - w/2 - 5));
			appleY.push((Math.random()*(canvas.height) - h/2 - 5));
        	drawApple(appleX[0], appleY[0], 10, 10);
        	applesCount = 1;
        }

        if (applesCount === 1) {
        	drawApple(appleX[0], appleY[0], 10, 10);
        }

        if(!curDirection){
        	curDirection = 'right';
        }

        switch(curDirection){
        	case 'left': left(); break;
        	case 'right': right(); break;
        	case 'up': up(); break;
        	case 'down': down(); break;
        }

		headCenterX = snakeHead.x + w/2;
		headCenterY = snakeHead.y + h/2;
		appleCenterX = appleX[0] + w/2;
		appleCenterY = appleY[0] + h/2;
		distance = Math.sqrt(Math.pow((headCenterX - appleCenterX), 2) + Math.pow((headCenterY - appleCenterY), 2));

        if (distance < Math.sqrt(2)*(w/2+h/2)){
        	j+=5;
        	applesCount=false;
        	finalResult+=10;
        }

        eatSelfCheck();

        // GAME OVER CONDITIONS AND ACTIONS
        if ((snakeHead.x + w) >= canvas.width || (snakeHead.x <= 0) || eatSelf || (snakeHead.y + h) >= canvas.height || (snakeHead.y <= 0)) {
			addToLocalStorage(finalResult);
            displayHighscores();
            return result.innerHTML += "<br />GAME OVER";
        }
        
        speed = Math.floor(finalResult/100) + 2;

        headX.push(snakeHead.x);
        headY.push(snakeHead.y);

        result.innerHTML = finalResult + " points";
		requestAnimationFrame(play);
	}

	play();

	startOver.addEventListener("click", newGame);

	function newGame(){
		x = 50;
		y = 50;
		snakeHead = new SnakeHead(x, y, w, h);
		curDirection = 'right';
		finalResult = 0;
    	speed = 2;
    	applesCount = false;
    	headX = [];
		headY = [];
		appleX = [];
		appleY = [];
		j = 10;
		eatSelf = false;
		result.innerHTML = "";
		hideHighscores();
		play();
	}

	function extendSnake(j){
		var i;
        for(i = j; i > 0; i-=1){
        	ctx.fillRect(headX[headX.length-i], headY[headY.length-i], w, h);
        }
	}

	function eatSelfCheck(){
		var k;
		for(k=0; k<j; k+=1){
			if (snakeHead.x === headX[headX.length-k] && snakeHead.y === headY[headY.length-k]){
				eatSelf = true;
			}
		}
	}

	function moveHor(direction){
		snakeHead.x += directions[direction]*speed;
	}

	function moveVer(direction){
		snakeHead.y += directions[direction]*speed;
	}

	function left(){
		moveHor('left');
		curDirection = 'left';
	}

	function right(){
		moveHor('right');
		curDirection = 'right';
	}

	function up(){
		moveVer('up');
		curDirection = 'up';
	}

	function down(){
		moveVer('down');
		curDirection = 'down';
	}

    function controls(evt) {
        switch (evt.keyCode) {
        	case 27:
        		alert('Game paused, press Enter or OK to resume');
        		break;
            case 37:
	            left();
	            break;
            case 39:
	            right();
	            break;
            case 38:
	            up();
	            break;
            case 40:
	            down();
	            break;
            }
    }

    function SnakeHead(x, y, w, h){
    	this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	function drawApple(x, y, w, h){
		ctx.save();
		ctx.strokeStyle = "green";
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, w, h);
		ctx.strokeRect(x, y, w, h);
		ctx.restore();
	}
	
	function addToLocalStorage(finalResult) {
	    var score = finalResult,
	    	name = prompt('Please enter your name');

	    localStorage.setItem(!!name ? name : '[anonymous]', score);
	}

    function displayHighscores() {
        var highScores = sortHighscores(),
        	table = generateTable(highScores),
        	div = document.createElement('div');

        div.id = 'list';
        div.style.cssText = "position: absolute; top: 150px; left: 835px";
        div.appendChild(table);
        document.body.appendChild(div);
    }

    function hideHighscores() {
    	var highScores = document.getElementById('list');
    	document.body.removeChild(highScores);
    }

    function sortHighscores() {
        var highScores = [],
        item;

		for (item in localStorage) {
            if(!isNaN(localStorage[item])){
            	highScores.push({ name: item, score: localStorage[item]*1});	
            }
        }

        highScores.sort(function (x, y) {
            return y.score - x.score;
        });

        return highScores;
    }

    function generateTable(highScores) {
        var table = document.createElement('table'),
        n,
        topFive;

        if(highScores.length > 5){
        	topFive = highScores.splice(0, 5);
        } else {
        	topFive = highScores;
        }

        table.style.margin = 'auto';
        table.style.fontFamily = 'Arial';
        generateRow(table, 'TOP 5 SCORES:');

        for (n = 0; n < 5; n+=1) {
            generateRow(table, topFive[n].name + ' ' + topFive[n].score);
        }

        return table;
    }

    function generateRow(table, text) {
        var row = document.createElement('tr'),
        	data = document.createElement('td');
        data.innerHTML = text;
        row.appendChild(data);
        table.appendChild(row);
    }

    function docReady(){
        window.addEventListener('keydown', controls);
    }