var rocket;

var w = 640;
var h = 480;

var count = 0;
var lifespan = 300;
var maxPop = 100;

var population;

var target;

var walls = [];
var wallsSize = [];

var sumFitness = 0;
var fitnessMedio = 0;

function drawText(){
	textSize(15);
	fill(255);
	text("Lifespan: " + (lifespan - count), w - 100, 50);
	text("Media do fitness: " + fitnessMedio, w - 170, 70);
}

function setup() {
	createCanvas(640, 480);
	population = new Population();
	target = createVector(width / 2, 50);
	for(var i = 0; i < 20; i++){
		walls.push(createVector(random(w), random(125, h - 200)));
		wallsSize.push(createVector(random(10, 50), random(10, 50)));
	}
}

function draw()	{
	background(0);
	
	drawText();

	for(var i = 0; i < maxPop; i++){
		population.rockets[i].update();
		population.rockets[i].show();
	}
	count++;
	if(count >= lifespan - 1){
		population.calcFitness();
		if(fitnessMedio == 0){
			fitnessMedio = population.calcMedia();
		} else {
			sumFitness = population.calcMedia();
			fitnessMedio += sumFitness;
			fitnessMedio /= 2.0;
		}
		sumFitness = 0;
		population.selection();
		population.reproduction();
		count = 0;
	}
	fill(255, 100, 100);
	ellipse(target.x, target.y, 15, 15);

	for(var i = 0; i < walls.length; i++){
		fill(120, 120, 120);
		rect(walls[i].x, walls[i].y, wallsSize[i].x, wallsSize[i].y);
	}
}
