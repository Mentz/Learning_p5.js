var rocket;

var w = 1024;
var h = 600;

var count = 0;
var lifespan = 300;
var maxPop = 300;

var population;

var target;

var walls = [];
var wallsSize = [];

var sumFitness = 0;
var fitnessMedio = 0;
var generation = 1;
var frames = 0;
var img;

var sucessos = 0;
var fracassos = 0;

var aux;
var framesPassed;

function drawText(){
	textSize(15);
	fill(255);
	text("Lifespan: " + (lifespan - count), 10, 20);
	text("Estão " + max([(fitnessMedio * 100)/maxPop, 0.0]).toFixed(2) + "% adaptados", 10, 40);
	text("Geração: " + generation, 10, 60);
	if (frameCount % 100 == 0)
	{
		frames = frameCount / (millis()/1000.0);
	}
	text("FPS: " + frames, 10, 80);
	//text("Sucessos: " + sucessos, 10, 100);
	//text("Fracassos: " + fracassos, 10, 100);
}

function setup() {
	createCanvas(1024, 600);
	frameRate(144);
	population = new Population();
	target = createVector(width / 2, 50);
	for(var i = 0; i < 20; i++){
		walls.push(createVector(random(w), random(125, h - 200)));
		wallsSize.push(createVector(random(10, 50), random(10, 50)));
	}
	img = loadImage("Smart_Rockets/rockets.png");
}

function draw()	{
	background(0);
	drawText();

	
	for(var i = 0; i < maxPop; i++){
		aux = population.rockets[i].update(lifespan - count);
		if (aux == 1)
			sucessos++;
		else if (aux == 2)
			fracassos++;
		population.rockets[i].show(round((frameCount%16)/16), img);
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
		generation++;
		sucessos = 0;
		fracassos = 0;
	}
	
	if (mouseIsPressed)
	{
		for(; count < lifespan - 1;)
		{
			for(var i = 0; i < maxPop; i++){
				aux = population.rockets[i].update(lifespan - count);
				if (aux == 1)
					sucessos++;
				else if (aux == 2)
					fracassos++;
				//population.rockets[i].show(frameCount % 2, img);
			}
			count++;
		}
	}
	
	fill(255, 100, 100);
	ellipse(target.x, target.y, 15, 15);

	for(var i = 0; i < walls.length; i++){
		fill(120, 120, 120);
		rect(walls[i].x, walls[i].y, wallsSize[i].x, wallsSize[i].y);
	}
}
