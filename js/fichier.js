const canvas = document.querySelector('.canvas')
const context = canvas.getContext("2d")
let point = document.querySelector(".score")
let score = 0;
let boutton = document.querySelector(".actualise")

boutton.addEventListener('click',(e)=>{
    location.reload()
})

const snake = new Snake([[2, 3], [3, 3], [4, 3], [5, 3], [6, 3]], 39)
const apple = new Apple(7,5)
const poisons = [new Apple(2,3, true), new Apple(12,4, true), new Apple(10,15, true)]

snake.draw(context)

const inter = setInterval(()=>{
    if (snake.checkCollision() || snake.body.length == 1) {
        clearInterval(inter)
        alert("Game over !!!!!")
    }
    let iseatpoison = snake.eatPoison(poisons) 
    if (iseatpoison) {
        snake.countApple = 0
        iseatpoison.changePosition(snake.body,[...poisons,apple] ,canvas.height, canvas.width)
        snake.grow(false)
        score -= 10
        
    }

    let iseatApple = snake.eatApple(apple.x, apple.y)
    if (iseatApple) {
        if (!apple.issuper) {
            snake.countApple += 1
            if (snake.countApple == 2) {
                snake.countApple = 0
                apple.issuper = true
            }
        }else{
            apple.issuper = false
        }

        snake.grow(true)
        apple.changePosition(snake.body,poisons, canvas.height, canvas.width)
        score += 10
        
    }
    context.clearRect(0,0, canvas.width, canvas.height)
    snake.draw(context)
    apple.draw(context)
    poisons.forEach(element => {
        element.draw(context)
    });
    snake.move(canvas.width,canvas.height)
    point.textContent = "score: " + score
    

},200)

window.addEventListener('keyup',(e)=>snake.changeDirection(e.keyCode))



