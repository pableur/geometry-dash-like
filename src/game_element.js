class GameElement {
    constructor(context) {
        this.context = context
        this.position = new Position(0, 0);
    }
}

class BackGround extends GameElement {
    constructor(context, asset_id) {
        super(context);

        this.asset_id = asset_id;
    }

    draw(){
        var image = document.getElementById(this.asset_id);
        this.context.drawImage(image, this.position.x, this.position.y);
        this.context.drawImage(image, this.position.x + 512, this.position.y);
        this.context.drawImage(image, this.position.x + 1024, this.position.y);

        this.context.beginPath();
        this.context.fillStyle = "rgba(0, 255, 0, 0.2)";
        this.context.roundRect(0, 0, 1024, 512-128, 5);
        this.context.fill();
    }

    next(){
        this.position.x -= 0.5;
        if(this.position.x <= -512){
            this.position.x = 0;
        }
    }
}

class Ground extends BackGround {
    constructor(context, asset_id) {
        super(context, asset_id);

        this.position.y = 512 - 128;
    }

    draw(){
        var image = document.getElementById(this.asset_id);
        for(var i = 0; i <= 1024; i+=128){
            this.context.drawImage(image, this.position.x + i, this.position.y);
        }

        this.context.beginPath();
        this.context.fillStyle = "rgba(19, 117, 79, 0.5)";
        this.context.roundRect(0, this.position.y, 1024, 128, 5);
        this.context.fill();
    }

    next(){
        this.position.x -= 10;
        if(this.position.x <= -128){
            this.position.x = 0;
        }
    }
}

class Hero extends GameElement {
    constructor(context) {
        super(context);
        this.tempCanvas = document.createElement("canvas");
        this.tempCanvas.width = 1024;
        this.tempCanvas.height = 512;
        this.tmp_context = this.tempCanvas.getContext("2d");
        this.step = 0;

        this.tmp_y = 512-228;
        this.angle = 0;
        // this.tmp_context.translate(x, y);
        // this.tmp_context.translate(this.position.x, this.position.y);
        this.tmp_context.save();

    }

    draw(){
        this.tmp_context.reset();
        let x = this.position.x;

        this.step += 1;

        this.tmp_y = this.position.y + Math.sin(this.step * 0.0174533)*100;

        if(this.tmp_y >= this.position.y){
            this.tmp_y = this.position.y;
            this.angle = 0;
        }else{
            this.angle += 1;
        }
        let y = this.tmp_y;
        x = -50;
        y = -50;
        this.tmp_context.translate( this.position.x+50, this.tmp_y+50);

        if(this.angle > 0){
            this.tmp_context.rotate( (this.angle *  Math.PI) / (180) );

            // this.tmp_context.translate(x+50, y+50);
            // this.tmp_context.translate(50, 50);
            // this.tmp_context.translate(-1 * (x+50), -1 * (y+50));
        }
        // this.tmp_context.setTransform(1, 1, 1, 1, this.position.x, this.tmp_y);
        // this.tmp_context.translate( this.position.x+50, this.tmp_y+50);

        this.tmp_context.clearRect(x-200, y-200, 1000, 1000);

        // console.log(this.angle * Math.PI / 180);

        this.tmp_context.beginPath();
        this.tmp_context.fillStyle = "#000000";
        this.tmp_context.roundRect(x+0, y+0, 100, 100, 5);
        this.tmp_context.fill();

        this.tmp_context.beginPath();
        this.tmp_context.fillStyle = "#7ff803";
        this.tmp_context.roundRect(x+5, y+5, 90, 90, 5);
        this.tmp_context.fill();

        this.tmp_context.beginPath();
        this.tmp_context.fillStyle = "#000000";
        this.tmp_context.roundRect(x+15, y+15, 70, 70, 5);
        this.tmp_context.fill();

        this.tmp_context.beginPath();
        this.tmp_context.clearRect(x+20, y+20, 60, 60);

        this.tmp_context.beginPath();
        this.tmp_context.fillStyle = "#000000";
        this.tmp_context.roundRect(x+30, y+30, 40, 40, 5);
        this.tmp_context.fill();

        this.tmp_context.beginPath();
        this.tmp_context.fillStyle = "#03ffff";
        this.tmp_context.roundRect(x+35, y+35, 30, 30, 5);
        this.tmp_context.fill();

        // this.tmp_context.translate(-1 * (x+50), -1 * (y+50));
        this.context.drawImage(this.tempCanvas, 0, 0, canvas.width, canvas.height);
    }
}

class Particule extends GameElement {
    constructor(context, width) {
        super(context);
        this.width = width;
        this.height = width;
    }

    draw(){
        this.context.beginPath();
        this.context.fillStyle = "rgba(54, 252, 176, 0.7)";
        this.context.rect(this.position.x, this.position.y, this.width, this.width);
        this.context.fill();
    }

    next(){
        this.position.x -= Math.random()*3;
        this.position.y += Math.random()*10 - 5;
    }
}