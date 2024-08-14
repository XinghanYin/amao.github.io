/* 
 * This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 */

var canvas = document.createElement("canvas"), //创建画布对象
	context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.cssText = "position: fixed; top: 0; left: 0; z-index: -100; background-color: #000;"; //设置画布样式
var W = window.innerWidth,
	H = window.innerHeight; //获取浏览器屏幕的宽度和高度
canvas.width = W;
canvas.height = H; //设置canvas的宽度和高度

var count = 1000, //光点总数
	rate = 120, //移动速率
	r = new Array(count),
	g = new Array(count),
	b = new Array(count),
	x = new Array(count),
	y = new Array(count),
	radius = new Array(count),
	phase = new Array(count),
	opacity = new Array(count);

for (var i = 0; i < count; i++) {
	r[i] = 0;
	g[i] = 40;
	b[i] = 0;
	x[i] = Math.random() * W;
	y[i] = Math.random() * H;
	radius[i] = Math.random() * 3 + 1; //半径随机大小
	phase[i] = 0;
	opacity[i] = 0;
} //初始化

function draw() {
	context.clearRect(0, 0, W, H);
	for (var i = 0; i < count; i++) {
		if (y[i] > 0 && y[i] < H && x[i] > 0 && x[i] < W) {
			x[i] += (x[i] - W / 2) / rate;
			y[i] += (y[i] - H / 2) / rate;
			r[i] = Math.floor(0.55 * phase[i]);
			b[i] = Math.floor(255 - 0.55 * phase[i]);
			phase[i]++;
			opacity[i] = phase[i] / 200;
			if (opacity[i] > 1) opacity[i] = 1;
		}
		else {
			r[i] = 0;
			g[i] = 40;
			b[i] = 255;
			theta = Math.random() * 2 * Math.PI;
			x[i] = W / 2 + 75 * Math.cos(theta) * Math.random();
			y[i] = H / 2 + 75 * Math.sin(theta) * Math.random();
			radius[i] = Math.random() * 2 + 1;
			phase[i] = 0;
			opacity[i] = 0;
		}
		context.fillStyle = `rgba(${r[i]},${g[i]},${b[i]},${opacity[i]})`; //给光点添加样式
		context.beginPath();
		context.arc(x[i], y[i], radius[i], 0, 2 * Math.PI);
		context.fill();
	}
	setTimeout(draw, 20);
};
draw(); //绘画的函数

window.onresize = function() {
	W = window.innerWidth;
	H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
} //屏幕大小改变时对应调整宽高
