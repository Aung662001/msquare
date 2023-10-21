import { Model ,Document} from "mongoose";
import { userModel } from "../models/user.model";

interface MonthData {
    month:string;
    count:number;
}
export async function getPrev12MonthData<T extends Document>(model:Model<T>):Promise<{last12Months:MonthData[]}>{
 const last12Months:MonthData[] = [];
 const currentDate = new Date();
 currentDate.setDate(currentDate.getDate()+1);
 for (let index = 11; index >= 0; index--) {
   const  endDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-index*28)
   const  startDate = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()-28)

   const monthYear = endDate.toLocaleDateString('default',{day:"numeric",month:"short",year:"numeric"});
   const count = await model.countDocuments({
    createdAt:{
        $gte:startDate,
        $lt:endDate
    }
   })
   last12Months.push({month:monthYear,count})
 }
 console.log(last12Months)
 return {last12Months};
}
