import {z} from "zod"


export const userSchema = z.object({
    name:z.
     string().
     min(2,'Name must be atleast 2 characters long')
    .max(40,"Name must be less than 40 characters long"),
    email:z
    .string()
    .email("Invalid email address"),
    age:z
    .number()
    .min(1,"Age must be positive")
})

export type UserInput = z.infer<typeof userSchema>