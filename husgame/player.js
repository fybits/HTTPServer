class Player {

    constructor (pos) {
        this.pos = pos;
        this.image = "hus";
    }

    draw () {
		ctx.drawImage(images[this.image],this.pos.x, this.pos.y, 120, 120);
	}
}