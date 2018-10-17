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

var circles = [
  {
    x: 50,
    y: 100,
    r: 10,
    vx: 2,
    vy: 9,
    color: "ffa70e"
  },
  {
    x: 100,
    y: 60,
    r: 40,
    vx: 4,
    vy: 11,
    color: "66ad6d"
  },
  {
    x: 120,
    y: 70,
    r: 20,
    vx: 10,
    vy: 4,
    color: "80d2cb"
  },
  {
    x: 90,
    y: 150,
    r: 35,
    vx: 6,
    vy: 9,
    color: "343ea3"
  },
  {
    x: 100,
    y: 50,
    r: 15,
    vx: 3,
    vy: 2,
    color: "5982f7"
  },
  {
    x: 100,
    y: 70,
    r: 15,
    vx: 7,
    vy: 2,
    color: "b57cd2"
  },
  {
    x: 100,
    y: 120,
    r: 25,
    vx: 5,
    vy: 1,
    color: "ff646d"
  },
  {
    x: 100,
    y: 50,
    r: 25,
    vx: 1,
    vy: 5,
    color: "f1b5ec"
	},
	{
    x: 100,
    y: 50,
    r: 20,
    vx: 5,
    vy: 2,
    color: "8387cc"
	},
	{
		x: 30,
		y: 130,
		r: 15,
		vx: 3,
		vy: 7,
		color: "bf5c8f"
	}
];

function animate() {
  //draw the container
  c.fillStyle = "#FFFFFF";
  c.fillRect(container.x, container.y, container.width, container.height);

  //loop throughj the circles array
  for (var i = 0; i < circles.length; i++) {
    //draw the circles
    c.fillStyle = "#" + circles[i].color;
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
