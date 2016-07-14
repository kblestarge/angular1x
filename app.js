(function(){
	var app = angular.module('fizzbuzz', [ ]);
	var info = {
		fizz : 'hi i\'m fizz',
		buzz : 'hi i\'m buzz'
	};

	app.controller('FizzbuzzController', function(){
		this.stuff = info;
		this.input = 100;
		this.getNumber = function(num) {
		    return new Array(num);   
		}
	});

	app.controller('AddRuleController', function(){
		var self = this;

		self.numbers = [1,2,3,4,5,6,7,8,9,10];
		self.allRules = [];
		self.showNumberBtns = false;
		self.showOperatorBtns = false;
		self.showFinishingBtns = false;
		
		self.addRule = function(){
			self.allRules.push(new self.NewRule());
			//self.generateOutput(self.allRules[self.allRules.length-1]);
			//self.allRules[self.allRules.length-1].humanOutput = self.allRules[self.allRules.length-1].output;
			self.showNumberBtns = true;
			self.showNumberBtns = true;
			console.log('allRules: ',self.allRules);
		};

		self.addNumber = function(num){
			self.allRules[self.allRules.length-1].output += num;
			//self.generateOutput(self.allRules[self.allRules.length-1]);
			//self.allRules[self.allRules.length-1].humanOutput = 'if number is divisible by '+self.allRules[self.allRules.length-1].output+' then print ';
			self.showNumberBtns = false;
			self.showOperatorBtns = true;
			// console.log('addNumber');
		};

		self.setOperator = function(operator){
			self.allRules[self.allRules.length-1].output += ' '+operator+' ';
			//self.generateOutput(self.allRules[self.allRules.length-1]);
			self.showNumberBtns = true;
			self.showOperatorBtns = false;	
		}

		self.print = function(){
			self.showOperatorBtns = false;
			self.showFinishingBtns = true;
		}

		self.appendRule = function(){
			var ruleContainer = document.getElementById('set-rules');
			var node = document.createElement("LI");
			//self.allRules[self.allRules.length-1].humanOutput = self.allRules[self.allRules.length-1].output+' then print ';
			var textnode = document.createTextNode(self.generateOutput(self.allRules[self.allRules.length-1]));
			node.appendChild(textnode);
			ruleContainer.appendChild(node);
			self.showFinishingBtns = false;
			//console.log('Logic Statment: ',self.allRules[self.allRules.length-1].displayLogicStatment());
		}

		self.generateOutput = function(rule){
			return 'if number is divisible by '+rule.output+' then print '+rule.word;
		}

		self.displayOutput = function(){
			console.log('output!');
			var finalOutput = '';
			for(var i=1; i<=100; i++){
				var nothingToPrint = true;
				for(var j=0; j<self.allRules.length && nothingToPrint; j++){
					//self.allRules[j].output.;
					if(eval(self.allRules[j].createLogicStatment(i))){
						nothingToPrint = false;
						//use word
						finalOutput += '<p>'+self.allRules[j].word+'</p>';
					}
				}
				if(nothingToPrint){
					//use i
					finalOutput += '<p>'+i+'</p>';
				}
			}
			document.getElementById('output').innerHTML = finalOutput;
		}

		//newRule Class
		self.NewRule = function(){
			this.output = '';
			this.word = '';
			// this.humanOutput = '';
			//this.logicStatment
			this.createLogicStatment = function(incNum){
				var res = this.output.split(" ");
				var logicStatement = '';
				console.log('res: '+res);
				for(var i=0; i<res.length; i++){
					if(i%2 == 0){
						//number
						logicStatement += incNum+'%'+res[i]+' == 0';
					}else{
						//operator
						if(res[i] == 'and'){
							logicStatement += ' && ';
						}else{ //or
							logicStatement += ' || ';
						}
						
					}
				}
				return logicStatement;
				//this.logicStatement = logicStatement;
			}
		};
	});
})();
