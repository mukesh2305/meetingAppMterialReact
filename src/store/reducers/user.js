import { SET_USER } from "../actions/types";

export const initialState = [
    {
        firstName: 'Shubham',
        id: 3,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'Brajendra',
        id: 4,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'John Heart',
        id: 7,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'Ravi',
        id: 1,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'Kavi',
        id: 8,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'Vishwas',
        id: 9,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    },
    {
        firstName: 'Brij',
        id: 10,
        color: '#56ca85',
        avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
        age: 27,
        discipline: 'ABS, Fitball, StepFit'
    }
];

export const user = (state = initialState, action) => {
    switch (action.type) {
        default:
            return [...state];
    }
};
