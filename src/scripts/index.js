import '../styles/index.scss';
import TODO from './to-do';

// console.log(TODO.TAGS.list);

let profileID = TODO.createProfile('defaultProfile');
let projectID = TODO.createProject(profileID, void 0, 'my secret project', 'little edscription for my secret project', void 0, 'little note');
let goal1ID = TODO.createGoal(profileID, projectID, [TODO.TAGS.list[1]], {}, 'Week One Goal');
TODO.createSubGoal(profileID, projectID, goal1ID, [TODO.TAGS.list[0]], {}, 'My first to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, [TODO.TAGS.list[1]], {}, 'My second to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, [TODO.TAGS.list[2]], {}, 'My third to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal1ID, [TODO.TAGS.list[2]], {}, 'My fourth to-do card in the world');
let goal2ID = TODO.createGoal(profileID, projectID, [TODO.TAGS.list[0]], {}, 'Week Two Goal');
TODO.createSubGoal(profileID, projectID, goal2ID, [TODO.TAGS.list[0]], {}, 'My first to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal2ID, [TODO.TAGS.list[0]], {}, 'My second to-do card in the world');
TODO.createSubGoal(profileID, projectID, goal2ID, [TODO.TAGS.list[0]], {}, 'My third to-do card in the world');

//* TODO.subGoal.rename(TODO.getItemByID(subGoalID), 'new subgoal name');
// console.log(TODO.getItemByID(projectID));
TODO.DOM.drawProject(TODO.getItemByID(projectID), document.querySelector('.project-board'));

const prjectID_DOM = document.querySelector('.project-container').getAttribute('data-id');
document.addEventListener('click', (e) => {
    if (e.target == document.querySelector('.add-new-goal')) {
        TODO.DOM.drawNewGoalPanel(prjectID_DOM, Object.keys(TODO.getItemByID(prjectID_DOM).children).length);
    } else if (e.target.classList.contains('add-new-subgoal')) {
        const goalID_DOM = e.target.getAttribute('data-id');
        TODO.DOM.drawNewSubGoalPanel(e.target.getAttribute('data-id'), Object.keys(TODO.getItemByID(goalID_DOM).children).length);
    } else if (e.target == document.querySelector('.overlay') || e.target == document.querySelector('.settings-panel button.cancel')) {
        TODO.DOM.removePanel();
    } else if (e.target == document.querySelector('.settings-panel button.create')) {
        let title = document.querySelector('.settings-panel input[name="title"]').value;
        if (title == '') {
            title = document.querySelector('.settings-panel input[name="title"]').getAttribute('placeholder');
        }
        const dseciption = document.querySelector('.settings-panel textarea[name="description"]').value;
        const date = document.querySelector('.settings-panel input[name="dueDate"]').value;

        if (e.target == document.querySelector('.new-goal-panel button.create')) {
            const goalID = TODO.createGoal(profileID, prjectID_DOM, [], {}, title, dseciption, 'undefined', date);
            TODO.DOM.drawGoal(TODO.getItemByID(goalID), document.querySelector(`div[data-id="${prjectID_DOM}"]`));
        } else if (e.target == document.querySelector('.new-subgoal-panel button.create')) {
            const goalID_DOM = document.querySelector('.settings-panel').getAttribute('data-parent-id');
            const subGoalID = TODO.createSubGoal(profileID, prjectID_DOM, goalID_DOM, [], {}, title, dseciption, 'undefined', date);
            TODO.DOM.drawSubGoal(TODO.getItemByID(subGoalID), document.querySelector(`div[data-id="${goalID_DOM}"]`));
        }

        TODO.DOM.removePanel();
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('card')) {
        e.target.setAttribute('data-beingDragged', 'true');
        [...document.querySelectorAll('.cards-container')].forEach((cardContainer) => {
            [...cardContainer.children].forEach((card) => {
                card.style.pointerEvents = 'none';
            });
        });
    }
});

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('card') && e.target.hasAttribute('data-beingDragged')) {
        e.target.removeAttribute('data-beingDragged');
        [...document.querySelectorAll('.cards-container')].forEach((cardContainer) => {
            [...cardContainer.children].forEach((card) => {
                card.style.pointerEvents = 'none';
            });
        });
    }
});

document.addEventListener('dragover', (e) => {
    if (e.target.classList.contains('cards-container')) {
        const cards = [...e.target.children].filter((child) => child.classList.contains('card'));
        const afterElm = cards.reduce(
            (prev, current) => {
                const currentRect = current.getBoundingClientRect();
                const distance = e.clientY - (currentRect.bottom - (currentRect.bottom - currentRect.top) / 2);

                if (distance > 0 && prev.distance > distance) {
                    return {distance, elm: current};
                } else {
                    return prev;
                }
            },
            {distance: +Infinity, elm: undefined}
        );

        if (afterElm.elm) {
            afterElm.elm.after(document.querySelector('[data-beingDragged]'));
        } else {
            cards[0].before(document.querySelector('[data-beingDragged]'));
        }
    }
});
