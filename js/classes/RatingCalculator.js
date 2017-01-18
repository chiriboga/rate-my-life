class RatingCalculator {
    constructor(quiz) {
        this.quiz = quiz;
    }

    getCategories() {
        return {
            appearance: {
                sum: 0,
                total: 0
            },
            environment: {
                sum: 0,
                total: 0
            },
            finance: {
                sum: 0,
                total: 0
            },
            health: {
                sum: 0,
                total: 0
            },
            love: {
                sum: 0,
                total: 0
            },
            mind: {
                sum: 0,
                total: 0
            },
            social: {
                sum: 0,
                total: 0
            }
        };
    }

    getCategorySums() {
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
                      categories[name].sum += (reversedAnswerValues[answer] * weight);
                  } else {
                      categories[name].sum += (answer * weight);
                  }
                  categories[name].total += (weight * 6);
              });

          }
        }

        return categories;

    }

    getCategoryResults() {
        var s = this.getCategorySums();
        return {
            overall: null,
            appearance: Math.round(100 * s.appearance.sum / s.appearance.total) / 10,
            environment: Math.round(100 * s.environment.sum / s.environment.total) / 10,
            finance: Math.round(100 * s.finance.sum / s.finance.total) / 10,
            health: Math.round(100 * s.health.sum / s.health.total) / 10,
            love: Math.round(100 * s.love.sum / s.love.total) / 10,
            mind: Math.round(100 * s.mind.sum / s.mind.total) / 10,
            social: Math.round(100 * s.social.sum / s.social.total) / 10
        };
    }

    getResultsObject() {
        var r = this.getCategoryResults();
        r.overall = Math.round(10 * (r.appearance + r.environment + r.finance + r.health + r.love + r.mind + r.social) / 7) / 10;
        return r;
    }
}

module.exports = RatingCalculator;
