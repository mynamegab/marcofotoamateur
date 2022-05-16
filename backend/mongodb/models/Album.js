import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
	assetId: {
		type: String,
		required: true,
		unique: true
	},
	hidden: {
        type: Boolean,
        default: false
    },
	format: {
		type: String,
		required: true
	},
	description: String,
	tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

const albumSchema = new mongoose.Schema({
    name: String,
    description: String,
    pictures: [pictureSchema],
	hidden: {
        type: Boolean,
        default: false
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);