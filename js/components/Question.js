class Question {

    constructor(app, props) {
        this.app = app;
        this.props = props || {};
        this._methods = this.methods();
    }

    render() {
        return $('#quiz .container').append(this.template());
    }

    template() {
        return `<div class="question highlight-anim" data-question-id="${this.props.id}">
                    <h3><small>${this.props.id}.</small> ${this.props.title}</h3>
                    <div class="d-flex flex-wrap flex-circles justify-content-center align-items-center">
                          <div class="circle-text">Agree</div>
                          <div class="circle is--green" tabindex="0" aria-label="Strongly agree" data-value="6"></div>
                          <div class="circle is--green" tabindex="0" aria-label="Mostly agree" data-value="5"></div>
                          <div class="circle is--green" tabindex="0" aria-label="Slightly agree" data-value="4"></div>
                          <div class="circle" tabindex="0" aria-label="Neutral" data-value="3"></div>
                          <div class="circle is--red" tabindex="0" aria-label="Slightly disagree" data-value="2"></div>
                          <div class="circle is--red" tabindex="0" aria-label="Mostly disagree" data-value="1"></div>
                          <div class="circle is--red" tabindex="0" aria-label="Strongly disagree" data-value="0"></div>
                          <div class="circle-text">Disagree</div>
                    </div>
                </div>`;
    }

    events() {
        //
    }

    methods() {
        return {
            //
        }
    }
}

module.exports = Question;
