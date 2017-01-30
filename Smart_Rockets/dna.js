function DNA(dna) {
	if(dna){
		this.gene = dna;
	} else {
		this.gene = [];		
		
		for(var i  = 0; i < lifespan; i++){		
			this.gene[i] = p5.Vector.random2D();
			this.gene[i].setMag(0.2);
		}
	}
}
