import type { Activity } from "../types";


export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity }} |
    { type: 'save-activeId', payload: { id : Activity['id'] }} |
    { type: 'delete-activeId', payload: { id : Activity['id'] }}

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
      state: ActivityState = initialState,
      action: ActivityActions
  ) => {   

  if (action.type === 'save-activity') {
    let updatedActivities: Activity[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map(activity =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: '' // Reset activeId after saving
    };
  }

  if (action.type === 'save-activeId') {
    return {
      ...state,
      activeId: action.payload.id
    };
  }
  if (action.type === 'delete-activeId') {
    // Filter out the activity with the given id
    
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id)
      
    };
  }

  return state;
}