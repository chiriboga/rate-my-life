class CategoryRating {

    constructor(app, props) {
        this.app = app;
        this.props = props || {};

        this._methods = this.methods();
        this.events();
        this.render();
    }

    render() {
        $('#resultsModal .modal-body').append(this.template());
    }

    template() {

        var template = `<h3>${this.props.category.capitalize()} ${this._methods.getEmoji(this.props.category)}</h3>
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="rating ${this._methods.getColorClass(this.props.results[this.props.category])}" data-value="${this.props.results[this.props.category]}"></div>
                            </div>
                            <div class="col-8 col-xs-12">
                                <div class="progress">
                                  <div class="progress-bar ${this._methods.getColorClass(this.props.results[this.props.category])}" role="progressbar" style="width: ${this.props.results[this.props.category] * 10}%" aria-valuenow="${this.props.results[this.props.category] * 10}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>`;

        if (this.props.category !== 'overall') {
            template += `<div class="card">
                              <div class="card-block">
                                ${this._methods.getDescriptions()[this.props.category]}
                              </div>
                         </div>`;
        }

        if (this.props.category !== 'social') {
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
            },
            getEmoji: function(category) {
                var src = '';
                switch (category) {
                    case "overall":
                        return "";
                        break;
                    case "appearance":
                        src="https://twemoji.maxcdn.com/72x72/1f484.png";
                        break;
                    case "environment":
                        src="https://twemoji.maxcdn.com/72x72/1f33f.png";
                        break;
                    case "finance":
                        src="https://twemoji.maxcdn.com/72x72/1f4b0.png";
                        break;
                    case "health":
                        src="https://twemoji.maxcdn.com/72x72/1f489.png";
                        break;
                    case "love":
                        src="https://twemoji.maxcdn.com/72x72/1f496.png";
                        break;
                    case "mind":
                        src="https://twemoji.maxcdn.com/72x72/1f3ad.png";
                        break;
                    case "social":
                        src="https://twemoji.maxcdn.com/72x72/1f46a.png";
                        break;
                }
                return this.getImgTag(category, src);

            },
            getImgTag: function(category, src) {
                return `<img width="36" src="${src}" alt="${category}">`;
            }
        }
    }
}

module.exports = CategoryRating;
