import {Model, model, models, Schema} from "mongoose";
import { IPromptUserModel } from "./PromptUser";

export interface IPromptModel extends Document {
  creator: IPromptUserModel["_id"];
  prompt: string;
  tag: string;
}

const PromptSchema: Schema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'PromptUser',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Prompt: Model<IPromptModel> = models.Prompt || model<IPromptModel>('Prompt', PromptSchema);

export default Prompt;