export declare const userToGroup: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "user_to_group";
    schema: undefined;
    columns: {
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "userId";
            tableName: "user_to_group";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: import("drizzle-orm").GeneratedColumnConfig<string>;
        }, {}, {}>;
        groupId: import("drizzle-orm/pg-core").PgColumn<{
            name: "groupId";
            tableName: "user_to_group";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: import("drizzle-orm").GeneratedColumnConfig<string>;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const userToGroupRelations: import("drizzle-orm").Relations<"user_to_group", {
    user: import("drizzle-orm").One<"users", true>;
    group: import("drizzle-orm").One<"groups", true>;
}>;
