import mongoose from 'mongoose';

const definition = {
	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	}
};

const schema = new mongoose.Schema(definition, { timestamps: true });

export default mongoose.model('AlbumType', schema);