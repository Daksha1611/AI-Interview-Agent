import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

      if(!existingUser){

        const data = {
            name: args.name,
            email: args.email,
            credits: 50000,
        }
        const result = await ctx.db.insert("users", {
            ...data
        });

        // console.log("New user created:", result);
        return data;

      } else {
        // Update existing user
        await ctx.db.patch(existingUser._id, {
          name: args.name,
          email: args.email,
        });
        return {
          ...existingUser,
          name: args.name,
          email: args.email,
        };
      }
    },
});


      
