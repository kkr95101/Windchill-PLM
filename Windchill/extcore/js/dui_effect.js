
dui.effect = {};
dui.effect.Effect = function() {}
dui.effect.Effect.prototype = {
	el : null,
	running : false,
	executer : null,
	callback : function() {},
	onChange : function() {},
	stop : function() {
		if (this.executer) {
			this.executer.stop();
			this.executer = null;
			this.running = false;
		}
	},
	run : function(elId) {
		this.el = D$(elId);
		this.runEffect();
		this.running = true;
	},
	isRunning : function () {
		return this.running;
	}
};

dui.effect.UniformData = {};
dui.effect.UniformData.getData = function (initValueA, lastValueA, initValueB, lastValueB, amount) {
	var valuesA = [initValueA];
	var distanceA = Math.abs(lastValueA-initValueA);
	var directionA = (lastValueA > initValueA) ? 1 : -1;
	var valuesB = [initValueB];
	var distanceB = Math.abs(lastValueB-initValueB);
	var directionB = (lastValueB > initValueB) ? 1 : -1;
	var valueA;
	var cnt = 0;

	while(true) {
		valueA = valuesA[cnt] + amount*directionA;
		if ( (directionA>0 && valueA>= lastValueA) ||
					(directionA<0 && valueA<= lastValueA) ) break;
		cnt++;
		valuesA[cnt] = valueA;
		valuesB[cnt] = Math.round(initValueB + Math.abs(distanceB * ((valueA-initValueA)/distanceA)) * directionB);
	}
	valuesA[cnt+1] = lastValueA;
	valuesB[cnt+1] = lastValueB;

	return {A:valuesA, B:valuesB};
}

dui.effect.AccelerationData = {};
dui.effect.AccelerationData.getData = function (initValueA, lastValueA, initValueB, lastValueB, acceleration) {
	//alert(initValueA+","+lastValueA+","+initValueB+","+lastValueB);
	if (acceleration > 0) {
		var temp = initValueA;
		initValueA = lastValueA;lastValueA = temp;
		temp = initValueB;
		initValueB = lastValueB;lastValueB = temp;
	}
	var valuesA = [initValueA];
	var distanceA = Math.abs(lastValueA-initValueA);
	var directionA = (lastValueA > initValueA) ? 1 : -1;
	var isDoubleData = (arguments.length > 3) ? true : false;
	if (isDoubleData) {
		var valuesB = [initValueB];
		var distanceB = Math.abs(lastValueB-initValueB);
		var directionB = (lastValueB > initValueB) ? 1 : -1;
	}
	var absAcceleration = Math.abs(acceleration);
	var valueA;
	var cnt = 0;
	var amount;
	while(true) {
		amount = Math.round((lastValueA-valuesA[cnt])*absAcceleration);
		if (amount == 0) amount = (directionA > 0) ? 1 : -1;
		valueA = valuesA[cnt] + amount;

		if ( (directionA>0 && valueA>= lastValueA) ||
					(directionA<0 && valueA<= lastValueA) ) break;

		cnt++;
		valuesA[cnt] = valueA;
		if (isDoubleData) valuesB[cnt] = Math.round(initValueB + Math.abs(distanceB * ((valueA-initValueA)/distanceA)) * directionB);
	}
	valuesA[cnt+1] = lastValueA;

	if (isDoubleData) {
		valuesB[cnt+1] = lastValueB;
		return {A : (acceleration > 0) ? valuesA.reverse() : valuesA, B : (acceleration > 0) ? valuesB.reverse() : valuesB};
	} else return (acceleration > 0) ? valuesA.reverse() : valuesA;
}

