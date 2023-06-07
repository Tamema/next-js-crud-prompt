import Prompt, { IPromptModel } from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request): Promise<Response> => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    // save method shows error, so using create
    const newPrompt: IPromptModel = await Prompt.create({ creator: userId, prompt, tag });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
