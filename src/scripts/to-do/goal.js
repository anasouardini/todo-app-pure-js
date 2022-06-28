let Goal = (() => {
    const deleteItem = (name) => {
        console.log('');
    };
    const rename = (name) => {
        console.log('');
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

    let factory = function (ID, tags = [], style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined', notes = '') {
        //TODO: check args
        return {ID, tags, style, title, desc, dueDate, notes};
    };

    return {factory, deleteItem, rename, addTag, removeTag, update_UI};
})();

export default Goal;
