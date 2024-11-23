/* eslint-disable no-undef */
const notesDb = process.env.NOTES_DB_NAME;
const notesUser = process.env.NOTES_DB_USER;
const notesPwd = process.env.NOTES_DB_PASSWORD;

console.log('INITIALIZING: Notes DB User')
db = db.getSiblingDB(notesDb);
db.createUser({
    user: notesUser,
    pwd: notesPwd,
    roles : [
        {
            role: 'readWrite',
            db: notesDb
        }
        
    ]
});