dui.effect.Move = Class.create();
dui.effect.Move.prototype = {
	initX : null,
	initY : null,
	destX : null,
	destY : null,
	interval : 10,
	pixel : 10,
	arrayX : new Array(),
	arrayY : new Array(),
	eventCnt : 1,
	eventNum : 0,
	acceleration : 0,
	executer : null,
	
	initialize : function (destX, destY, interval, pixel) {
		this.destX = destX;
		this.destY = destY;
		this.interval = interval ? interval : this.interval;
		this.pixel = pixel ? pixel : this.pixel;	
	},

	runEffect : function () {
		if (isNaN(this.destX)) {alert("dui.effect.Move: x값을 숫자로 입력하세요-"+this.destX);return false;}
		if (isNaN(this.destY)) {alert("dui.effect.Move: y값을 숫자로 입력하세요-"+this.destY);return false;}
		if (isNaN(this.interval)) {alert("dui.effect.Move: interval을 숫자로 입력하세요-"+this.interval);return false;}
		if (this.pixel && isNaN(this.pixel)) {alert("dui.effect.Move: pixel을 숫자로 입력하세요-"+this.pixel);return false;}

		
		if (this.initX == null) {
			var styleValue = parseInt(this.el.getStyle("left"));
			this.initX = isNaN(styleValue) ? 	this.el.offsetLeft : styleValue;
		} 
		if (this.initY == null) {
			var styleValue = parseInt(this.el.getStyle("top"));
			this.initY = isNaN(styleValue) ? 	this.el.offsetTop : styleValue;
		}

		var distanceH = Math.abs(this.destX-this.initX);
		var distanceV = Math.abs(this.destY-this.initY);
		var initValueA, initValueB, lastValueA, lastValueB;
		var XisMajor = distanceH >= distanceV;

		if (XisMajor)  {
			initValueA = this.initX; initValueB = this.initY
			lastValueA = this.destX; lastValueB = this.destY;
		} else {
			initValueA = this.initY; initValueB = this.initX;
			lastValueA = this.destY;	lastValueB = this.destX;
		}

		//alert(initValueA+","+lastValueA+","+initValueB+","+lastValueB)
		if (this.acceleration) 
			var values = dui.effect.AccelerationData.getData(initValueA, lastValueA, initValueB, lastValueB, this.acceleration);
		else
			var values = dui.effect.UniformData.getData(initValueA, lastValueA, initValueB, lastValueB, this.pixel);

		this.arrayX = XisMajor ? values.A : values.B;
		this.arrayY = XisMajor ? values.B : values.A;
		this.eventNum = this.arrayX.length-1;
		this.executer = new PeriodicalExecuter(this.move.bind(this), this.interval/1000); 
	},
	
	move : function(pe) {
		if (this.eventCnt > this.eventNum) {
			this.stop();
			this.callback();
		} else {
			var oldPosition = {left:parseInt(this.el.style.left), top:parseInt(this.el.style.top)};
			if (isNaN(oldPosition.left)) oldPosition.left = this.initX;
			if (isNaN(oldPosition.top)) oldPosition.top = this.initY;

			this.el.style.left = this.arrayX[this.eventCnt]+"px";
			this.el.style.top = this.arrayY[this.eventCnt]+"px";
			
			this.onChange(this.arrayX[this.eventCnt] - oldPosition.left, 
			              this.arrayY[this.eventCnt] - oldPosition.top);
		}
		this.eventCnt++;
	}
};
Object.extend(dui.effect.Move.prototype, dui.effect.Effect.prototype);


/*
 * Scale
 */
