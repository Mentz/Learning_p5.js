function Population() {
	this.rockets = [];
	// this.survivors = [];
	this.matingPool = [];
	var maxFit = -1;
	var survivorCount = 50;

	for(var i = 0; i < maxPop; i++){
		this.rockets[i] = new Rocket();
	}

	function sortFitness(a, b)
	{
		return a.fitness - b.fitness;
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
		sumFit = 0;
		for(var i = 0; i < maxPop; i++){
			var d = (this.rockets[i].minDist + dist(this.rockets[i].pos.x, this.rockets[i].pos.y, target.x, target.y))/2;
			d = d*d*d;
			// this.rockets[i].fitness = map(pow(map(d, 0, w, 2, 0),3), 0, 8, -0.2, 0.5);
			this.rockets[i].fitness = map(d, 0, w, 0.0, 0.5);
			// if(this.rockets[i].fitness > maxFit){
			// 	maxFit = this.rockets[i].fitness;
			// }
			if (this.rockets[i].completed){
				this.rockets[i].completeTime = map(this.rockets[i].completeTime, -1, 130, 0.55, 0.15);
				this.rockets[i].fitness += this.rockets[i].completeTime;
			}
			if (this.rockets[i].crashed)
				this.rockets[i].fitness -= 0.2;

			if (this.rockets[i].fitness > 1)
				this.rockets[i].fitness = 1;

			sumFit += this.rockets[i].fitness;
		}

		for(var i = 0; i < maxPop; i++){
			// this.rockets[i].fitness /= maxFit;
			this.rockets[i].fitness /= sumFit;
		}
	}

	this.selection = function(){
		this.rockets.sort(sortFitness);
		// this.survivors = [];

		this.matingPool = [];
		// for(var i = 0; i < survivorCount; i++)
		for(var i = 0; i < 100; i++)
		{
			this.matingPool.push(this.rockets[i]);
		}

		// shuffle(this.rockets[i], true);
		// for(var i = 0; i < maxPop; i++){
		// 	var n = this.rockets[i].fitness * 1000;
		// 	for(var j = 0; j < n; j++){
		// 		this.matingPool.push(this.rockets[i]);
		// 	}
		// }
	}

	this.reproduction = function(){
		var newPop = [];
		// for(var j = 0; j < survivorCount; j++)
		// {
		// 	var newDna = [];
		// 	for(var i = 0; i < lifespan; i++)
		// 	{
		// 		newDna[i] = this.survivors[j].dna.gene[i];
		// 	}
		//
		// 	newPop[j] = new Rocket(new DNA(newDna));
		// }

		for(var j = 0; j < maxPop; j++){
			var a = random(this.matingPool);
			var b = random(this.matingPool);

			//var middle = floor(random(lifespan));

			var newDna = [];
			if(random(2) >= 1.0){
				for(var i = 0; i < lifespan / 2; i++){
					newDna[i] = a.dna.gene[i];
				}
				for(var i = lifespan / 2; i < lifespan; i++){
					newDna[i] = b.dna.gene[i];
				}
			} else {
				for(var i = 0; i < lifespan / 2; i++){
					newDna[i] = b.dna.gene[i];
				}
				for(var i = lifespan / 2; i < lifespan; i++){
					newDna[i] = a.dna.gene[i];
				}
			}

			for(var i = 0; i < lifespan; i++){
				if(random(1) < 0.005){
					newDna[i] = p5.Vector.random2D();
				}
			}

			newPop[j] = new Rocket(new DNA(newDna));

		}

		this.rockets = newPop;

	}

};
