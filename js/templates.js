// templates
var templates = [  {
  filename: 'TYHJÄ (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js/p5.js\"><\/script>\r\n<!--<script language=\"javascript\" src=\"js\/addons\/p5.dom.js\"><\/script>-->\r\n<!--<script language=\"javascript\" src=\"js\/addons\/p5.sound.js\"><\/script>-->\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(windowWidth, windowHeight);\r\n}\r\n\r\nfunction preload() {\r\n\r\n}\r\n\r\nfunction draw() {\r\n\r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 1: Ympyrä (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(windowWidth, windowHeight);\r\n}\r\n\r\nfunction draw() {\r\n  ellipse(width\/2, height\/2, 150, 150);\r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 2: Animoitu ympyrä (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js\/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(windowWidth, windowHeight);\r\n  x = 0;\r\n  y = 0;\r\n}\r\n\r\nfunction draw() {\r\n  background(255,255,255);\r\n  \r\n  stroke(1);\r\n  ellipse(x, y, 150, 150);\r\n  \r\n  x = x + random(-2,3);\r\n  y = y + random(-2,5);\r\n  \r\n  if (x > width) {\r\n    x = 0;\r\n  }\r\n  if (y > height) {\r\n    y = 0;\r\n  }\r\n  \r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 3: Ympyrä ja hiiren koordinaatit (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js\/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(800, 600);\r\n}\r\n\r\nfunction draw() {\r\n  if (mouseIsPressed) {\r\n    fill(0);\r\n  } else {\r\n    fill(255);\r\n  }\r\n  ellipse(mouseX, mouseY, 80, 80);\r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 4: Auto (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js\/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(800, 600);\r\n}\r\n\r\nfunction draw() {\r\n  \/\/ vaalean sininen\r\n  background(131, 204, 255);\r\n  \r\n  \/\/ musta\r\n  color_black = color(0,0,0); \r\n  \/\/ valkoinen\r\n  color_white = color(255,255,255);\r\n  \/\/ punainen\r\n  color_red = color(216,0,0); \r\n  \r\n  \/\/ rengas 1\r\n  fill(color_black);\r\n  ellipse(width\/2 - 200, height\/2, 100, 100);\r\n  fill(color_white);\r\n  ellipse(width\/2 - 200, height\/2, 50, 50);\r\n  \r\n  \/\/ rengas 2\r\n  fill(color_black);\r\n  ellipse(width\/2, height\/2, 100, 100);\r\n  fill(color_white);\r\n  ellipse(width\/2, height\/2, 50, 50);\r\n  \r\n  \/\/ nelio 1\r\n  fill(color_red);  \r\n  noStroke();\r\n  rect(width\/2 - 300, height\/2 -75, 400, 75);\r\n  rect(width\/2 - 200, height\/2 -150, 200, 75);\r\n  fill(color_white);\r\n  rect(width\/2 - 190, height\/2 -140, 180, 65);\r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 5: Kuvien käyttö (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js\/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nfunction setup() {\r\n  createCanvas(600, 400);\r\n  imageMode(CENTER);\r\n}\r\n\r\nvar paakallo1;\r\nvar paakallo2;\r\n\r\nfunction preload() {\r\n  paakallo1 = loadImage(\"assets\/paakallo1.jpg\");\r\n  paakallo2 = loadImage(\"assets\/paakallo2.jpg\");\r\n}\r\n\r\nfunction draw() {\r\n  image(paakallo1, width\/3, height\/2);\r\n  tint(255,255,255,65);\r\n  image(paakallo2, width\/2, height\/2);\r\n}\r\n\r\n<\/script>\r\n<style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
}, {
  filename: 'Esimerkki 6: Näppäimistö ja oliot (p5.js -projekti)',
  filetype: 'text/html',
  autoupdate: true,
  code: '<html>\r\n<head>\r\n<meta charset=\"UTF-8\">\r\n<script language=\"javascript\" type=\"text\/javascript\" src=\"js\/p5.js\"><\/script>\r\n<script language=\"javascript\" type=\"text\/javascript\">\r\n\r\nvar car1, car2; \r\nvar x,y;\r\nvar carId = 1;\r\n\r\nvar Car = function(name) {\r\n    \r\n    this.name = name;\r\n    this.speedLimit = 100;\r\n    this.speed = 0;\r\n \r\n    this.increaseSpeed = function() {\r\n        this.speed = this.speed+1;\r\n        if (this.speed > this.speedLimit) {\r\n         this.speed = this.speedLimit;\r\n        }\r\n    }\r\n    \r\n    this.decreaseSpeed = function() {\r\n        if (this.speed > 0) {\r\n         this.speed = this.speed-1;\r\n        }\r\n    }\r\n    \r\n    this.getName = function() {\r\n      return this.name;\r\n    }\r\n \r\n    this.getCarSpeed = function() {\r\n      return this.speed;\r\n    }\r\n}\r\n\r\nfunction setup() {\r\n  createCanvas(400,400);\r\n  background(255);\r\n  car1 = new Car(\"Ferrari\");\r\n  car2 = new Car(\"Jaguar\");\r\n  x=20;\r\n}\r\n\r\nfunction draw() {\r\n  \r\n  noStroke();\r\n  fill(255);\r\n  rect(20,10,90,20);\r\n  rect(width-160,10,120,20);\r\n  rect(width-160,30,120,20);\r\n  fill(0);\r\n  rect(20,25,1,height-45);\r\n  rect(20,height-20,360,1);\r\n  text(car1.getName() + \" speed: \" + car1.getCarSpeed(),width-160,20);\r\n  text(car2.getName() + \" speed: \" + car2.getCarSpeed(),width-160,40);\r\n    \r\n  text(\"Selected car \"+carId,20,20);\r\n  fill(color(255,0,0));\r\n  if(car1.getCarSpeed()>0) { rect(x,height-(2*car1.getCarSpeed())-20,2,2); }\r\n  fill(color(0,255,84));\r\n  if(car2.getCarSpeed()>0) { rect(x,height-(2*car2.getCarSpeed())-20,2,2); }\r\n  \r\n  if (x>width) { x = 20; background(255); }\r\n  else { x = x+1; }\r\n}\r\n\r\nfunction keyPressed() {\r\n  if( key >= \'1\' && key <= \'2\' ){\r\n    carId = parseInt(key);\r\n  }\r\n  switch(keyCode) {\r\n    case UP_ARROW:\r\n      if (carId==1) { car1.increaseSpeed(); }\r\n      else if (carId==2) { car2.increaseSpeed(); }\r\n      break;\r\n    case DOWN_ARROW:\r\n      if (carId==1) { car1.decreaseSpeed(); }\r\n      else if (carId==2) { car2.decreaseSpeed(); }\r\n      break;\r\n  }\r\n}\r\n\r\n<\/script>\r\n <style> body {padding: 0; margin: 0;} <\/style>\r\n<\/head>\r\n<body><\/body>\r\n<\/html>'
} ];
