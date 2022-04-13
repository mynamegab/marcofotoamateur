import mongoose from 'mongoose';

export const ForModel = ['Picture', 'Album']

const definition = {
	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	type: {
	  	type: String,
		required: true,
	  	enum: ForModel,
		index: true
  	}
};

const schema = new mongoose.Schema(definition, { timestamps: true });

export default mongoose.model('Tag', schema);