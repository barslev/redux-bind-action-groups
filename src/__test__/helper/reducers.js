const initState = {
  demo: true
}

export default function test(state = initState, action){
  switch(action.type){
    case 'TOGGLE_DEMO':
      return {
        demo: !state.demo
      }
    default: 
      return state;
  }
}