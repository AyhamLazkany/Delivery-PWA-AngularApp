import { Dish } from "./dish";

export class Order { 
   _id!: string; 
   dish!: Dish; 
   plugins!: string[]; 
   quantity!: number; 
   bill!: number ;
};