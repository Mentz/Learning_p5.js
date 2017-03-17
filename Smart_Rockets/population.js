function Population() {
	this.rockets = [];
	this.matingPool = [];
	var maxFit = -1;

	for(var i = 0; i < maxPop; i++){
		this.rockets[i] = new Rocket();
	}

	this.calcMedia = function(){
		var media = 0;
		for(var i = 0; i < this.rockets.length; i++){
			media += this.rockets[i].fitness;
		}
		return media;
	}

	this.calcFitness = function(){
		maxFit = -1;
		for(var i = 0; i < maxPop; i++){
			var d = (this.rockets[i].minDist + dist(this.rockets[i].pos.x, this.rockets[i].pos.y, target.x, target.y))/2;
			this.rockets[i].fitness = map(pow(map(d, 0, w, 2, 0),3), 0, 8, -0.2, 0.5);
			if(this.rockets[i].fitness > maxFit){
				maxFit = this.rockets[i].fitness;
			}
		}

		for(var i = 0; i < maxPop; i++){
			this.rockets[i].fitness /= maxFit;
			if(this.rockets[i].completed){
				this.rockets[i].fitness = 1;
			}
			if(this.rockets[i].crashed){
				this.rockets[i].fitness = 0.02;
			}
		}
	}

	this.selection = function(){
		this.matingPool = [];
		for(var i = 0; i < maxPop; i++){
			var n = this.rockets[i].fitness * 10;
			for(var j = 0; j < n; j++){
				this.matingPool.push(this.rockets[i]);
			}
		}
	}

	this.reproduction = function(){
		var newPop = [];
		for(var j = 0; j < maxPop; j++){
			var a = random(this.matingPool);
			var b = random(this.matingPool);

			//var middle = floor(random(lifespan));

			var newDna = [];

			for(var i = 0; i < lifespan; i++){
				if(random(2) >= 1.0){
					newDna[i] = a.dna.gene[i];
				} else {
					newDna[i] = b.dna.gene[i];
				}
			}

			for(var i = 0; i < lifespan; i++){
				if(random(1) < 0.01){
					newDna[i] = p5.Vector.random2D();
				}
			}

			newPop[j] = new Rocket(new DNA(newDna));

		}

		this.rockets = newPop;

	}

};
