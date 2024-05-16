const fs = require('fs');
const USERS_FILE_PATH = 'users.json';

// Получение всех пользователей
app.get('/users', (req, res) => {
  fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(JSON.parse(data));
  });
});

// Получение одного пользователя по ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  });
});

// Создание пользователя
app.post('/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).send('User created successfully');
    });
  });
});

// Обновление пользователя
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    let users = JSON.parse(data);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return res.status(404).send('User not found');
    }
    users[index] = { ...users[index], ...updatedUser };
    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.send('User updated successfully');
    });
  });
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(USERS_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    let users = JSON.parse(data);
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return res.status(404).send('User not found');
    }
    users.splice(index, 1);
    fs.writeFile(USERS_FILE_PATH, JSON.stringify(users), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.send('User deleted successfully');
    });
  });
});
