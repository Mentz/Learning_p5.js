function Rocket(dna) {
	this.pos = createVector(w / 2, h - 20);
	this.vel = createVector();
	this.acc = createVector();
	this.minDist = w+h;
	if(dna){
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}

	this.crashed = false;
	this.completed = false;
	this.completeTime = -1;

	this.fitness = 0;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function(remainingTime) {

		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (!this.completed)
		{
			if(d < 10){
				this.completed = true;
				this.completeTime = remainingTime;
				return 1;
			}
			if (d < this.minDist)
			{
				this.minDist = d;
			}

			if(this.pos.x > w || this.pos.x < 0 || this.pos.y > h || this.pos.y < 0){
				this.crashed = true;
				return 2;
			}

			for(var i = 0; i < 20; i++){
				if(this.pos.x > walls[i].x && this.pos.x < walls[i].x + wallsSize[i].x && this.pos.y > walls[i].y && this.pos.y < walls[i].y + wallsSize[i].y){
					this.crashed = true;
					return 2;
				}
			}

			this.applyForce(this.dna.gene[count]);
			if(!this.crashed && !this.completed){		
				this.vel.add(this.acc);
				this.pos.add(this.vel);
				this.acc.mult(0);
				this.vel.limit(4);
			}

			return 0;
		}
		else
		{
			return 1;
		}
	}

	this.show = function(direction, img) {		
		push();
		noStroke();
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI/2);
		rectMode(CENTER);
		if (direction)
			image(img, 0, -10, 5, 20, 0, 0, 5, 20);
		else
			image(img, 0, -10, 5, 20, 0, 20, 5, 20);
		pop();
	}	

}
