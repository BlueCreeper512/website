const WORKER_URL = "https://worker-guestbook.bluecreeper512.workers.dev";

document.getElementById("guestbookForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const token = turnstile.getResponse();

  const res = await fetch(`${WORKER_URL}/post`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ name, message, token })
  });

  if (res.ok) {
	turnstile.reset();
	document.getElementById('guestbookForm').reset();
	loadMessages();
  } else {
	alert(await res.text());
  }
});

async function loadMessages() {
  const res = await fetch(`${WORKER_URL}/messages`);
  const data = await res.json();
  const container = document.getElementById('entries');
  container.innerHTML = '';
  data.forEach(m => {
	const div = document.createElement('div');
	div.textContent = `${m.name}: ${m.message}`;
	container.appendChild(div);
  });
}

loadMessages();