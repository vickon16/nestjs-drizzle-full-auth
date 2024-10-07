import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from 'src/schemas';
export type TUser = InferSelectModel<typeof users>;
export declare class User implements TUser {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateUserDto implements InferInsertModel<typeof users> {
    username: string;
    email: string;
    phone: string;
    password: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
