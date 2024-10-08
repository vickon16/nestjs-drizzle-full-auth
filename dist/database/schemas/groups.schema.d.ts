export declare const groups: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "groups";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "groups";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: import("drizzle-orm").GeneratedColumnConfig<string>;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "groups";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            generated: import("drizzle-orm").GeneratedColumnConfig<string>;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const groupsRelations: import("drizzle-orm").Relations<"groups", {
    userToGroup: import("drizzle-orm").Many<"user_to_group">;
}>;
