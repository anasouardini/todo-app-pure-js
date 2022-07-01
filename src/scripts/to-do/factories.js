const factories = (() => {
    const profile = (ID, name) => {
        //TODO: check args
        return {ID, name};
    };

    const project = (ID, style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined', notes = '') => {
        //TODO: check args
        return {ID, style, title, desc, dueDate, notes};
    };

    let goal = function (ID, tags = [], style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined', notes = '') {
        //TODO: check args
        return {ID, tags, style, title, desc, dueDate, notes};
    };

    const subgoal = (ID, tags = [], style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined date', notes = '') => {
        //TODO: check args
        return {ID, tags, style, title, desc, dueDate, notes};
    };

    return {profile, project, goal, subgoal};
})();

export default factories;
