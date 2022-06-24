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
                background: '#8ada25',
                color: '#000',
                text: 'Not Done'
            },
            {
                ID: '',
                background: 'yellow',
                color: '#000',
                text: 'In Progress'
            },
            {
                ID: '',
                background: 'red',
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

    const getItemByID = (IDString) => {
        //TODO: Optimize
        let item = profiles;
        const IDs = IDString.split('-');
        IDs.forEach((id, index) => {
            for (let i = index - 1; i >= 0; i--) {
                id = IDs[i] + '-' + id;
            }
            item = item['children'][id];
        });
        return item;
    };

    let ID = 0; //TODO: random letters&numbers
    //profileID-projectID-GoalID-subGoalID

    const createProfile = function (...args) {
        let profileID = (++ID).toString();
        profiles['children'][profileID] = profile.factory(profileID, ...args);
        return profileID;
    };
    const createProject = function (profileID, ...args) {
        let projects = {};
        if (!profiles['children'][profileID].hasOwnProperty('children')) {
            profiles['children'][profileID]['children'] = {};
            projects = profiles['children'][profileID]['children'];
        } else {
            projects = profiles['children'][profileID]['children'];
        }
        let projectID = profileID + '-' + ++ID;
        projects[projectID] = project.factory(projectID, ...args.slice(1));
        return projectID;
    };
    const createGoal = function (profileID, projectID, ...args) {
        let goals = {};
        if (!profiles['children'][profileID]['children'][projectID].hasOwnProperty('children')) {
            profiles['children'][profileID]['children'][projectID]['children'] = {};
            goals = profiles['children'][profileID]['children'][projectID]['children'];
        } else {
            goals = profiles['children'][profileID]['children'][projectID]['children'];
        }
        let goalID = projectID + '-' + ++ID;
        goals[goalID] = goal.factory(goalID, ...args.slice(2));
        return goalID;
    };
    const createSubGoal = function (profileID, projectID, goalID, ...args) {
        let subGoals = {};
        if (!profiles['children'][profileID]['children'][projectID]['children'][goalID].hasOwnProperty('children')) {
            profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'] = {};
            subGoals = profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'];
        } else {
            subGoals = profiles['children'][profileID]['children'][projectID]['children'][goalID]['children'];
        }
        let subGoalID = goalID + '-' + ++ID;
        subGoals[subGoalID] = subGoal.factory(subGoalID, ...args.slice(3));
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
        getItemByID
    };
})();

export default TODO;
