# TODO LIST APP

## structure

    + index{
        index:{DOM,Logic}
    }

## Modules

    + DOM properties/functions
    + Logic (project Module that has the todos factory)

### Logic Module

    + todo factory
        + title, description, dueDate, notes, priority, style{clr,bg,ico}, status, project
    + projects object{
        projectName:{
            todos:{
                inProgress:[todoObj],
                done:[todoObj]
            },
            style:{
                bg:"",
                clr:"",
                icon:""
            }
        }
    }
    + fetch/save local storage (store each project seperately)
