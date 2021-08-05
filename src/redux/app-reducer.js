import { AuthMeThunkCreator } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized:false
};

const AppReducer = (state=initialState,action)=>{
    switch(action.type){
        case INITIALIZED_SUCCESS:{
            return {...state,initialized:true}
        }
        default:
            return state;
    }
}

export const InitializeApp = () =>{
    return {
        type: INITIALIZED_SUCCESS,
       
    }
}

export const InitializeSuccess = ()=>(dispatch)=>{
  let promise1 = dispatch(AuthMeThunkCreator());

//   debugger

promise1.then(() => {
    dispatch(InitializeApp())
});

}


export default AppReducer;