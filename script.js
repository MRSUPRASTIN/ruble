// ВОЗВРАЩАЕМ ВСЕ 26 ВИДЕО С РАБОЧИМИ ССЫЛКАМИ
const videoData = [];
const totalEpisodes = 26;

// Набор тестовых рабочих стримов, чтобы видео точно запускались и не были пустыми
const streamUrls = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
];

const samplePreviews = [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478720143033-6a972678da30?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542204172-e7052809a86e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop"
];

// Генерируем массив обратно до 26 видеороликов
for (let i = 1; i <= totalEpisodes; i++) {
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
    }

    videoData.push({
        id: `video-${i}`,
        title: `Сериал Жена врага народа ${i} серия`,
        duration: duration,
        views: views,
        date: date,
        videoUrl: streamUrls[(i - 1) % streamUrls.length], // Распределяем рабочие ссылки
        previewUrl: samplePreviews[(i - 1) % samplePreviews.length] // Разные превью
    });
}

// ФУНКЦИЯ ДЛЯ ОТРИСОВКИ КАРТОЧЕК НА СТРАНИЦЕ
function renderVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    videoGrid.innerHTML = ''; 

    videoData.forEach(video => {
        const card = document.createElement('div');
        card.className = 'flex flex-col cursor-pointer group';
        card.onclick = () => openPlayer(video);

        card.innerHTML = `
            <div class="relative aspect-video w-full bg-gray-900 rounded-xl overflow-hidden mb-3">
                <img src="${video.previewUrl}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-102 transition duration-200">
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
