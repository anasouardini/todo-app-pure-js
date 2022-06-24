const TodoProject = (() => {
    const factory = (ID, style = {}, title = 'Untitled', desc = '', dueDate = 'undetermined', notes = '') => {
        //TODO: check args
        return {ID, style, title, desc, dueDate, notes};
    };

    return {factory};
})();

export default TodoProject;
