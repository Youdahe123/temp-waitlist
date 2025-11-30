import { MongoClient } from 'mongodb';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, fullname, position } = req.body;

    // Validate required fields
    if (!email || !fullname || !position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('waitlist');
    const collection = db.collection('submissions');

    // Check if email already exists
    const existingEntry = await collection.findOne({ email });

    if (existingEntry) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert into database
    const result = await collection.insertOne({
      email,
      fullname,
      position,
      created_at: new Date()
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: result.insertedId,
        email,
        fullname,
        position,
        created_at: new Date()
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({
      error: 'Failed to add to waitlist',
      details: error.message
    });
  }
}
