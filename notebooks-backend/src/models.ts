import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotebookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    }
},
{ timestamps: true}
)

export const Notebook = mongoose.model('Notebook', NotebookSchema);


module.exports ={
    Notebook
}