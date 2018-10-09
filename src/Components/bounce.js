// export default class bounce
var canvas = document.getElementById("my_canvas");
var c = canvas.getContext("2d");

//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 1100,
  height: 700
};
//create the array of circles that will be animated
// let size= x: 150,
// y: 80,
// r: 20,
// vx: 15,
// vy: 8,
let colors = [
  "ffa70e",
  "66ad6d",
  "80d2cb",
  "343ea3",
  "b57cd2",
  "bf5c8f",
  "ff646d",
  "fff600",
  "6affad",
  "80d2cb",
  "5982f7",
  "7069ca",
  "f1b5ec",
  "e1b198",
  "8387cc"
];

var circles = [
  {
    x: 50,
    y: 100,
    r: 10,
    vx: 20,
    vy: 9,
    color: 125
  },
  {
    x: 100,
    y: 60,
    r: 40,
    vx: 15,
    vy: 8,
    color: 205
  },
  {
    x: 120,
    y: 70,
    r: 20,
    vx: 15,
    vy: 8,
    color: 205
  },
  {
    x: 90,
    y: 150,
    r: 35,
    vx: 5,
    vy: 15,
    color: 25
  },
  {
    x: 100,
    y: 50,
    r: 15,
    vx: 8,
    vy: 10,
    color: 100
  },
  {
    x: 100,
    y: 70,
    r: 15,
    vx: 8,
    vy: 10,
    color: 100
  },
  {
    x: 100,
    y: 120,
    r: 25,
    vx: 8,
    vy: 10,
    color: 100
  },
  {
    x: 100,
    y: 50,
    r: 25,
    vx: 8,
    vy: 10,
    color: 100
  }
];

function animate() {
  //draw the container
  c.fillStyle = "#F5F5F5";
  c.fillRect(container.x, container.y, container.width, container.height);

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    //draw the circles
    c.fillStyle = "hsl(" + circles[i].color++ + ", 100%, 50%)";
    c.beginPath();
    c.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, true);
    c.fill();

    //time to animate our circles ladies and gentlemen.
    if (
      circles[i].x - circles[i].r + circles[i].vx < container.x ||
      circles[i].x + circles[i].r + circles[i].vx >
        container.x + container.width
    ) {
      circles[i].vx = -circles[i].vx;
    }

    if (
      circles[i].y + circles[i].r + circles[i].vy >
        container.y + container.height ||
      circles[i].y - circles[i].r + circles[i].vy < container.y
    ) {
      circles[i].vy = -circles[i].vy;
    }

    circles[i].x += circles[i].vx;
    circles[i].y += circles[i].vy;
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// export default bounce
