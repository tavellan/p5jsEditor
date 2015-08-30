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
} ];
