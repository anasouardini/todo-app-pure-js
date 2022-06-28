import DOM from './DOM';
import profile from './profile';
import project from './project';
import goal from './goal';
import subGoal from './subgoal';

let TODO = (() => {
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

    const saveWork = () => {};

    const moveItem = (itemID, newParentID) => {
        const draggedCardCpy = {...TODO.getItemByID(itemID)};
        TODO.deleteItemByID(itemID);
        TODO.getItemByID(newParentID).children[itemID] = draggedCardCpy;
        saveWork();
    };

    let ID = 0; //TODO: random letters&numbers
    //profileID-projectID-GoalID-subGoalID

    const createProfile = function (...args) {
        let profileID = (++ID).toString();
        profiles['children'][profileID] = profile.factory(profileID, ...args);
        profiles['children'][profileID]['children'] = {};
        saveWork();
        return profileID;
    };
    const createProject = function (profileID, ...args) {
        let projects = {};

        projects = profiles['children'][profileID]['children'];
        let projectID = profileID + '-' + ++ID;
        projects[projectID] = project.factory(projectID, ...args);
        profiles['children'][profileID]['children'][projectID]['children'] = {};
        saveWork();
        return projectID;
    };
    const createGoal = function (profileID, projectID, ...args) {
        let goals = {};
        goals = profiles['children'][profileID]['children'][projectID]['children'];
        let goalID = projectID + '-' + ++ID;
        goals[goalID] = goal.factory(goalID, ...args);
        profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'] = {};
        saveWork();
        return goalID;
    };
    const createSubGoal = function (profileID, projectID, goalID, ...args) {
        let subGoals = {};
        subGoals = profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'];
        let subGoalID = goalID + '-' + ++ID;
        subGoals[subGoalID] = subGoal.factory(subGoalID, ...args);
        saveWork();
        return subGoalID;
    };

    return {
        profile,
        project,
        goal,
        DOM,
        subGoal,
        createProfile,
        createProject,
        createGoal,
        createSubGoal,
        TAGS: {list: TAGS.list, createTag: TAGS.createTag, deleteTag: TAGS.deleteTag},
        getItemByID,
        deleteItemByID,
        moveItem,
        saveWork
    };
})();

export default TODO;
