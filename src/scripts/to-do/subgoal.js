const Goal = (() => {
    const rename = (subgoal, name) => {
        subgoal.name = name;
    };

    const addTag = () => {
        console.log('');
    };
    const removeTag = () => {
        console.log('');
    };

    const update_UI = () => {
        console.log('');
    };

    const factory = (ID, tags = [], style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined date', notes = '') => {
        //TODO: check args
        return {ID, tags, style, title, desc, dueDate, notes};
    };

    return {factory, rename, addTag, removeTag, update_UI};
})();

export default Goal;
