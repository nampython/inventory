import {z} from "zod";


export const RegisterBody = z.object(
    {
        email: z.string().email(),
        name: z.string().min(3),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8),
    }
)
    .strict()
    .superRefine(({password, passwordConfirmation}, ctx) => {
        if (password !== passwordConfirmation) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["passwordConfirmation"],
            })
        }
    })

export const LoginBody = z.object(
    {
        email: z.string().email(),
        password: z.string().min(8),
    }
)
    .strict()

export type LoginType = z.infer<typeof LoginBody>
export type RegisterType = z.infer<typeof RegisterBody>