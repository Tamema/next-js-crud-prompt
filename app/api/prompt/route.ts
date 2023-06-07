import Prompt, { IPromptModel } from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const prompts: IPromptModel[] = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
