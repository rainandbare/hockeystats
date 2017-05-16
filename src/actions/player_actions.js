import { ADD_PLAYER } from './action_types';


let nextTodoId = 0;
export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    id: nextTodoId++,
    name
  }
}