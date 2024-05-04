const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Grade = require('./models/grade');
const calculateAverageGrade = require('./public/utils'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Подключение к базе данных MongoDB
const db = 'mongodb+srv://Baha:Baha2003.@cluster0.q2mgor5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    const averageGrade = calculateAverageGrade(grades.map(grade => grade.grade)); 
    res.render('home', { grades, averageGrade }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}
app.post('/grades', async (req, res) => {
  try {
    const { firstName, lastName, subject, grade, date, semester } = req.body;
    const formattedDate = formatDate(date); 
    const newGrade = new Grade({ firstName, lastName, subject, grade, date: formattedDate, semester });
    await newGrade.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/search', async (req, res) => {
  try {
    const searchQuery = req.body.searchQuery;
    const students = await Grade.find({
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } }, 
        { lastName: { $regex: searchQuery, $options: 'i' } }, 
      ]
    });
    res.render('searchResults', { students, searchQuery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/search', (req, res) => {
  res.redirect('/');
});

app.delete('/clear-data', async (req, res) => {
  try {
    // Удаление всех данных из базы данных (например, всех оценок)
    await Grade.deleteMany();
    res.status(200).send('Данные успешно удалены из базы данных');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
