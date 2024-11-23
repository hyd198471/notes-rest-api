/* eslint-disable no-undef */
const notesDb = process.env.NOTEBOOKS_DB_NAME;
const notesUser = process.env.NOTEBOOKS_DB_USER;
const notebooksPwd = process.env.NOTEBOOKS_DB_PASSWORD;

console.log('INITIALIZING: Notebook DB User')
db = db.getSiblingDB(notesDb);
db.createUser({
    user: notesUser,
    pwd: notebooksPwd,
    roles : [
        {
            role: 'readWrite',
            db: notesDb
        }
        
    ]
});