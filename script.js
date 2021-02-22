"use strict"

function start() {
	mySoundInit();
	var level = document.getElementById('LVL')
	level.style.transform = 'translateY(0px)';
}

var myAudio1=new Audio("http://www.taur.net/~ottercomics/ottertunes/oishow/sfx/hammeronce.wav");
var myAudio2=new Audio("http://princezze.free.fr/sounds/tape.wav");
var myAudio3=new Audio("http://www.worldoflongmire.com/features/apes/planet6/AAAH.WAV");
var myAudio4=new Audio("http://www.utc.fr/si28/ProjetsUpload/P2006_si28p004/flash_puzzle/sons/rush/crowd5.wav");

function mySoundInit() {
    myAudio1.play(); // запускаем звук
    myAudio1.pause(); // и сразу останавливаем
    myAudio2.play();
    myAudio2.pause(); 
}

function mySound1() {
    myAudio1.currentTime=0; // в секундах
    myAudio1.play();
}

function mySound2() {
    myAudio2.currentTime=0; // в секундах
    myAudio2.play();
}

function mySound3() {
    myAudio3.currentTime=0; // в секундах
    myAudio3.play();
}

function mySound4() {
    myAudio4.currentTime=0; // в секундах
    myAudio4.play();
}

var speed = 0; // Скорость игры. Зависит от уровня сложности

function easy () {
	speed = 800;
	startGame();
}

function midle () {
	speed = 500;
	startGame();
}

function hard () {
	speed = 250;
	startGame();
}