dui.effect.Scale = Class.create();
dui.effect.Scale.prototype = {
	initWidth : null,
	initHeight : null,
	amountW : null,
	amountH : null,
	interval : 10,
	pixel : 10,
	arrayW : new Array(),
	arrayH : new Array(),
	eventCnt : 1,
	eventNum : 0,
	nodisplay : false,
	acceleration : 0,

	initialize : function (amountW, amountH, interval, pixel) {
		this.amountW = amountW;
		this.amountH = amountH;
		this.interval = interval ? interval : this.interval;
		this.pixel = pixel ? pixel : this.pixel;	

	},
	
	runEffect : function() {
		if (isNaN(this.amountW)) {alert("dui.effect.Scale: width를 숫자로 입력하세요-"+this.amountW);return false;}
		if (isNaN(this.amountH)) {alert("dui.effect.Scale: height를 숫자로 입력하세요-"+this.amountH);return false;}
		if (isNaN(this.interval)) {alert("dui.effect.Scale: interval을 숫자로 입력하세요-"+this.interval);return false;}
		if (this.pixel && isNaN(this.pixel)) {alert("dui.effect.Scale: pixel을 숫자로 입력하세요-"+this.pixel);return false;}
		var dimensions = this.el.getContentDimensions();
		
		if (this.initWidth == null) {
			var styleValue = parseInt(this.el.style.width);
			this.initWidth = isNaN(styleValue) ? 	dimensions.width : styleValue;
		} 
		if (this.initHeight == null) {
			var styleValue = parseInt(this.el.style.height);
			this.initHeight = isNaN(styleValue) ? 	dimensions.height : styleValue;
		}
		
		var initValueA, initValueB, lastValueA, lastValueB;
		var widthIsMajor = Math.abs(this.amountW) >= Math.abs(this.amountH);

		if (widthIsMajor)  {
			initValueA = this.initWidth;
			initValueB = this.initHeight
			lastValueA = this.initWidth+this.amountW;
			lastValueB = this.initHeight+this.amountH;
		} else {
			initValueA = this.initHeight
			initValueB = this.initWidth;
			lastValueA = this.initHeight+this.amountH;
			lastValueB = this.initWidth+this.amountW;
		}
		if (lastValueA < 0) lastValueA = 0;
		if (lastValueB < 0) lastValueB = 0;

		//alert(initValueA+","+lastValueA+","+initValueB+","+lastValueB)
		if (this.acceleration) 
			var values = dui.effect.AccelerationData.getData(initValueA, lastValueA, initValueB, lastValueB, this.acceleration);
		else 
			var values = dui.effect.UniformData.getData(initValueA, lastValueA, initValueB, lastValueB, this.pixel);
			
		this.arrayW = widthIsMajor ? values.A : values.B;
		this.arrayH = widthIsMajor ? values.B : values.A;

		this.eventNum = this.arrayW.length-1;
		this.el.style.overflow = "hidden";
		this.executer = new PeriodicalExecuter(this.change.bind(this), this.interval/1000); 
	},

	change : function(pe) {
		if (this.eventCnt > this.eventNum) {
			this.stop();
			this.callback();
		} else {
			var oldRectangle = {width:parseInt(this.el.style.width), height:parseInt(this.el.style.height)};
			if (isNaN(oldRectangle.width)) oldRectangle.width = this.initWidth;
			if (isNaN(oldRectangle.height)) oldRectangle.height = this.initHeight;

			if (this.arrayW[this.eventCnt] <= 0 || this.arrayH[this.eventCnt] <= 0) {
				if (this.nodisplay) this.el.style.display = "none";
				this.eventCnt = this.eventNum+1; // stop effect
				return;
			}
			if (this.nodisplay && this.el.getStyle("display") == "none") this.el.style.display = "block";
			
			// width나 height가 0이면 style을 건드리지 않도록 함
			if (this.amountW != 0) this.el.style.width = this.arrayW[this.eventCnt]+"px";
			if (this.amountH != 0) this.el.style.height = this.arrayH[this.eventCnt]+"px";

			this.onChange(this.arrayW[this.eventCnt] - oldRectangle.width, 
			              this.arrayH[this.eventCnt] - oldRectangle.height);
		}
		this.eventCnt++;
	}
};
Object.extend(dui.effect.Scale.prototype, dui.effect.Effect.prototype);

// 하이퍼링크 테두리 없애기

function bluring(){
if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG") document.body.focus();
}
document.onfocusin=bluring;
