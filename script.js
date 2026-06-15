// АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ СПИСКА СЕРИЙ (ВСЕ СЕРИИ СРАЗУ)
const videoData = [];
const totalEpisodes = 26; // Здесь укажи общее количество серий, если их больше или меньше

for (let i = 1; i <= totalEpisodes; i++) {
    // Генерируем реалистичную статистику для каждой серии, как на настоящем YouTube
    let views = "1.2 млн просмотров";
    let date = `${Math.min(i, 7)} дн. назад`;
    let duration = "48:15";
    
    if (i === totalEpisodes) { 
        views = "Новинка"; 
        date = "Только что"; 
        duration = "52:40"; 
    } else if (i === totalEpisodes - 1) { 
        views = "95 тыс. просмотров"; 
        date = "2 часа назад"; 
        duration = "46:10"; 
    } else if (i > 15) { 
        views = `${500 - i * 10} тыс. просмотров`; 
        date = "1 день назад"; 
        duration = "45:30"; 
    }

    // Добавляем серию в общий список
    videoData.push({
        id: `series-${i}`,
        title: `Сериал Жена врага народа ${i} серия`,
        duration: duration,
        views: views,
        date: date,
        videoUrl: `video${i}.mp4`, // Ссылка на видеофайл (video1.mp4, video2.mp4...)
        previewUrl: `preview${i}.png` // Ссылка на превью картинку (preview1.png, preview2.png...)
    });
}

// ФУНКЦИЯ ДЛЯ ОТРИСОВКИ КАРТОЧЕК НА СТРАНИЦЕ
function renderVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    videoGrid.innerHTML = ''; // Очищаем сетку

    videoData.forEach(video => {
        const card = document.createElement('div');
        card.className = 'flex flex-col cursor-pointer group';
        card.onclick = () => openPlayer(video);

        card.innerHTML = `
            <div class="relative aspect-video w-full bg-gray-900 rounded-xl overflow-hidden mb-3">
                <img src="${video.previewUrl}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-102 transition duration-200" onerror="this.src='https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop'">
                <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded">${video.duration}</span>
            </div>
            
            <div class="flex space-x-3 px-1">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-indigo-700 flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-inner">
                    YX
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-gray-200">${video.title}</h3>
                    <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">YouTubeX Мега Сериалы <i class="fas fa-check-circle text-gray-500 text-[10px]"></i></p>
                    <div class="text-xs text-gray-400 mt-0.5 flex items-center space-x-1">
                        <span>${video.views}</span>
                        <span class="before:content-['•'] before:mr-1">${video.date}</span>
                    </div>
                </div>
            </div>
        `;
        
        videoGrid.appendChild(card);
    });
}

// ФУНКЦИИ МОДАЛЬНОГО ПЛЕЕРА
function openPlayer(video) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-player');
    const modalTitle = document.getElementById('modal-video-title');
    const modalViews = document.getElementById('modal-video-views');

    if (modal && player) {
        modalTitle.textContent = video.title;
        modalViews.textContent = `${video.views} • ${video.date}`;
        player.src = video.videoUrl;
        
        modal.classList.remove('hidden');
        player.play().catch(err => console.log("Автовоспроизведение заблокировано браузером"));
    }
}

function closePlayer() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-player');

    if (modal && player) {
        modal.classList.add('hidden');
        player.pause();
        player.src = ''; 
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', renderVideos);
