document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.carnews.com/latest') // Use a valid API for car news
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('news-item');
                articleDiv.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(articleDiv);
            });
        })
        .catch(error => {
            console.error('Error loading car news:', error);
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = 'Failed to load news. Please try again later.';
        });
});
