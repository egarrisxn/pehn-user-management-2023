import express from 'express';

const router = express.Router();

const users = [
  { id: 1, name: 'Michael Johnson', email: 'michael.johnson@example.com' },
  { id: 2, name: 'Sarah Williams', email: 'sarah.williams@example.com' },
  { id: 3, name: 'David Brown', email: 'david.brown@example.com' },
  { id: 4, name: 'Michelle Davis', email: 'michelle.davis@example.com' },
  { id: 5, name: 'Christopher Wilson', email: 'christopher.wilson@example.com' },
  { id: 6, name: 'Amanda Martinez', email: 'amanda.martinez@example.com' },
  { id: 7, name: 'Daniel Rodriguez', email: 'daniel.rodriguez@example.com' },
  { id: 8, name: 'Jennifer Lee', email: 'jennifer.lee@example.com' },
  { id: 9, name: 'Matthew Taylor', email: 'matthew.taylor@example.com' },
  { id: 10, name: 'Jessica Garcia', email: 'jessica.garcia@example.com' },
  { id: 11, name: 'Ryan Thompson', email: 'ryan.thompson@example.com' },
  { id: 12, name: 'Emily Harris', email: 'emily.harris@example.com' },
  { id: 13, name: 'Andrew Martinez', email: 'andrew.martinez@example.com' },
  { id: 14, name: 'Nicole Clark', email: 'nicole.clark@example.com' },
  { id: 15, name: 'James Allen', email: 'james.allen@example.com' },
  { id: 16, name: 'Samantha Wright', email: 'samantha.wright@example.com' },
  { id: 17, name: 'Kevin Scott', email: 'kevin.scott@example.com' },
  { id: 18, name: 'Alexis Lopez', email: 'alexis.lopez@example.com' },
  { id: 19, name: 'Brian Hill', email: 'brian.hill@example.com' },
  { id: 20, name: 'Lauren King', email: 'lauren.king@example.com' }
];

//! GET / - Redirects to /users
router.get('/', (req, res) => {
  res.redirect('/users');
});
//! GET /users
router.get('/users', (req, res) => {
  res.render('index', { action: '', users, user: {} });
});
//! GET /users/new
router.get('/users/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { user: {} });
  } else {
    res.render('index', { action: 'new', users, user: {} });
  }
});
//! GET /users/1
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((c) => c.id === Number(id));
  if (req.headers['hx-request']) {
    res.render('user', { user });
  } else {
    res.render('index', { action: 'show', users, user });
  }
});
//! GET /users/1/edit
router.get('/users/:id/edit', (req, res) => {
  const { id } = req.params;
  const user = users.find((c) => c.id === Number(id));
  if (req.headers['hx-request']) {
    res.render('form', { user });
  } else {
    res.render('index', { action: 'edit', users, user });
  }
});
//! POST /users
router.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  if (req.headers['hx-request']) {
    res.render('list', { users }, (err, listHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Successfully added!</p>
        </main>
        ${listHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', users, user: {} });
  }
});
//! PUT /users/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const newUser = {
    id: Number(id),
    name: req.body.name,
    email: req.body.email,
  };
  const index = users.findIndex((c) => c.id === Number(id));
  if (index !== -1) users[index] = newUser;
  if (req.headers['hx-request']) {
    res.render('list', { users }, (err, listHtml) => {
      res.render('user', { user: users[index] }, (err, userHTML) => {
        const html = `
          ${listHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Successfully updated!</p>
            ${userHTML}
          </main>
        `;
        res.send(html);
      });
    });
  } else {
    res.redirect(`/users/${index + 1}`);
  }
});
//! DELETE /users/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((c) => c.id === Number(id));
  if (index !== -1) users.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('list', { users }, (err, listHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Successfully deleted!</p>
        </main>
        ${listHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/users');
  }
});

export default router;