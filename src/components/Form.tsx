import { useState, useEffect } from "react"
import type { ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer"


type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState : Activity = {
        id: uuidv4(), // Generate a unique ID for the activity
        category: 1, // Default category ID
        nameActivity: '',
        calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
      if (state.activeId) {
        const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
        setActivity(selectedActivity)       
      } 
      }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        // console.log(isNumberField);
        
       setActivity({
            ...activity,
          [e.target.id]: isNumberField ? +e.target.value : e.target.value

        })
    }

    const isValidActivity = () => {
        const { nameActivity, calories } = activity        
        
        return nameActivity.trim() !== '' && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: 'save-activity', payload: { newActivity: activity } });

        setActivity({
            ...initialState, // Reset to initial state
            id: uuidv4() // Generate a new unique ID for the next activity  
        }); // Reset the form after submission
        
    }

    return (
        <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
        >

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Category:</label>
            <select
                className=" border border-slate-300 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
                

            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">    
            <label htmlFor="nameActivity" className="font-bold">Activity:</label>
            <input
                id="nameActivity" 
                type="text" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Example: food, orange juice, salad, exercise, running, cycling, etc."
                value={activity.nameActivity}
                onChange={handleChange}
             />    

        </div>

        <div className="grid grid-cols-1 gap-3">    
            <label htmlFor="calories" className="font-bold">Calories: </label>
            <input
                id="calories" 
                type="number" 
                className="border border-slate-300 p-2 rounded-lg"
                placeholder=" Calories consumed or burned example: 200, 500, etc."
                value={activity.calories}
                onChange={handleChange}
             />    

        </div>

        <input 
            type="submit" 
            className="bg-gray-800 hover:bh-gray-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10" 
            value={activity.category === 1 ? 'Save Food' : 'Save Activities'}
            disabled={!isValidActivity()} 

        />

    </form>
  )
}
