const API = 'http://localhost:5000/api/admin';

// === Add Project ===
document.getElementById('projectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch(`${API}/projects`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  alert(data.message);
  form.reset();
  loadProjects();
});

// === Add Client ===
document.getElementById('clientForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch(`${API}/clients`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  alert(data.message);
  form.reset();
  loadClients();
});

// === Load Projects ===
async function loadProjects() {
  const res = await fetch(`${API}/projects`);
  const projects = await res.json();
  const list = document.getElementById('projectList');
  list.innerHTML = projects.map(p => `
    <div>
      <img src="http://localhost:5000/${p.image}" width="100" />
      <p><strong>${p.name}</strong>: ${p.description}</p>
    </div>
  `).join('');
}

// === Load Clients ===
async function loadClients() {
  const res = await fetch(`${API}/clients`);
  const clients = await res.json();
  const list = document.getElementById('clientList');
  list.innerHTML = clients.map(c => `
    <div>
      <img src="http://localhost:5000/${c.image}" width="100" />
      <p><strong>${c.name}</strong> (${c.designation}): ${c.description}</p>
    </div>
  `).join('');
}

// === Load Contacts ===
async function loadContacts() {
  const res = await fetch(`${API}/contacts`);
  const contacts = await res.json();
  const list = document.getElementById('contactList');
  list.innerHTML = contacts.map(c => `
    <li>${c.fullName} (${c.email}) - ${c.mobile}, ${c.city}</li>
  `).join('');
}

// === Load Subscribers ===
async function loadSubscribers() {
  const res = await fetch(`${API}/subscribers`);
  const subscribers = await res.json();
  const list = document.getElementById('subscriberList');
  list.innerHTML = subscribers.map(s => `<li>${s.email}</li>`).join('');
}

// === Initial Load ===
loadProjects();
loadClients();
loadContacts();
loadSubscribers();
