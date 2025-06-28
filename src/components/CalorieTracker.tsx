import { useMemo } from "react";
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Calculate total calories

  // Calculate total calories consumed
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity)  => activity.category === 1 ? total + activity.calories : total, 0) , [activities]);
  // Calculate total calories burned
  const caloriesBurned = useMemo(
    () => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0),
    [activities]
  );

  // Calculate net calories
  const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);
   
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calorie Report
      </h2>
        {/* curso */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
          <CalorieDisplay
            calories={caloriesConsumed}
            text="Calories Consumed"
          />

          <CalorieDisplay
            calories={caloriesBurned}
            text="Calories Burned"
          />

          <CalorieDisplay
            calories={netCalories}
            text="Difference"
          />
        </div>

        {/* ia */}
        <div>
          <p className="text-white font-bold rounded-full grid-cols-1 gap-3 text-center ">
            <span className="text-6xl font-black text-lime-500">
              {caloriesConsumed} 
            </span>
            <span className="text-2xl font-bold text-white">
              Calories Consumed
            </span>
          </p>
          <p className="text-white font-bold rounded-full grid-cols-1 gap-3 text-center mt-5">
            <span className="text-6xl font-black text-lime-500">
              {caloriesBurned} 
            </span>
            <span className="text-2xl font-bold text-white">
              Calories Burned
            </span>
          </p>

        </div>
    </>
  )
}
