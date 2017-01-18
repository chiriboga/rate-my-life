/* COMPONENTS */

var CategoryRating = require('../components/CategoryRating.js');

class ResultModal {
    constructor(app, props) {
        this.app = app;
        this.props = props || {};
    }

    render() {
        $('#resultsModal').remove();
        $(this.app).append(this.template());

        var results = this.props.results;

        for (var category in results) {
              if (results.hasOwnProperty(category)) {

                  var categoryRating = new CategoryRating(this.app, {
                      results: results,
                      category: category
                  });

                  $('#resultsModal').find('.modal-body').append(categoryRating.render());
              }
        }
    }

    template() {
        return `<div class="modal fade" id="resultsModal" tabindex="-1" role="dialog" aria-labelledby="resultsLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="resultsLabel">Your results</h5>
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
