import { Unit } from './Unit';

export interface Ingredient {
    id: number
    name: string
    quantity?: number
    unit?: Unit
}