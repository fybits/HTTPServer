class Vector {
	constructor (x,y) {
		this.x = x;
		this.y = y;
	}
	distance (vector) {
		return new Vector(vector.x-this.x,vector.y-this.y).magnitude();
	}
	dir (vector) {
		return new Vector(vector.x-this.x,vector.y-this.y).normalized();
	}
	add (vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	mult(n) {
		this.x = this.x*n;
		this.y = this.y*n;
	}
	multiplyed(n) {
		return new Vector(this.x*n,this.y*n);		
	}
	normalized () {
		return new Vector(this.x/this.magnitude(),this.y/this.magnitude());
	}
	magnitude() {
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
}