import express from 'express';
import { Request, Response,NextFunction } from "express";
import mongoose from 'mongoose';
import { Note } from './models';
import axios from 'axios';
export const noteRouter = express.Router();

const notebookApiUrl = process.env.NOTEBOOK_API_URL
const validateId = (req: Request, res: Response, next: NextFunction) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Note not found'});
    }
    next();
 }

export const errorHandling = (err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json({error: err.message});
}

noteRouter.post('/', async (req,res,next)=>{
    try {
        const { title, content, notebookId } =  req.body;

        let validateNotebookId= null;

        if(!notebookId) {
            console.info("Notebook id is not provided")
        } else if(!mongoose.Types.ObjectId.isValid(notebookId)) {
            return res.status(400).json({error: "notebookId not found", notebookId});
        } else {
            try {
                await axios.get(`${notebookApiUrl}/${notebookId}`)
            }catch (err) {
                console.error(err);
            }finally{
                validateNotebookId = notebookId;
            }
        }
     
        if(!title || !content) {
            return res.status(400).json({error: "'title','content' field are required"});
        }
        const note = new Note({title, content,validateNotebookId});
        await note.save();
        res.status(201).json(note)

    } catch (err) {
        next(err);
    }

});


noteRouter.get('/', async (req,res,next)=>{
    try {
        const notes = await Note.find();
       return res.json(notes)

    } catch (err) {
        next(err);
    }

});

 noteRouter.put('/:id', validateId, async (req,res,next)=>{
    try {
        const { title, content} =  req.body;
        const note = await Note.findByIdAndUpdate(req.params.id,
             { title, content }, { new :true });
        if(!note) {
            return res.status(404).json({error: 'Note not found'});
        }

       return res.json(note)

    } catch (err) {
        next(err);
    }

 });

 noteRouter.get('/:id', validateId, async (req,res,next)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({error: 'Note not found'});
        }

       return res.json(note)

    } catch (err) {
        next(err);
    }
 });

 noteRouter.delete('/:id', validateId, async(req,res,next)=>{
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note) {
            return res.status(404).json({error: 'Note not found'});
        }

       return res.status(204)

    } catch (err) {
        next(err);
    }

 });
