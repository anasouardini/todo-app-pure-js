let todoDOM = (() => {
    const createAddGoalBtn = (parent_DOM) => {
        //goal
        const goal_DOM = document.createElement('div');
        goal_DOM.style.order = '9999';
        goal_DOM.style.cursor = 'pointer';
        goal_DOM.classList.add('cards-container');
        goal_DOM.classList.add('empty-cards-container');
        //add goal button
        const goalAddCard_DOM = document.createElement('div');
        goalAddCard_DOM.classList.add('add-goal-btn');
        goalAddCard_DOM.style.order = '9999';
        //add a goal
        const goalPar_DOM = document.createElement('p');
        goalPar_DOM.textContent = 'Add a New Goal';
        goalPar_DOM.style.display = 'inline';
        goalAddCard_DOM.appendChild(goalPar_DOM);
        goal_DOM.appendChild(goalAddCard_DOM);

        parent_DOM.appendChild(goal_DOM);
    };

    const createTag = (tag) => {
        const tag_DOM = document.createElement('div');
        tag_DOM.classList.add('tag');
        tag_DOM.setAttribute('data-ID', tag.ID);
        tag_DOM.textContent = tag.text;
        tag_DOM.style.backgroundColor = tag.background;
        tag_DOM.style.color = tag.color;
        return tag_DOM;
    };
    const drawTag = (tag, parent_DOM) => {
        if (parent_DOM) {
            parent_DOM.appendChild(createTag(tag));
        } else {
            console.error('the parrent Node doesnt exist');
        }
    };

    const createSubGoal = (subGoal) => {
        //subgoal
        const subGoal_DOM = document.createElement('div');
        subGoal_DOM.classList.add('card');
        subGoal_DOM.setAttribute('data-ID', subGoal.ID);
        //tags
        const subGoalTags_DOM = document.createElement('div');
        subGoalTags_DOM.classList.add('tags');
        subGoal_DOM.appendChild(subGoalTags_DOM);
        subGoal.tags.forEach((tag) => {
            drawTag(tag, subGoalTags_DOM);
        });
        //title
        const subGoalTitle_DOM = document.createElement('p');
        subGoalTitle_DOM.textContent = subGoal.title;
        subGoal_DOM.appendChild(subGoalTitle_DOM);
        return subGoal_DOM;
    };
    const drawSubGoal = (subGoal, parent_DOM) => {
        let subGoal_DOM = {};
        if (parent_DOM) {
            subGoal_DOM = createSubGoal(subGoal);
            parent_DOM.appendChild(subGoal_DOM);
        } else {
            console.error('the parrent Node doesnt exist');
        }
    };

    const createGoal = (goal) => {
        //goal
        const goal_DOM = document.createElement('div');
        goal_DOM.classList.add('cards-container');
        goal_DOM.setAttribute('data-ID', goal.ID);
        //tags
        const goalTags_DOM = document.createElement('div');
        goalTags_DOM.classList.add('tags');
        goal_DOM.appendChild(goalTags_DOM);
        goal.tags.forEach((tag) => {
            drawTag(tag, goalTags_DOM);
        });
        //header
        const goalHeader_DOM = document.createElement('div');
        goalHeader_DOM.classList.add('cards-container-header');
        goal_DOM.appendChild(goalHeader_DOM);
        //title
        const goalHeaderTitle_DOM = document.createElement('h4');
        goalHeaderTitle_DOM.textContent = goal.title;
        goalHeader_DOM.appendChild(goalHeaderTitle_DOM);
        //add card
        const goalAddCard_DOM = document.createElement('div');
        goalAddCard_DOM.classList.add('add-card-btn');
        goalAddCard_DOM.setAttribute('data-ID', goal.ID);
        goalAddCard_DOM.style.order = '9999';
        //add a card
        const goalPar_DOM = document.createElement('p');
        goalPar_DOM.textContent = 'Add a New Card';
        goalPar_DOM.style.display = 'inline';
        goalAddCard_DOM.appendChild(goalPar_DOM);

        goal_DOM.appendChild(goalAddCard_DOM);

        return goal_DOM;
    };
    const drawGoal = (goal, parent_DOM) => {
        let goal_DOM = {};
        if (parent_DOM) {
            goal_DOM = createGoal(goal);
            parent_DOM.appendChild(goal_DOM);
        } else {
            console.error('the parrent Node doesnt exist');
        }
        Object.keys(goal.children).forEach((subGoalID) => {
            drawSubGoal(goal.children[subGoalID], goal_DOM);
        });
    };

    const createProject = (project) => {
        const project_DOM = document.createElement('div');
        project_DOM.classList.add('project-container');
        project_DOM.setAttribute('data-ID', project.ID);
        return project_DOM;
    };
    const drawProject = (project, projectBoard_DOM) => {
        let project_DOM = {};
        if (projectBoard_DOM) {
            project_DOM = createProject(project);
            projectBoard_DOM.appendChild(project_DOM);
        } else {
            console.error('the parrent Node doesnt exist');
        }
        Object.keys(project.children).forEach((goalID) => {
            drawGoal(project.children[goalID], project_DOM);
        });
        //add the 'add new goal button'
        createAddGoalBtn(project_DOM);
    };

    // const createProfile = () => {};
    // const drawProfile = (profile) => {
    //     drawProject();
    // };

    const drawNewGoalPanel = () => {
        //container
        const settingPannel_DOM = document.createElement('div');
        settingPannel_DOM.classList.add('new-goal-panel');
        settingPannel_DOM.classList.add('settings-panel');
        document.body.appendChild(settingPannel_DOM);

        //

        //settings buttons
        const settingPannelControls_DOM = document.createElement('div');
        settingPannel_DOM.appendChild(settingPannelControls_DOM);
        const saveBtn_DOM = document.createElement('button');
        saveBtn_DOM.textContent = 'Save';
        const cancelBtn_DOM = document.createElement('button');
        cancelBtn_DOM.textContent = 'Cancel';
        settingPannelControls_DOM.appendChild(saveBtn_DOM);
        settingPannelControls_DOM.appendChild(cancelBtn_DOM);
    };

    return {drawSubGoal, drawGoal, drawProject, drawNewGoalPanel};
})();

export default todoDOM;
