import express, {Request, Response} from 'express';

// Create an Express object and routes (in order)
const app = express();
app.use('/users/:id', async (req:Request, res: Response) => {res.send(`User ID: ${req.params.id}`)});

// Set our GCF handler to our Express app.
exports.entryPoint = app;
