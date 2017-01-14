(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class RatingCalculator {
    constructor(quiz) {
        this.quiz = quiz;
    }

    getCategories() {
        return {
            appearance: 0,
            environment: 0,
            finance: 0,
            health: 0,
            love: 0,
            mind: 0,
            social: 0
        };
    }

    sum() {
        var categories = this.getCategories();
        var quiz = this.quiz;

        var reversedAnswerValues = [6,5,4,3,2,1,0];

        for (var key in quiz) {
          if (quiz.hasOwnProperty(key)) {

              var cats = quiz[key].cats;
              var sentiment = quiz[key].sentiment;
              var answer = (typeof quiz[key].answer === 'undefined') ? 3 : quiz[key].answer;

              cats.forEach(function(cat, index){
                  var name = cat.name;
                  var weight = cat.weight;
                  if (sentiment === 'negative') {
                      categories[name] += (reversedAnswerValues[answer] * weight);
                  } else {
                      categories[name] += (answer * weight);
                  }
              });

          }
        }

        return categories;

    }
}

module.exports = RatingCalculator;

},{}],2:[function(require,module,exports){
class CategoryRating {

    constructor(vals) {
        this.vals = vals;
        this._methods = this.methods();
        this.descriptions = this._methods.getDescriptions();
    }

    render(category) {
        return this.template(category);
    }

    template(category) {

        var template = `<h3>${category.capitalize()}</h3>
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="rating ${this._methods.getColorClass(this.vals[category])}" data-value="${this.vals[category]}"></div>
                            </div>
                            <div class="col-8">
                                <div class="progress">
                                  <div class="progress-bar ${this._methods.getColorClass(this.vals[category])}" role="progressbar" style="width: ${this.vals[category] * 10}%" aria-valuenow="${this.vals[category] * 10}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>`;

        if (category !== 'overall') {
            template += `<div class="card">
                              <div class="card-block">
                                ${this.descriptions[category]}
                              </div>
                         </div>`;
        }

        if (category !== 'social') {
            template += `<hr>`;
        }

        return template;
    }

    events() {
        //
    }

    methods() {
        return {
            getColorClass: function(val) {
                return `color--${Math.floor(val/2)}`;
            },
            getDescriptions: function() {
                return {
                    overall: "",
                    appearance: "Appearance refers to your physical external self, or looks, taking into account your own and others' perceptions. The higher the rating, the more attractive you probably are and the more you look after yourself.",
                    environment: "Environment refers to your surrounding area. The higher the rating, the more pleasant your home, town, or country is to live in.",
                    finance: "Finance refers to your wealth/income. The higher the rating, the easier it is for you to afford the things you want or need.",
                    health: "Health refers to your general physical well-being. The higher the rating, the less prone you are to illness, disease and the less likely it is you have a disability.",
                    love: "Love refers to romantic and familial love. The higher the rating, the more loved you feel by family, a partner, or a companion.",
                    mind: "Mind refers to your general mental well-being. The higher the rating, the less likely it is you have a mental illness or often feel depressed, anxious, stressed, etc.",
                    social: "Social refers to your sense of belonging to social groups and friends. The higher the rating, the more enjoyable time is with friends or at exciting social events."
                }
            }
        }
    }
}

module.exports = CategoryRating;

},{}],3:[function(require,module,exports){
/* QUIZ JSON */

var quiz = require('../quiz.js');
var quizCache = $.extend({}, quiz);

/* CLASSES */

var RatingCalculator = require('../classes/RatingCalculator.js');
var ResultModal = require('../components/ResultModal.js');

class Quiz {
    constructor(app) {
        this.app = app;
        this._methods = this.methods();
        this.counter = 1;
        this.page = 1;
        this.render();
        this.events();
    }

    render() {
        for (var key in quiz) {
          if (quiz.hasOwnProperty(key)) {
              if (this.counter % (15 * this.page + 1) !== 0) {
                  $('#quiz .container').append(this.template(key, quiz[key].q));
                  if (this.page === 1) {
                      $('.question').removeClass('highlight-anim');
                  }
                  if (this.counter === 60) {
                      $('#quiz .container').append('<button id="quiz-finish" class="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#resultsModal">Get results!</button>');
                  }
              } else {
                  $('#quiz .container').append('<button id="quiz-continue" class="btn btn-outline-primary btn-lg">Continue</button>');
                  return;
              }
              this.counter++;
              delete quiz[key];
          }
        }
    }

    template(id, title) {
        return `<div class="question highlight-anim" data-question-id="${id}">
                    <h3><small>${id}.</small> ${title}</h3>
                    <div class="d-flex flex-circles justify-content-center align-items-center">
                          <div class="hidden-xs-down">Agree</div>
                          <div class="circle --green" tabindex="0" aria-label="Strongly agree" data-value="6"></div>
                          <div class="circle --green" tabindex="0" aria-label="Mostly agree" data-value="5"></div>
                          <div class="circle --green" tabindex="0" aria-label="Slightly agree" data-value="4"></div>
                          <div class="circle" tabindex="0" aria-label="Neutral" data-value="3"></div>
                          <div class="circle --red" tabindex="0" aria-label="Slightly disagree" data-value="2"></div>
                          <div class="circle --red" tabindex="0" aria-label="Mostly disagree" data-value="1"></div>
                          <div class="circle --red" tabindex="0" aria-label="Strongly disagree" data-value="0"></div>
                          <div class="hidden-xs-down">Disagree</div>
                    </div>
                </div>`;
    }

    events() {
        var quiz = this;
        $(this.app).on('click', '.circle', function(){ quiz._methods.selectAnswer(this); });
        $(this.app).on('click', '#quiz-continue', quiz._methods.continue);
        $(this.app).on('click', '#quiz-finish', quiz._methods.finish);
    }

    methods() {
        return {
            selectAnswer: function(self) {
                $(self).siblings().removeAttr('style').removeClass('active');
                var color = $(self).css('border-top-color');
                $(self).css('background-color', color).addClass('active');
            },

            continue: function() {
                $('#quiz-continue').remove();
                this.page++;
                this.render();
            }.bind(this),

            finish: function() {
                $('.circle.active').each(function(){
                    var id = $(this).closest('.question').data('question-id');
                    quizCache[id].answer = $(this).data('value');
                });
                var calc = new RatingCalculator(quizCache);
                var sum = calc.sum();
                this._methods.displayResults(sum);
            }.bind(this),

            displayResults: function(sum) {
                var modal = new ResultModal(this.app, sum);
                modal.render(sum);
            }.bind(this)
        };
    }
}

module.exports = Quiz;

},{"../classes/RatingCalculator.js":1,"../components/ResultModal.js":4,"../quiz.js":7}],4:[function(require,module,exports){
/* COMPONENTS */

var CategoryRating = require('../components/CategoryRating.js');

class ResultModal {
    constructor(app, sum) {
        this.app = app;
        this.sum = sum;
    }

    render() {
        $('#resultsModal').remove();
        $(this.app).append(this.template());

        var vals = this.categoryValues();
        var categoryRating = new CategoryRating(vals);

        for (var category in vals) {
              if (vals.hasOwnProperty(category)) {
                  $('#resultsModal').find('.modal-body').append(categoryRating.render(category));
              }
        }
    }

    categoryValues() {
        var sum = this.sum;
        return {
            overall: Math.round(100 * (sum.appearance + sum.environment + sum.finance + sum.health + sum.love + sum.mind + sum.social) / 400.5 ) / 10,
            appearance: Math.round(100 * sum.appearance / 42) / 10,
            environment: Math.round(100 * sum.environment / 60) / 10,
            finance: Math.round(100 * sum.finance / 45) / 10,
            health: Math.round(100 * sum.health / 54) / 10,
            love: Math.round(100 * sum.love / 48) / 10,
            mind: Math.round(100 * sum.mind / 103.5) / 10,
            social: Math.round(100 * sum.social / 48) / 10
        };
    }

    template() {
        var sum = this.sum;
        var vals = this.categoryValues();
        return `<div class="modal fade" id="resultsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Your results</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h2>Your life rating is...</h2>
                      </div>
                    </div>
                  </div>
                </div>`;
    }

    events() {
        //
    }

    methods() {
        //
    }
}

module.exports = ResultModal;

},{"../components/CategoryRating.js":2}],5:[function(require,module,exports){
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

},{}],6:[function(require,module,exports){
$(function(){

    /* HELPERS */

    require('./helpers.js');

    /* COMPONENTS */

    var Quiz = require('./components/Quiz.js');

    /* ------ APP ------ */

    class App {
        constructor(element) {
            this.app = element;
            this.mountComponents();
        }

        mountComponents() {
            new Quiz(this.app);
        }
    }

    new App('#app');

});

},{"./components/Quiz.js":3,"./helpers.js":5}],7:[function(require,module,exports){
var quiz = {
    1: {
        q: "I consider myself physically attractive.",
        cats: [{
            name: 'appearance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    2: {
        q: "I often get ill.",
        cats: [{
            name: 'health',
            weight: 1
        }],
        sentiment: 'negative'
    },
    3: {
        q: "I am well-off financially.",
        cats: [{
            name: 'finance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    4: {
        q: "I have a strong relationship with my parents.",
        cats: [{
            name: 'love',
            weight: 1
        }, {
            name: 'mind',
            weight: 0.25
        }],
        sentiment: 'positive'
    },
    5: {
        q: "I generate my own income.",
        cats: [{
            name: 'finance',
            weight: 1
        }],
        sentiment: 'positive'
    },
    6: {
        q: "I often have depressive or suicidal thoughts.",
        cats: [{
            name: 'mind',
            weight: 1
        }],
        sentiment: 'negative'
    },
    7: {
        q: "I have a diagnosed mental illness and I find it debilitating.",
        cats: [{
            name: 'mind',
            weight: 1
        }, {
            name: 'health',
            weight: 0.5
        }],
        sentiment: 'negative'
    },
    8: {
        q: "I have a physical disability and I find it debilitating.",
        cats: [{
            name: 'health',
            weight: 1
        }, {
            name: 'mind',
            weight: 0.5
        }],
        sentiment: 'negative'
    },
    9: {
        q: "I live in a country with freedom of speech.",
        cats: [{
            name: 'environment',
            weight: 1
        }],
        sentiment: 'positive'
    },
    10: {
        q: "I live in an area mostly free of crime.",
        cats: [{
            name: 'environment',
            weight: 1
        }],
        sentiment: 'positive'
    },
    11: {
        q: "I have plenty of free time to pursue my hobbies and passions.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    12: {
        q: "I have a romantic partner who I'm deeply in love with.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    13: {
        q: "I have a companion/pet who I love to spend time with.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    14: {
        q: "I often go out with friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    15: {
        q: "I often look in the mirror and like what I see.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "positive"
    },
    16: {
        q: "I often worry if I can afford to pay my bills.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "negative"
    },
    17: {
        q: "I generally feel loved by those around me.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    18: {
        q: "Most of my close family is still alive.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    19: {
        q: "I have a lot of free money to spend each week.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    20: {
        q: "My parents were very supportive when I was growing up.",
        cats: [{
            name: "love",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    21: {
        q: "I went to a good school.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "social",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    22: {
        q: "I got good grades in school.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    23: {
        q: "I'm generally pessimistic about things.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    24: {
        q: "People rarely want to hang out with me.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    25: {
        q: "I'm not addicted to abusive drugs.",
        cats: [{
            name: "health",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    26: {
        q: "My day-to-day life is mundane without anything interesting happening.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "negative"
    },
    27: {
        q: "I have a large social circle of friends who I like.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    28: {
        q: "I find it easy to get consensual sex.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    29: {
        q: "I find it difficult to make new friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    30: {
        q: "Finding romantic partners comes easily to me.",
        cats: [{
            name: "love",
            weight: 1
        }],
        sentiment: "positive"
    },
    31: {
        q: "I'm free from physical pain.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    32: {
        q: "There's plenty of job and education opportunities where I live.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    33: {
        q: "The area where I live has beautiful scenery with no litter.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    34: {
        q: "Other people often tell me how good I look.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "positive"
    },
    35: {
        q: "I'm generally confident and have high self-esteem.",
        cats: [{
            name: "mind",
            weight: 1
        }, {
            name: "social",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    36: {
        q: "I often get anxious.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    37: {
        q: "My living space/home is luxurious.",
        cats: [{
            name: "environment",
            weight: 1
        }],
        sentiment: "positive"
    },
    38: {
        q: "I have easy and reliable access to food and water.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    39: {
        q: "I have fast and reliable internet access.",
        cats: [{
            name: "environment",
            weight: 0.5
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    40: {
        q: "I'm able to afford the latest and greatest technology easily.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    41: {
        q: "People often tell me how talented I am.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    42: {
        q: "I've considered getting cosmetic surgery before.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "negative"
    },
    43: {
        q: "I have nothing to look forward to in life.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    44: {
        q: "I can recall many great moments I've had with friends.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "positive"
    },
    45: {
        q: "I still feel youthful.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "positive"
    },
    46: {
        q: "I'm generally likeable.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    47: {
        q: "I have to take medication frequently.",
        cats: [{
            name: "health",
            weight: 1
        }],
        sentiment: "negative"
    },
    48: {
        q: "I'm always busy and don't get any time to relax.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    49: {
        q: "I rarely feel discriminated against due to race, sex, appearance, etc.",
        cats: [{
            name: "environment",
            weight: 0.5
        }, {
            name: "mind",
            weight: 0.5
        }, {
            name: "finance",
            weight: 0.5
        }, {
            name: "appearance",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    50: {
        q: "I was/am unpopular in school.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    51: {
        q: "I'm often a comfortable temperature and rarely have to sweat or freeze.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "health",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    52: {
        q: "I rarely have to do hard work that I don't want to.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "positive"
    },
    53: {
        q: "I usually have to settle for the cheaper version of a product because I can't afford the better but more expensive one.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "negative"
    },
    54: {
        q: "I own my own home.",
        cats: [{
            name: "finance",
            weight: 1
        }],
        sentiment: "positive"
    },
    55: {
        q: "I feel insecure about my own appearance.",
        cats: [{
            name: "appearance",
            weight: 1
        }],
        sentiment: "negative"
    },
    56: {
        q: "I often got/get bullied in school.",
        cats: [{
            name: "social",
            weight: 1
        }],
        sentiment: "negative"
    },
    57: {
        q: "I rarely experience any joy from things.",
        cats: [{
            name: "mind",
            weight: 1
        }],
        sentiment: "negative"
    },
    58: {
        q: "I receive compliments frequently.",
        cats: [{
            name: "mind",
            weight: 1
        }, {
            name: "appearance",
            weight: 0.5
        }],
        sentiment: "positive"
    },
    59: {
        q: "I'm physically fit with a good body.",
        cats: [{
            name: "health",
            weight: 1
        }, {
            name: "appearance",
             weight: 1
        }],
        sentiment: "positive"
    },
    60: {
        q: "I don't feel safe.",
        cats: [{
            name: "environment",
            weight: 1
        }, {
            name: "mind",
            weight: 0.5
        }],
        sentiment: "negative"
    }
};

module.exports = quiz;

},{}]},{},[6]);
