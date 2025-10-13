  const clock = document.getElementById("clock");
    function updateClock() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const offsetTime = new Date(utc + 9 * 3600000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    
    const formatted = offsetTime.toLocaleString("en-SE", options);
    clock.textContent = formatted;
    
  }
  

  updateClock();
  setInterval(updateClock, 1000);