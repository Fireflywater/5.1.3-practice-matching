import $ from 'jquery';

export function Card(id, img, pair) {
	this.id = id; // STRING
	this.img = img; // STRING
	this.pair = pair; // STRING?
	this.faceUp = false;
}

Card.prototype.findNumWords = function() {
	
};

export function Field() {
	this.activeCards = [];
	this.selectCards = [];
	this.turn = 0;
	this.matches = 0;
	this.maxPairs = 52;
}

Field.prototype.assembleDeck = function (numPair) {
	this.activeCards = [];
	this.selectCards = [];
	this.turn = 0;
	this.matches = 0;
	if (numPair > this.maxPairs) {numPair = 52;}
	for (var i = 0; i < numPair; i++) {
		this.activeCards.push(new Card("a"+i,"card"+i+".png",i));
		this.activeCards.push(new Card("b"+i,"card"+i+".png",i));
	}
	this.shuffle();
	console.log(this);
};

Field.prototype.findCardFromId = function(id, type) {
	for (var i = 0; i < this.activeCards.length; i++) {
		if (this.activeCards[i].id === id) {
			if (type === "obj") {return this.activeCards[i];}
			else if (type === "int") {return i;}
		}
	}
};

Field.prototype.shuffle = function() {
	var activeTemp = [];
	while (this.activeCards.length > 0) {
		var thisCardNum = Math.floor(Math.random() * this.activeCards.length);
		activeTemp.push(this.activeCards[thisCardNum]);
		this.activeCards.splice(thisCardNum, 1);
	}
	this.activeCards = activeTemp;
};

Field.prototype.victory = function() {
	alert("You win! \n Turns: " + this.turn + "\n Pairs: " + this.matches);
}

Field.prototype.refresh = function() {
	$("#gameBoard").empty();
	$("#turnDisplay").text(this.turn);
	$("#scoreDisplay").text(this.matches);
	for (var i = 0; i< this.activeCards.length; i++) {
		var newCard = $("#templateCard").clone();
		newCard.attr("id",this.activeCards[i].id);
		newCard.attr("title","DEBUG: " + this.activeCards[i].id);
		newCard.find("img").attr("src","./IMG/cardBack.png");
		newCard.find("img").attr("alt","< ??? >");
		$("#gameBoard").append(newCard);
		
		
		var fieldPassthrough = this;
		newCard.on("click", function() {
			var clickedCard = fieldPassthrough.findCardFromId($(this).attr("id"),"obj");
			console.log(clickedCard.id);
			if (fieldPassthrough.selectCards.length < 2) {
				if (clickedCard.faceUp === false) {
					$("#" + clickedCard.id + " img").attr("src","./PNG/" + clickedCard.img);
					$("#" + clickedCard.id + " img").attr("alt","< " + clickedCard.id + " >");
					clickedCard.faceUp = true;
					fieldPassthrough.selectCards.push(clickedCard.id);
				}
			} else {
				var matchMade = false;
				for (var i = 0; i < fieldPassthrough.selectCards.length; i++) {
					var thisCardInIFor = fieldPassthrough.findCardFromId(fieldPassthrough.selectCards[i],"obj");
					$("#" + thisCardInIFor.id + " img").attr("src","./IMG/cardBack.png");
					$("#" + thisCardInIFor.id + " img").attr("alt","< ??? >");
					thisCardInIFor.faceUp = false;
					for (var j = 0; j < fieldPassthrough.selectCards.length; j++) {
						var thisCardInJFor = fieldPassthrough.findCardFromId(fieldPassthrough.selectCards[j],"obj");
						if (thisCardInIFor != thisCardInJFor && thisCardInIFor.pair === thisCardInJFor.pair) {
							matchMade = true;
							break;
						}
					}
				}
				if (matchMade === true) {
					for (var k = 0; k < fieldPassthrough.selectCards.length; k++) {
						var thisCardNum = fieldPassthrough.findCardFromId(fieldPassthrough.selectCards[k],"int");
						fieldPassthrough.activeCards.splice(thisCardNum,1);
					}
					fieldPassthrough.matches++;
					//alert("Match! Score: " + fieldPassthrough.matches);
				}
				fieldPassthrough.selectCards = [];
				fieldPassthrough.refresh(); 
			}
			fieldPassthrough.turn++;
			if (fieldPassthrough.activeCards.length <= 0) {
				fieldPassthrough.victory();
			}
		});
		
		
	}
};