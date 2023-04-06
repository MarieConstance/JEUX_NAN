//class serpent

class Snake{

    constructor(body,direction,){

        this.body = body;
        this.direction = direction;
        this.widhtsquare = 20;
        this.heightsquare = 20;
        this.increX = 1;
        this.increY = 0;
        this.countApple = 0;
    }
    

    draw(context) {
        this.body.forEach(cle => {
            const [x, y] = cle; 
            context.fillStyle = "blue";
            context.fillRect(x * this.widhtsquare, y * this.heightsquare, this.widhtsquare, this.heightsquare);
        });
    }

    move(canvasWidth, canvasHeight){
        let [x, y] = this.body[this.body.length - 1];
        let variableX = x + this.increX
        let variableY = y + this.increY
        this.body.shift();

        if (variableX < 0) {
            variableX = Math.floor(canvasWidth/this.widhtsquare)-1
        }
        if (variableX > Math.floor(canvasWidth/this.widhtsquare)-1) {
            variableX = 0
        }

        if (variableY < 0 ) {
            variableY = Math.floor(canvasHeight/this.heightsquare)
        }
        if (variableY > Math.floor(canvasHeight/this.heightsquare)) {
            variableY = 0
        }
                                                                                                                                                                  
        this.body.push([variableX,variableY]);
      
    }
    changeDirection(keyCode){

        if (keyCode == 39 && this.direction != 37) {
            this.increX = 1;
            this.increY = 0;
            this.direction = keyCode;
        }
        if (keyCode == 37 && this.direction != 39) {
            this.increX = -1;
            this.increY = 0;
            this.direction = keyCode;
        }
        if (keyCode == 38 && this.direction != 40) {
            this.increX = 0;
            this.increY = -1;
            this.direction = keyCode;
        }
        if (keyCode == 40 && this.direction != 38) {
            this.increX = 0;
            this.increY = 1;
            this.direction = keyCode;
        }  

    }

    eatApple(appleX, appleY){
        let last = this.body[this.body.length-1];

        return last[0] == appleX && last[1] == appleY
    }

    grow(isgrow){

        if (isgrow) {
            let [x,y] = this.body[this.body.length-1]
        this.body.push([x + this.increX,y + this.increY])
        }
        else{
            this.body.shift()
        }
        
    }

    checkCollision(){
        let rest = this.body.slice(0,this.body.length-1)
        let last = this.body[this.body.length-1]
        return rest.find((b)=>{
            return b[0]==last[0] && b[1]==last[1]
        })
    }

    eatPoison(poisons){
        let last = this.body[this.body.length-1]
        return poisons.find(e=> e.x == last[0] && e.y == last[1])
    }
    
}

// pomme

class Apple{

    constructor(x,y,poison){
        this.x = x;
        this.y = y;
        this.widhtsquare = 20;
        this.heightsquare = 20;
        this.ispoison = poison;
        this.issuper = false
    }
    draw(context) {
        let rayon = this.issuper ? this.widhtsquare : this.widhtsquare/ 2
        context.beginPath()
        context.arc(this.x * this.widhtsquare + rayon, this.y * this.heightsquare + rayon,rayon , 0, 2 * Math.PI)
        context.fillStyle = this.ispoison ? "purple" :"red"
        context.fill() 
    }

    changePosition(snakeBody, apples, canvasHeight, canvasWidth,){

        let maxX = Math.floor(canvasWidth / this.widhtsquare)
        let maxY = Math.floor(canvasHeight / this.heightsquare)
        let X = 0;
        let Y = 0;

        do {
            X = Math.floor(Math.random()* maxX)
            Y = Math.floor(Math.random()* maxY)
            
        } while (snakeBody.find((b)=>{
           return b[0]== X && b[1]== Y

        })|| apples.find((a)=>{
            return a.x == X &&  a.y == Y
        }));

        this.x = X;
        this.y = Y;
    }

    
}