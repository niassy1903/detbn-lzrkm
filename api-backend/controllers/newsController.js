import News from '../models/News.js';

export const getNews = async (req, res) => {
  try {
    const news = await News.find({}).sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      res.json(newsItem);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    const createdNews = await news.save();
    res.status(201).json(createdNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      Object.assign(newsItem, req.body);
      const updatedNews = await newsItem.save();
      res.json(updatedNews);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (newsItem) {
      await News.findByIdAndDelete(req.params.id);
      res.json({ message: 'News removed' });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
