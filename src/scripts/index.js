import '../styles/index.scss';
import TODO from './to-do';

// console.log(TODO.TAGS.list);

let profileID = TODO.createProfile('defaultProfile');
let projectID = TODO.createProject(profileID, void 0, 'my secret project', 'little edscription for my secret project', void 0, 'little note');
let goal1ID = TODO.createGoal(profileID, projectID, TODO.TAGS.list, {}, 'Week One Goal');
TODO.createSubGoal(profileID, projectID, goal1ID, TODO.TAGS.list, {}, 'My first to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, TODO.TAGS.list, {}, 'My second to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, TODO.TAGS.list, {}, 'My third to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, TODO.TAGS.list, {}, 'My fourth to-do card in the world');

let goal2ID = TODO.createGoal(profileID, projectID, TODO.TAGS.list, {}, 'Week Two Goal');
TODO.createSubGoal(profileID, projectID, goal2ID, TODO.TAGS.list, {}, 'My first to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal2ID, TODO.TAGS.list, {}, 'My second to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal2ID, TODO.TAGS.list, {}, 'My third to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal2ID, TODO.TAGS.list, {}, 'My fourth to-do card in the world');

// TODO.subGoal.rename(TODO.getItemByID(subGoalID), 'new subgoal name');
// console.log(TODO.getItemByID(projectID));
TODO.DOM.drawProject(TODO.getItemByID(projectID), document.querySelector('.project-board'));

document.querySelector('.cards-container.empty-cards-container').addEventListener('click', (e) => {
    TODO.DOM.drawNewGoalPanel();
});
