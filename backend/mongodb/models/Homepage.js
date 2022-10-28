import mongoose from 'mongoose';

const definition = {
	id: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	picturesOfTheMoment: [
        {
            pictureId: String
        }
    ]
};

const schema = new mongoose.Schema(definition, { timestamps: true });

export default mongoose.model('Homepage', schema);