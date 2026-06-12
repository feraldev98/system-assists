import { z } from "zod";

const periodSchema = {
create: z.object({}),
update: z.object({}),
params: z.object({}),
};

export { periodSchema };
