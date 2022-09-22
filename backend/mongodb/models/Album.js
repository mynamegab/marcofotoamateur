import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
	assetId: {
		type: String,
		required: true,
		unique: true,
		sparse: true,
	},
	hidden: {
        type: Boolean,
        default: false
    },
	format: {
		type: String,
		required: true
	},
	title: String,
	description: String
}, { timestamps: true });

const albumSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
    pictures: [pictureSchema],
	hidden: {
        type: Boolean,
        default: false
    },
    type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'AlbumType'
	}
}, { timestamps: true });

export default mongoose.model('Album', albumSchema);