$(function(){

    /* HELPERS */
    require('./helpers.js');

    /* COMPONENTS */
    var Quiz = require('./components/Quiz.js');

    class App {
        constructor(element) {
            this.app = element;
            this.mountComponents();
        }

        mountComponents() {
            new Quiz(this.app);
        }
    }

    new App('#app');

});