function startGame () {

	var screen = document.getElementsByClassName('Screen')[0];

	var tetris = document.createElement('div');
	tetris.classList.add('Tetris');
	screen.appendChild(tetris);

	var lines = 18; // количество рядов (в т.ч. 4 - невидимые)
	var columns = 10; // количество столбцов

	// Создадим ячейки
	for (var i = 1; i <= (lines*columns); i++) {
		var cell = document.createElement('div');
		cell.classList.add('Cell');
		tetris.appendChild(cell);
	}

	// Присвоим координаты ячейкам
	var cells = document.getElementsByClassName('Cell'); // Получим массив со всеми ячейками
	var cellIndex = 0; // Будет использоваться в цикле в качестве позиции элемента в массиве

	for (var y = lines; y >= 1; y--) {
		for (var x = 1; x <= columns ; x++) {
			cells[cellIndex].setAttribute('posX', x);
			cells[cellIndex].setAttribute('posY', y);
			cellIndex++;
		}
	}

	//Создадим массив, элементами которого будут фигуры
	var figureArr = [
		//Фигура состоит из четырех ячеек. Координаты стартовой ячейки опишем позже. Осталось описать координаты трех ячеек относительно стартовой
		//Фигура  I
		[
			[0,1],
			[0,2],
			[0,3],
			//поворот на 90
			[
				[-1,1],
				[0,0],
				[1,-1],
				[2,-2]
			],
			//поворот на 180
			[
				[1,-1],
				[0,0],
				[-1,1],
				[-2,2]
			],
			//поворот на 270
			[
				[-1,1],
				[0,0],
				[1,-1],
				[2,-2]
			],
			//поворот на 360
			[
				[1,-1],
				[0,0],
				[-1,1],
				[-2,2]
			]
		],

		//Фигура L
		[
			[1,0],
			[0,1],
			[0,2],
			//поворот на 90
			[
				[0,0],
				[-1,1],
				[1,0],
				[2,-1]
			],
			//поворот на 180
			[
				[1,-1],
				[1,-1],
				[-1,0],
				[-1,0]
			],
			//поворот на 270
			[
				[-1,0],
				[0,-1],
				[2,-2],
				[1,-1]
			],
			//поворот на 360
			[
				[0,-1],
				[0,-1],
				[-2,0],
				[-2,0]
			]
		],

		//Фигура J
		[
			[1,0],
			[1,1],
			[1,2],
			//поворот на 90
			[
				[0,0],
				[0,0],
				[1,-1],
				[-1,-1]
			],
			//поворот на 180
			[
				[0,-1],
				[-1,0],
				[-2,1],
				[1,0]
			],
			//поворот на 270
			[
				[2,0],
				[0,0],
				[1,-1],
				[1,-1]
			],
			//поворот на 360
			[
				[-2,0],
				[1,-1],
				[0,0],
				[-1,1]
			]
		],
		
		//Фигура T
		[
			[1,0],
			[2,0],
			[1,1],
			//поворот на 90
			[
				[1,-1],
				[0,0],
				[0,0],
				[0,0]
			],
			//поворот на 180
			[
				[0,0],
				[-1,0],
				[-1,0],
				[1,-1]
			], 
			//поворот на 270
			[
				[1,-1],
				[1,-1],
				[1,-1],
				[0,0]
			],
			//поворот на 360
			[
				[-2,0],
				[0,-1],
				[0,-1],
				[-1,-1]
			]
		],

		//Фигура Z
		[
			[1,0],
			[-1,1],
			[0,1],
			//поворот на 90
			[
				[0,-1],
				[-1,0],
				[2,-1],
				[1,0]
			],
			//поворот на 180
			[
				[0,0],
				[1,-1],
				[-2,0],
				[-1,-1]
			],
			//поворот на 270
			[
				[0,-1],
				[-1,0],
				[2,-1],
				[1,0]
			],
			//поворот на 360
			[
				[0,0],
				[1,-1],
				[-2,0],
				[-1,-1]
			]
		],

		//Фигура S
		[
			[1,0],
			[1,1],
			[2,1],
			//поворот на 90
			[
				[2,-1],
				[0,0],
				[1,-1],
				[-1,0]
			],
			//поворот на 180
			[
				[-2,0],
				[0,-1],
				[-1,0],
				[1,-1]
			],
			//поворот на 270
			[
				[2,-1],
				[0,0],
				[1,-1],
				[-1,0]
			],
			//поворот на 360
			[
				[-2,0],
				[0,-1],
				[-1,0],
				[1,-1]
			]
		],

		//Фигура O
		[
			[1,0],
			[0,1],
			[1,1],
			//поворот на 90
			[
				[0,0],
				[0,0],
				[0,0],
				[0,0]
			],
			//поворот на 180
			[
				[0,0],
				[0,0],
				[0,0],
				[0,0]
			],
			//поворот на 270
			[
				[0,0],
				[0,0],
				[0,0],
				[0,0]
			],
			//поворот на 360
			[
				[0,0],
				[0,0],
				[0,0],
				[0,0]
			]
		]
	];

	// Координаты стартовой ячейки появления фигур (за пределами видимого поля)
	var x = 5;
	var y = 15;

	var figureBody = [] // Массив с ячейками фигуры
	var numberFigure; // Номер фигура, значение которого мы получим рандомно
	var colorFigure = ['FigureI','FigureL','FigureJ','FigureT','FigureZ','FigureS','FigureO']; // CSS классы фигур
	var rotate = 1 // Состояние поворота фигуры
	var liveResult = 0 // Текущий счет. Начисление очков описано в части удаления ряда
	document.getElementsByClassName('Result')[0].textContent=`${liveResult}`; //добавляем стартовое значение

	// Опишем создание фигуры
	function createFigure () {
		// Получим рандомное значение, которое будет индексом массива с фигурами
		function randomDiap(n,m) {
	  		return Math.floor(Math.random()*(m-n+1))+n;
		};

		rotate = 1;
		numberFigure = randomDiap(0,figureArr.length-1);

		// Построение необходимой фигуры
		figureBody = [			
			document.querySelector(`[posX = "${x}"][posY = "${y}"]`), // Стартовая ячека
			// Вторая, третья и четвертая соответственно
			document.querySelector(`[posX = "${x+figureArr[numberFigure][0][0]}"][posY = "${y+figureArr[numberFigure][0][1]}"]`),
			document.querySelector(`[posX = "${x+figureArr[numberFigure][1][0]}"][posY = "${y+figureArr[numberFigure][1][1]}"]`),
			document.querySelector(`[posX = "${x+figureArr[numberFigure][2][0]}"][posY = "${y+figureArr[numberFigure][2][1]}"]`),
		];
		
		// Через цикл добавим для каждой ячейки фигуры необходимы класс
		for (var i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add(colorFigure[numberFigure]);
		}
	};
	createFigure(); // Создаем фигуру

	// Опишем движение фигуры
	function moveFigure () {
		// Чтобы описать движение фигуры, нужно получить координаты ячеек текущей фигуры
		var positionFigure = [
			[figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')],
			[figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')],
			[figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')],
			[figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')]
		];

		var stateFigure = true //состояние фигуры true - движется, false - нет

		for (var i=0; i < positionFigure.length; i++){
			// Если какая либо из ячеек фигуры оказывается в позиции 1 по оси Y, то прерываем движение фигуры
			// ИЛИ если ниже окажется фигура, с присвоенным классом .FigureStop (всем остановившимся фигурам будем присваивать этот класс)
			if (positionFigure[i][1] == 1 || document.querySelector(`[posX = "${positionFigure[i][0]}"][posY= "${positionFigure[i][1]-1}"]`).classList.contains('FigureStop')) {
				stateFigure = false;
				mySound1();
				break;
			};
		};
		// Eсли фигура движется
		if (stateFigure) {
			for (var i = 0; i < figureBody.length; i++) {
				figureBody[i].classList.remove(colorFigure[numberFigure]); //удаляем класс .Figure
			};
			//смещаем ячейки фигуры по оси Y
			figureBody = [
				document.querySelector(`[posX="${positionFigure[0][0]}"][posY="${positionFigure[0][1]-1}"]`),
				document.querySelector(`[posX="${positionFigure[1][0]}"][posY="${positionFigure[1][1]-1}"]`),
				document.querySelector(`[posX="${positionFigure[2][0]}"][posY="${positionFigure[2][1]-1}"]`),
				document.querySelector(`[posX="${positionFigure[3][0]}"][posY="${positionFigure[3][1]-1}"]`)
			];
			for (var i = 0; i < figureBody.length; i++) {
				figureBody[i].classList.add(colorFigure[numberFigure]); //добавляем кляасс .Figure
			};
		} else {
			for (var i = 0; i < figureBody.length; i++) {
				figureBody[i].classList.remove(colorFigure[numberFigure]); //удаляем класс Figure
				figureBody[i].classList.add('FigureStop');//добавляем класс .FigureStop
			};
			//Есть ли на поле заполненные ряды?
			for (var i = 1; i < lines; i++) {
				var count = 0; //количество заполненный в ячеек в ряду
				for (var j = 1; j <= columns; j++) {
					if (document.querySelector(`[posX = "${j}"][posY = "${i}"]`).classList.contains('FigureStop')){
						count++;
						if (count==10) {
							mySound4();							
							liveResult +=10 //при удалении ряда начисляем очки
							document.getElementsByClassName('Result')[0].textContent=`${liveResult}`; // Обновляем текущий счет
							for (var k = 1; k <= columns; k++) {
								document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.remove('FigureStop')
							}
							//Получим все имеющиеся ячейка с классом FigureStop, чтобы их опусть вниз после удаления ряда
							var cellsDown = document.querySelectorAll('.FigureStop');
							var newCells = [];
							for (var b = 0; b < cellsDown.length; b++) {
								var newCellsCoord = [cellsDown[b].getAttribute('posX'),cellsDown[b].getAttribute('posY')];
								//Т.к. на не надо смещать ряды под удаленным рядом, надо сделать проверку
								if (newCellsCoord[1] > i) {
									cellsDown[b].classList.remove('FigureStop');
									newCells.push(document.querySelector(`[posX = "${newCellsCoord[0]}"][posY = "${newCellsCoord[1]-1}"]`));
								}
							}
							for (var a = 0; a < newCells.length; a++) {
								newCells[a].classList.add('FigureStop');
							}
							i--;
						}
					}
				}
			}
			// Условия окончания игры
			for (var f = 1; f <= columns; f++) {
				// Как только какая-либо ячейка получит класс .FigureStop за пределами видимого поля (т.е. на lines-3 ряду) - конец кигры
				if (document.querySelector(`[posX = "${f}"][posY = "${lines-3}"]`).classList.contains('FigureStop')) {
					clearInterval(int);
					mySound3();
					alert(`Конец игры. Вы набрали ${liveResult} очков.`)								
					break;
				}
			}
			createFigure(); //создаем новую фигуру
		}
	}

	var int = setInterval(moveFigure,speed);

	var mooving; //true - переместить фигуру можно. false - нельзя (класс FigureStop или упирается в боковую стенку)

	// Опишем обработчик событий для управления фигурами
	window.addEventListener('keydown', function (EO) {
		EO=EO||window.event;

		// Получим координаты ячеек фигуры
		var coord1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')];
		var coord2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')];
		var coord3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')];
		var coord4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')];

		//argument будет равен 1 или -1 в зависимости от направления смещения фигуры
		function newPosition (argument) {
			mooving = true;

			var figureNew = [
				document.querySelector(`[posX="${+coord1[0] + argument}"][posY="${coord1[1]}"]`),
				document.querySelector(`[posX="${+coord2[0] + argument}"][posY="${coord2[1]}"]`),
				document.querySelector(`[posX="${+coord3[0] + argument}"][posY="${coord3[1]}"]`),
				document.querySelector(`[posX="${+coord4[0] + argument}"][posY="${coord4[1]}"]`)
				];


			for (var i = 0; i < figureNew.length; i++) {
				if (!figureNew[i] || figureNew[i].classList.contains('FigureStop')) {
					mooving = false;
				}
			}

			if (mooving) {
				for (var i = 0; i < figureBody.length; i++) {
					figureBody[i].classList.remove(colorFigure[numberFigure]);
				}		
				//перезаписываем figureBody на figureNew, т.к. координаты уже другие
				figureBody = figureNew;

				for (var i = 0; i < figureBody.length; i++) {
						figureBody[i].classList.add(colorFigure[numberFigure]);
				};		
			};
		};		

		if (EO.keyCode == 39) { //движение вправо
			mySound2();
			newPosition(1);
		} else if (EO.keyCode == 37) { //движение влево
			mySound2();
			newPosition(-1);
		} else if (EO.keyCode == 40) { //движение вниз
			mySound2();
			moveFigure();
		} else if (EO.keyCode == 38) { //вращение
			mooving = true;

			var figureNew = [
				document.querySelector(`[posX="${+coord1[0] + figureArr[numberFigure][rotate+2][0][0]}"][posY="${+coord1[1] + figureArr[numberFigure][rotate+2][0][1]}"]`),
				document.querySelector(`[posX="${+coord2[0] + figureArr[numberFigure][rotate+2][1][0]}"][posY="${+coord2[1] + figureArr[numberFigure][rotate+2][1][1]}"]`),
				document.querySelector(`[posX="${+coord3[0] + figureArr[numberFigure][rotate+2][2][0]}"][posY="${+coord3[1] + figureArr[numberFigure][rotate+2][2][1]}"]`),
				document.querySelector(`[posX="${+coord4[0] + figureArr[numberFigure][rotate+2][3][0]}"][posY="${+coord4[1] + figureArr[numberFigure][rotate+2][3][1]}"]`)
				];


			for (var i = 0; i < figureNew.length; i++) {
				if (!figureNew[i] || figureNew[i].classList.contains('FigureStop')) {
					mooving = false;
				}
			}

			if (mooving) {
				for (var i = 0; i < figureBody.length; i++) {
					figureBody[i].classList.remove(colorFigure[numberFigure]);
				}		
				//перезаписываем figureBody на figureNew, т.к. координаты уже другие
				figureBody = figureNew;

				for (var i = 0; i < figureBody.length; i++) {
						figureBody[i].classList.add(colorFigure[numberFigure]);
				};

				if (rotate<4) {
					rotate++
				} else {
					rotate=1;
				}
			};
			mySound2();
		};
	})
}


