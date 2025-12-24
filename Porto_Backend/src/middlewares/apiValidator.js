import { z } from "zod";

export const employeeSchema = z.object({
    full_name: z.string().min(3), //minimum 3 alphabet hone hi chahiye
    email: z.string().email(),
    phone: z.string().optional(),
    department: z.enum(['HR', 'IT', 'SALES']),
    role: z.string(),
    salary: z.number().min(0) // value should be 0 but not in minus
})


export const validate = (schema) => (req, res, next) => {
const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            message: "you send some invalid inputs", 
            error: result.error.errors
        })
    }
    req.body = result.data;
    next();

}