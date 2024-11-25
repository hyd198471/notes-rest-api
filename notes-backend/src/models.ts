import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        default: null
    },
    notebookId: {
        type: Schema.Types.ObjectId,
        required: false,
        default: null
    }
},
{ timestamps: true}
)

export const Note = mongoose.model('Note', NoteSchema);
