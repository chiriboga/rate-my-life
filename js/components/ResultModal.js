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
