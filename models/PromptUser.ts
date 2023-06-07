import { Schema, model, models, Document, Model } from 'mongoose';

export interface IPromptUserModel extends Document {
  email: string,
  username: string,
  image?: string
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const PromptUser: Model<IPromptUserModel> = models.PromptUser || model<IPromptUserModel>("PromptUser", UserSchema);

export default PromptUser;

// The "models" object is provided by the Mongoose Library and stores aLL the registered models.
// If a modeL named "PromptUser" aLready exists in the "models" object, it assigns that existing model to the "PromptUser" variabLe.
// This prevents redefining the model and ensures that the existing model is reused. 
// If a model named "PromptUser" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model
// The newly created model is then assigned to the "PromptUser" variabLe. 
