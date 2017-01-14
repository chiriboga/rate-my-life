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
