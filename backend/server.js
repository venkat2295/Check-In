import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://coding2295:ecorsa2295@cluster0.zekrsxs.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define User schema and model
const userSchema = new mongoose.Schema({
  Name: String,
  EmailID: String,
  CollegeName: String,
  checked: Boolean
});

const User = mongoose.model('User', userSchema);

// Define routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

app.get('/users/search', async (req, res) => {
  const { name } = req.query;
  try {
    const users = await User.find({ Name: new RegExp(name, 'i') }); // Case-insensitive search
    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

// Endpoint to update user status
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { checked } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { checked }, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).send({ message: 'Internal Server Error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});