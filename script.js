var w = window.innerWidth;
var h = window.innerHeight;
var range = 10;
let x;
let y;
let x1;
let y1;
let x2;
let y2;
let index;

//THIS MAKES THE CANVAS IN TERMS OF THE WINDOW SIZE
const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", w / 2)
    .attr("height", h / 1.5)
    .attr("border", 1)
    .attr("id", "svg");

//THIS MAKES A GROUP FOR THE LINES
let linesGroup = d3.select("#svg")
    .append("g");

//THIS MAKES THE BORDER FOR THE SVG CANVAS
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h / 1.5)
    .attr("width", w / 2)
    .style("stroke", 'white')
    .style("fill", "none")
    .style("stroke-width", 5);

//THIS SAVES POINT DATA
let data = [];

//THIS SAVES MUTATED POINT DATA
let randData = [];

//THIS ADDS A NEW POINT TO THE DATA STRUCTURE
svg.on("click", function(event){
    x = d3.pointer(event)[0];
    y = d3.pointer(event)[1];
    data.push([x,y]);

});

//THIS ATTACHES A LINE FROM THE LAST POINT IN THE DATA STRUCTURE TO WHERE THE CURSOR IS
// svg.on("mousemove", function(event){
//     x = d3.pointer(event)[0];
//     y = d3.pointer(event)[1];
//     index = data.length - 1;
//     linesGroup.append("line")
//                 .attr("x1", data[index][0])
//                 .attr("y1", data[index][1])
//                 .attr("x2", x)
//                 .attr("y2", y)
//                 .attr("stroke", "white")
//                 .attr("stroke-width", 5)
//                 .attr("id", "temp")
// });

//THIS RANDOMIZES POINT DATA AND SAVES IT INTO THE RANDDATA ARRAY
function randomize(){
    data.forEach(function(d){
        x = (Math.random() * range * 2 - range) + d[0];
        y = (Math.random() * range * 2 - range) + d[1];
        randData.push([x,y]);
    });
}

//THIS CLEARS ALL LINES AND REDRAWS THE LINES WITH RANDOMIZED POINT DATA EVERY 20ms
function startTimer(){
    timer = d3.timer(function(duration) { 
        timer.stop();
        d3.selectAll("line").remove();
        randomize();
        for(let i = 0; i < randData.length - 1; i++){
            x1 = randData[i][0];
            y1 = randData[i][1];
            x2 = randData[i + 1][0];
            y2 = randData[i + 1][1];
            linesGroup.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr("stroke", "white")
                .attr("stroke-width", 5)
        }
        randData = [];
        startTimer();
    }, 20);  
}

//THIS BEGINS THE SHAKING
startTimer();


//THIS REMOVES AN ELEMENT FROM THE DATA STRUCTURE, or the last line
d3.select("#remove").on("click", function(){
    data.pop();
});

//THIS INCREASES THE SHAKINESS
d3.select("#increment").on("click", function(){
    range += 5;
});

//THIS DECREASES THE SHAKINESS
d3.select("#decrement").on("click", function(){
    if(range > 0){
        range -= 5;
    }
});

//THIS CLEARS THE CANVAS
d3.select("#clear").on("click", function(){
    data = [];
    range = 10; 
});

