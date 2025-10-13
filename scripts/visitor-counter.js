fetch('https://visitor-counter.bluecreeper512.workers.dev')
    .then(response => response.json())
    .then(data => {
      document.getElementById('visitor-count').textContent = data.formattedCount;
    })
    .catch(err => console.error('Error fetching visitor count:', err));