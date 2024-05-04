
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); 
      const searchInput = document.getElementById('searchInput');
      const searchQuery = searchInput.value.trim(); // Получить значение
      const response = await fetch('/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchQuery }) // Отправить запрос на сервер с данными поиска
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Ошибка при выполнении поискового запроса');
      }
    });

  });
  
  