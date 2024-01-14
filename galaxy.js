const canvas = document.getElementById("canvas");
const portfolio = document.querySelector(".portfolio");

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
canvas.height = screenHeight;
canvas.width = screenWidth;
c = canvas.getContext("2d");

let alpha = 0.8;
let array = []; //object array
let radians = 0.0003;
let slow = false;
let star;

//used for interval
let allow = true; 
let off; 
let time = 0; 


//141 colors. The minimum is 0, the maximum is 140
const colorArray = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", 
    "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", 
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", 
    "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", 
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", 
    "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", 
    "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", 
    "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", 
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen",
    "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", 
    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", 
    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", 
    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", 
    "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", 
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", 
    "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
];


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


//object blueprint
class Starry {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius
    }

    //circle
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = `${this.color}`;
        c.shadowBlur = 15;
        c.fillStyle = `${this.color}`;
        c.fill();
        c.closePath();
    }

    update() {
        
        this.draw();
    }
}


function creator() {

    let x, y, color, radius;
    
    for(let i = 0; i < 600; i++) {

        x = randomRange(-screenWidth, screenWidth); //makes up for offset of screen in animation
        y = randomRange(-screenHeight, screenHeight);
        color = colorArray[randomRange(0, colorArray.length - 1)];
        radius = randomRange(0.6, 1);
        
        star = new Starry(x, y, radius, color);
        
        array.push(star);
    }
}


function animate() {

    requestAnimationFrame(animate);

    c.fillStyle = `rgba(10, 10, 10, ${alpha})` ;
    c.fillRect(0,0,screenWidth,screenHeight);

    c.save();
    c.translate(screenWidth / 2, screenHeight / 2); //repositions screen
    c.rotate(radians);

    array.forEach(obj => {
        obj.update();
    });
    c.restore();

    radians += 0.00025;

    if(slow) {
        if(alpha > 0.001) {
            alpha -= 0.0025;
        }  
        radians += 0.005;
        
    } else {
        alpha = 0.8;
    }
}


canvas.addEventListener("click", function() {
    
    slow == false ? slow = true : slow = false;

    portfolio.style.visibility = "visible";

    time = 3000; //3 seconds, resets on click
    
    if(allow) {

        allow = false; //prevents multiple intervals

        off = setInterval(() => {
            time -= 1000;
        
            if(time <= 0) {
                portfolio.style.visibility = "hidden";
                clearInterval(off);
                allow = true;
            }
        }, 1000);
    }
});


//prevents infite loop when loading page on mobile
setTimeout(function() {

    window.addEventListener("resize", function() {
        location.reload();
    });

}, 25); 


window.onload = function() {

    creator();
    
    animate();
};
