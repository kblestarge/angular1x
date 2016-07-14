(function(){
	var app = angular.module('fizzbuzz', [ ]);

	//some services to share data between controllers
	app.factory('AllRules', function(){
	  return [];
	});
	app.factory('CountTo', function(){
	  return {
	  	count : 100
	  };
	});

	app.controller('ResultsController', function(AllRules, CountTo){
		this.allRules = AllRules;
		this.countTo = CountTo;
		this.displayOutput = function(){
			console.log('output!');
			var finalOutput = '';
			for(var i=1; i<=this.countTo.count; i++){
				var nothingToPrint = true;
				for(var j=0; j<this.allRules.length && nothingToPrint; j++){
					if(eval(this.allRules[j].ifConditions.replace(/NUM/g, i))){ // /NUM/g is a regular expression that will replace ALL of the "NUM"s
						nothingToPrint = false;
						//use output
						finalOutput += '<p class="special">'+this.allRules[j].output+'</p>';
					}
				}
				if(nothingToPrint){
					//use i
					finalOutput += '<p>'+i+'</p>';
				}
			}
			document.getElementById('output').innerHTML = finalOutput;
		}

	});

	app.controller('AddRuleController', function(AllRules, CountTo){
		var self = this;

		self.numbers = [1,2,3,4,5,6,7,8,9,10];
		self.countTo = CountTo;
		self.allRules = AllRules;
		self.showNumberBtns = false;
		self.showOperatorBtns = false;
		self.showFinishingBtns = false;

		self.getCurrentRule = function(){
			return self.allRules.length-1;
		};
		
		self.addRule = function(){
			self.allRules.push(new self.NewRule());
			self.showNumberBtns = true;
			self.showNumberBtns = true;
			console.log('allRules: ',self.allRules);
		};

		self.addNumber = function(num){
			self.allRules[self.getCurrentRule()].conditions += num;
			self.showNumberBtns = false;
			self.showOperatorBtns = true;
			// console.log('addNumber');
		};

		self.setOperator = function(operator){
			self.allRules[self.getCurrentRule()].conditions += ' '+operator+' ';
			self.showNumberBtns = true;
			self.showOperatorBtns = false;	
		}

		self.print = function(){
			self.showOperatorBtns = false;
			self.showFinishingBtns = true;
		}

		self.saveRule = function(){
			var ruleContainer = document.getElementById('set-rules');
			var node = document.createElement("LI");
			var textnode = document.createTextNode(self.generateOutput(self.allRules[self.getCurrentRule()]));
			node.appendChild(textnode);
			ruleContainer.appendChild(node);
			self.allRules[self.getCurrentRule()].setIfConditions();
			// console.log('ifConditions: ',self.allRules[self.getCurrentRule()].ifConditions);
			self.showFinishingBtns = false;
		}

		self.generateOutput = function(rule){
			return 'if number is divisible by '+rule.conditions+' then print '+rule.output;
		}

		self.clearRules = function(){
			self.allRules.length = 0;
			document.getElementById('set-rules').innerHTML = '';
		}

		//NewRule Class
		self.NewRule = function(){
			this.conditions = '';
			this.output = '';
			this.ifConditions = '';
			this.setIfConditions = function(){
				var res = this.conditions.split(" ");
				var logicStatement = '';
				for(var i=0; i<res.length; i++){
					if(i%2 == 0){
						//numbers
						logicStatement += 'NUM%'+res[i]+' == 0';
					}else{
						//operator
						if(res[i] == 'and'){
							logicStatement += ' && ';
						}else{ //or
							logicStatement += ' || ';
						}
					}
				}
				this.ifConditions = logicStatement;
			};
		};
	});
})();
