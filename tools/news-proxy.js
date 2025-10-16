const express = require('express');
const cors = require('cors');

const app = express(); 
const PORT = 4001;
const DISCOURSE_BASE_URL = 'https://precice.discourse.group';

// Applying CORS to all requests coming to the proxy
app.use(cors());

// Route for the main topic list
app.get('/news', async (req, res) => {
    try {
        // Using native fetch
        const response = await fetch(`${DISCOURSE_BASE_URL}/c/5.json`);
        const data = await response.json();
        
        const topics = data.topic_list.topics; 
        
        res.json(topics);
    } catch (error) {
        console.error('Proxy error fetching topic list:', error);
        res.status(500).json({ error: 'Failed to fetch topic list from Discourse.' });
    }
});

// Route to handle individual topics
app.get('/t/:id.json', async (req, res) => {
    const topicId = req.params.id;
    const discourseUrl = `${DISCOURSE_BASE_URL}/t/${topicId}.json`;

    try {
        // Using native fetch
        const response = await fetch(discourseUrl);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Topic not found on Discourse.' });
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Proxy error fetching topic ID ${topicId}:`, error);
        res.status(500).json({ error: `Failed to fetch topic ID ${topicId} from Discourse.` });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://127.0.0.1:${PORT}`);
});