type AddAction = {
  type: 'count/ADD',
  payload: number,
};

type TakeAction = {
  type: 'count/TAKE',
  payload: number,
};

const add = (value: number): AddAction => ({
  type: 'count/ADD',
  payload: value,
});

const take = (value: number): TakeAction => ({
  type: 'count/TAKE',
  payload: value,
});

type Action = AddAction | TakeAction;

const countReducer = (count = 0, action: Action) => {
  switch (action.type) {
    case 'count/ADD':
      return count + action.payload;

    case 'count/TAKE': {
      if (action.payload > count) {
        return count;
      }

      return count - action.payload;
    }

    default:
      return count;
  }
};

export const actions = { add, take };

export default countReducer;
