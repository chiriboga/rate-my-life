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
                var color = $(self).css('border-color');
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
