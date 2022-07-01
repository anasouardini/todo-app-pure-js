import DOM from './DOM';
import factories from './factories';

const TODO = (() => {
    let TAGS = {
        list: [
            {
                ID: '',
                background: '#27ae60',
                color: '#fff',
                text: 'Not Done'
            },
            {
                ID: '',
                background: '#d35400',
                color: '#fff',
                text: 'In Progress'
            },
            {
                ID: '',
                background: '#2c3e50',
                color: '#fff',
                text: 'Done'
            }
        ],
        createTag: (background, color, text) => {
            TAGS.push({background, color, text});
        },
        deleteTag: (index) => {
            TAGS.splice(index);
        }
    };

    //profileID-projectID-GoalID-subGoalID
    let IDsList = [];
    const genID = () => {
        let rand = Math.ceil(Math.random() * 999999999999).toString();
        while (IDsList.includes(rand)) {
            rand = Math.ceil(Math.random() * 999999999999).toString();
        }
        IDsList.push(rand);
        return rand;
    };

    let profiles = {children: {}};

    const deleteItemByID = (IDString) => {
        let item = profiles;
        const IDs = IDString.split('-');
        let length = 0;
        IDs.forEach((id) => {
            length += id.length + 1;
            let itemID = IDString.slice(0, length - 1);
            if (length >= IDString.length) {
                delete item['children'][itemID];
            } else {
                item = item['children'][itemID]; //-1 for the last '-'
            }
            //FIX two digits
        });

        saveWork();
    };

    const getItemByID = (IDString) => {
        let item = profiles;
        const IDs = IDString.split('-');
        let length = 0;
        IDs.forEach((id) => {
            length += id.length + 1;
            item = item['children'][IDString.slice(0, length - 1)]; //-1 for the last '-'
            //FIX two digits
        });
        return item;
    };

    const saveWork = () => {
        localStorage.setItem('profilesObj', JSON.stringify(profiles));
    };

    const loadSavedWork = () => {
        const oldProfiles = JSON.parse(localStorage.getItem('profilesObj'));
        if (oldProfiles) {
            profiles = oldProfiles;
            console.log(profiles);
        }
    };

    const showSavedWork = () => {
        if (Object.keys(profiles.children).length) {
            const firstProfile = profiles.children[Object.keys(profiles.children)[0]];
            const firstProject = firstProfile.children[Object.keys(firstProfile.children)[0]];
            DOM.drawProject(firstProject, document.querySelector('.project-board'));
        }
    };

    const burnWork = () => {
        localStorage.removeItem('profilesObj');
    };

    //TODO: make it generic, update the new parent's UI | add DOM.moveItem_DOM
    const moveItem = (itemID, newParentID) => {
        const draggedCardCpy = {...TODO.getItemByID(itemID)};
        TODO.deleteItemByID(itemID);
        const newItemID = genID();
        draggedCardCpy.ID = newParentID + '-' + newItemID;
        TODO.getItemByID(newParentID).children[draggedCardCpy.ID] = draggedCardCpy;
        saveWork();
        return draggedCardCpy.ID;
    };

    //CREATION
    const createProfile = (...args) => {
        let profileID = genID();
        profiles['children'][profileID] = factories.profile(profileID, ...args);
        profiles['children'][profileID]['children'] = {};
        saveWork();
        return profileID;
    };
    const createProject = (profileID, ...args) => {
        let projects = {};

        projects = profiles['children'][profileID]['children'];
        let projectID = profileID + '-' + genID();
        projects[projectID] = factories.project(projectID, ...args);
        profiles['children'][profileID]['children'][projectID]['children'] = {};
        saveWork();
        return projectID;
    };
    const createGoal = (profileID, projectID, ...args) => {
        let goals = {};
        goals = profiles['children'][profileID]['children'][projectID]['children'];
        let goalID = projectID + '-' + genID();
        goals[goalID] = factories.goal(goalID, ...args);
        profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'] = {};
        saveWork();
        return goalID;
    };
    const createSubGoal = (profileID, projectID, goalID, ...args) => {
        let subGoals = {};
        subGoals = profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'];
        let subGoalID = goalID + '-' + genID();
        subGoals[subGoalID] = factories.subgoal(subGoalID, ...args);
        saveWork();
        return subGoalID;
    };

    //MODIFICATION
    const modifySubGoal = (subGoal, title = '', description = '', notes = '', tags = [], dueDate = '') => {
        subGoal.title = title;
        subGoal.description = description;
        subGoal.notes = notes;
        subGoal.tags = tags;
        subGoal.dueDate = dueDate;
        saveWork();
    };

    const modifyGoal = (goal, title = '', description = '', notes = '', tags = [], dueDate = '') => {
        goal.title = title;
        goal.description = description;
        goal.notes = notes;
        goal.tags = tags;
        goal.dueDate = dueDate;
        saveWork();
    };

    //EXPORTS
    return {
        DOM,
        createProfile,
        createProject,
        createGoal,
        createSubGoal,
        modifySubGoal,
        modifyGoal,
        TAGS: {list: TAGS.list, createTag: TAGS.createTag, deleteTag: TAGS.deleteTag},
        getItemByID,
        deleteItemByID,
        moveItem,
        saveWork,
        loadSavedWork,
        showSavedWork,
        burnWork
    };
})();

export default TODO;
