/* COMPONENTS */
var CategoryRating = require('../components/CategoryRating.js');

class ResultModal {
    constructor(app, props) {
        this.app = app;
        this.props = props || {};

        this._methods = this.methods();
        this.events();
        this.render();
    }

    render() {
        $('#resultsModal').remove();
        $(this.app).append(this.template());

        for (var category in this.props.results) {
              if (this.props.results.hasOwnProperty(category)) {

                  new CategoryRating(this.app, {
                      results: this.props.results,
                      category: category
                  });

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
