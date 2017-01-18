/* QUIZ JSON */
var quiz = require('../quiz.js');
var quizCache = $.extend({}, quiz);

/* CLASSES */
var RatingCalculator = require('../classes/RatingCalculator.js');

/* COMPONENTS */
var Question = require('../components/Question.js');
var ResultModal = require('../components/ResultModal.js');

class Quiz {
    constructor(app, props) {
        this.app = app;
        this.props = props || {};
        this.counter = 1;
        this.page = 1;

        this._methods = this.methods();
        this.events();
        this.render();
    }

    render() {
        for (var key in quiz) {
          if (quiz.hasOwnProperty(key)) {

              if (this.counter % (15 * this.page + 1) !== 0) {

                  new Question(this.app, {
                      id: key,
                      title: quiz[key].q
                  });

                  if (this.page === 1) {
                      $('.question').removeClass('highlight-anim');
                  }
                  if (this.counter === 60) {
                      $('#quiz .container').append('<button id="quiz-finish" class="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#resultsModal">Get results!</button>');
                  }

              } else {
                  $('#quiz .container').append(`<button id="quiz-continue" class="btn btn-outline-primary btn-lg">Continue (${this.page + 1} of 4)</button>`);
                  return;
              }

              this.counter++;
              delete quiz[key];
          }
        }
    }

    template() {
        //
    }

    events() {
        var quiz = this;
        $(this.app).on('click', '#quiz-continue', quiz._methods.continue);
        $(this.app).on('click', '#quiz-finish', quiz._methods.finish);
    }

    methods() {
        return {
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
                var results = calc.getResultsObject();
                this._methods.displayResults(results);
            }.bind(this),

            displayResults: function(results) {
                new ResultModal(this.app, {
                    results: results
                });
            }.bind(this)
        };
    }
}

module.exports = Quiz;
