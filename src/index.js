import '../style/main.scss';

console.log('Hello World');

if (module.hot) {
    console.log('module is hot');
    module.hot.accept("../style/main.scss", function() {
        console.log('hot module reload');
    });
}