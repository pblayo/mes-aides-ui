import Question from './Question';


export function route(id) {
    let options = {};

    try {
        options = require(`./${id}`);
    } catch (notFound) {
        // do nothing, there simply was no options for this question, it is a basic one
    }

    return new Question(options);
}
