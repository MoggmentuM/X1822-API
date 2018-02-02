var ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db){
    
    //C=Create
    app.post('/notes', (req, res) => {

        const myDB = db.db('notesdb112');
        myDB.collection('notes');

        const note = { text: req.body.body, title: req.body.title };
        myDB.collection('notes').insert(note, (err, result)=>{
            if (err){
                res.send({'error': 'an error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
        console.log(req.body); //{ title: xxx, body: xxx}
        //res.send('hello from post');
    });
    
    //R=Read
    app.get('/notes/:id', (req, res) => {

        const myDB = db.db('notesdb112');
        const id = req.params.id;
        const details = {'_id' : new ObjectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err){
                res.send({'error': 'an error again...'});
            } else {
                res.send(item);
            }
        });
        console.log('asking for a note');
        //res.send('this should be a returned note');
    });

    //U=Update
    app.put('/notes/:id', (req, res) => {
        
                const myDB = db.db('notesdb112');
                const id = req.params.id;
                const details = {'_id' : new ObjectId(id)};
                const note = {text: req.body.body, title: req.body.title};
                myDB.collection('notes').findOne(details, note, (err, item) => {
                    if (err){
                        res.send({'error': 'an error again...'});
                    } else {
                        res.send(item);
                    }                    
                });
                console.log('updating notes');
            });
    
    //D=Delete
    app.delete('/notes/:id', (req, res) => {
        
                const myDB = db.db('notesdb112');
                const id = req.params.id;
                const details = {'_id' : new ObjectId(id)};
                
                myDB.collection('notes').remove(details, (err, item) => {
                    if (err){
                        res.send({'error': 'an error again...'});
                    } else {
                        res.send('Note '+ id + ' got deleted!');
                    }                    
                });
                console.log('deleted note');
            });
};