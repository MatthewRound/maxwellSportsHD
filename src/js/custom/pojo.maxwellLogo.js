var maxwellLogo = 
{
	pen:undefined,
	canvasSize:{w:0, h:0},
	x:undefined,
	y:undefined,
	currentBox:{w:0, h:0},
	xDirection:'right',
	yDirection:'down',
	increments: {x:1, y:1},
	init:function() 
	{
		var c = document.getElementById("canvas");
		c.style.border = "1px solid black";
		this.pen = c.getContext("2d");
		this.canvasSize.w = c.width;
		this.canvasSize.h = c.height;
		this.loop();
	},
	clear : function()
	{
		maxwellLogo.pen.clearRect(0,0,maxwellLogo.canvasSize.w, maxwellLogo.canvasSize.h);
	},
	loop: function()
	{
		this.x = 1;
		this.y = 1;
		setInterval(function(){
			maxwellLogo.clear();
			maxwellLogo.drawLogo(maxwellLogo.x, maxwellLogo.y);
			var currentEndX = maxwellLogo.x + maxwellLogo.currentBox.w;
			if (maxwellLogo.xDirection == 'right') {
				if (currentEndX >= maxwellLogo.canvasSize.w) {
					maxwellLogo.xDirection = 'left';
				}
				maxwellLogo.x += maxwellLogo.increments.x;
			} else {
				if (maxwellLogo.x == 0) {
					maxwellLogo.xDirection = 'right';
				}
				maxwellLogo.x-= maxwellLogo.increments.x;
			}
			var currentEndY = maxwellLogo.y + maxwellLogo.currentBox.h;
			if (maxwellLogo.yDirection == 'down') {
				if (currentEndY >= maxwellLogo.canvasSize.h) {
					maxwellLogo.yDirection = 'up';
				}
				maxwellLogo.y+=maxwellLogo.increments.y;
			} else {
				if (maxwellLogo.y == 0) {
					maxwellLogo.yDirection = 'down';
				}
				maxwellLogo.y-=maxwellLogo.increments.y;
			}
			
		}, 50)
	},
	drawLogo:function(x, y) 
	{
		//draw background box blue
		var width = (this.canvasSize.w / 10) *4;
		var width = 200;
		var height = 55;
		this.pen.moveTo(x, y);
		this.pen.fillStyle="#0000ff";
		this.pen.fillRect(x, y, width, height);
		this.pen.fillStyle="#ffffff";
		this.pen.font="30px Verdana";
		this.pen.fillText('MAXWELL', x+(width/10), y+(height /1.5));
		var redx = x + width;
		var redy = y;
		this.pen.moveTo(redx, redy);
		this.pen.fillStyle="#ff0000";
		this.pen.fillRect(redx, redy, width, height);
		this.pen.fillStyle="#ffffff";
		this.pen.fillText('SPORTS HD', redx+(width/10), redy+(height /1.5));
		this.currentBox.w = width + (this.canvasSize.w /10) *4;
		this.currentBox.h = height;
	}
};
maxwellLogo.init();
