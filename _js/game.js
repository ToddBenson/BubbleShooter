var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function($){
  var Game = function(){
	var curBubble;
	var board;
	var numBubbles;
	var MAX_BUBBLES = 70;
	this.init = function(){
	  $(".but_start_game").bind("click",startGame);
	};
	var startGame = function(){
		$(".but_start_game").unbind("click");
		numBubbles = MAX_BUBBLES;
		BubbleShoot.ui.hideDialog();
		curBubble = getNextBubble();
		board = new BubbleShoot.Board();
		BubbleShoot.ui.drawBoard(board);
		$("#game").bind("click",clickGameScreen);
	};
	var getNextBubble = function(){
	        var bubble = BubbleShoot.Bubble.create();
	        bubble.getSprite().addClass("cur_bubble");
	        $("#board").append(bubble.getSprite());
	        BubbleShoot.ui.drawBubblesRemaining(numBubbles);
	        numBubbles--;
	        return bubble;
	};
	var clickGameScreen = function(e){
	    var angle = BubbleShoot.ui.getBubbleAngle(curBubble.getSprite(),e);
	    var duration = 750;
	    var distance = 1000;
	    var distX = Math.sin(angle) * distance;
	    var distY = Math.cos(angle) * distance;
	    var bubbleCoors = BubbleShoot.ui.getBubbleCoords(curBubble.getSprite());
	    var coords = {
	        x : bubbleCoors.left + distX,
	        y : bubbleCoors.top - distY
	    };
	    BubbleShoot.ui.fireBubble(curBubble,coords,duration);
	    curBubble = getNextBubble();
	};
	};
  return Game;
})(jQuery);
