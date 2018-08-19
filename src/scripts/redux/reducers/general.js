// here we respond to a dispatch from an action item, then we return updated state to UI
import ActionTypes from "../actions/actionTypes";
import { randomLetter, random3, insertItem } from "../../helpers";

const initialState = {
  names: [
    {
      name_first: "1",
      name_last: "11",
      speed: 1,
      strength: 1,
      agility: 1,
      type: "starter",
      uniqueID: "SPQ321",
      selected: true,
      name: "1 11",
      total: 3
    },
    {
      name_first: "2",
      name_last: "22",
      speed: 2,
      strength: 2,
      agility: 2,
      type: "starter",
      uniqueID: "PYP022",
      selected: true,
      name: "2 22",
      total: 6
    },
    {
      name_first: "3",
      name_last: "33",
      speed: 3,
      strength: 3,
      agility: 3,
      type: "starter",
      uniqueID: "QTP112",
      selected: true,
      name: "3 33",
      total: 9
    },
    {
      name_first: "4",
      name_last: "44",
      speed: 4,
      strength: 4,
      agility: 4,
      type: "starter",
      uniqueID: "VSJ133",
      selected: true,
      name: "4 44",
      total: 12
    },
    {
      name_first: "5",
      name_last: "55",
      speed: 5,
      strength: 5,
      agility: 5,
      type: "starter",
      uniqueID: "VUX332",
      selected: true,
      name: "5 55",
      total: 15
    },
    // {
    //   name_first: "6",
    //   name_last: "66",
    //   speed: 6,
    //   strength: 6,
    //   agility: 6,
    //   type: "starter",
    //   uniqueID: "LNF323",
    //   selected: true,
    //   name: "6 66",
    //   total: 18
    // },
    // {
    //   name_first: "7",
    //   name_last: "77",
    //   speed: 7,
    //   strength: 7,
    //   agility: 7,
    //   type: "starter",
    //   uniqueID: "OMU031",
    //   selected: true,
    //   name: "7 77",
    //   total: 21
    // },
    // {
    //   name_first: "8",
    //   name_last: "88",
    //   speed: 8,
    //   strength: 8,
    //   agility: 8,
    //   type: "starter",
    //   uniqueID: "ZZY033",
    //   selected: true,
    //   name: "8 88",
    //   total: 24
    // },
    // {
    //   name_first: "9",
    //   name_last: "99",
    //   speed: 9,
    //   strength: 9,
    //   agility: 9,
    //   type: "starter",
    //   uniqueID: "IVN311",
    //   selected: true,
    //   name: "9 99",
    //   total: 27
    // },
    {
      name_first: "10",
      name_last: "1010",
      speed: 10,
      strength: 10,
      agility: 10,
      type: "sub",
      uniqueID: "IVN312",
      selected: true,
      name: "10 1010",
      total: 30
    },
    {
      name_first: "11",
      name_last: "1111",
      speed: 11,
      strength: 11,
      agility: 11,
      type: "sub",
      uniqueID: "IVN313",
      selected: true,
      name: "11 1111",
      total: 33
    }
  ],
  error: ""
};

export default function data(state = state ? state : initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_NAMES:
      let newState = [...state.names];

      const name = action.payload;

      let savedName = {
        ...name,
        uniqueID: randomLetter() + random3(),
        selected: true,
        name: name.name_first + " " + name.name_last,
        total: name.agility + name.speed + name.strength
      };

      newState = insertItem(newState, savedName);

      return {
        ...state,
        names: newState
      };
    case ActionTypes.DUPE_NAME:
    case ActionTypes.OVER100:
    case ActionTypes.DUPE_SCORE:
    case ActionTypes.OVER_STARTERS:
    case ActionTypes.OVER_SUBS:
    case ActionTypes.ROSTER_LIMIT:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: initialState.error
      };
    default:
      return state;
  }
}
