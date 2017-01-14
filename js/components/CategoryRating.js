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
