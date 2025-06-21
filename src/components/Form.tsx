import { useState } from "react"
import type { ChangeEvent } from "react"
import  type { Activity } from "../types"
import { categories } from "../data/categories"

export default function Form() {

    const [activity, setActivity] = useState<Activity>({
        category: 1, // Default category ID
        nameActivity: '',
        calories: 0
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        console.log(isNumberField);
        
       setActivity({
            ...activity,
          [e.target.id]: isNumberField ? +e.target.value : e.target.value

        })
    }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
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

        <input type="submit" className="bg-gray-800 hover:bh-gray-900 w-full p-2 font-bold uppercase text-white" value='Save Changes'  />

    </form>
  )
}
