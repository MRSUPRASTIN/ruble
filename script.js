// ТВОЙ ОРИГИНАЛЬНЫЙ МАССИВ С ТВОИМИ 26 ВИДЕО
// (Вставь сюда свои 26 объектов, если ты их случайно стёр из файла)
const videoData = [
    {
        id: "video-1",
        title: "Старое название",
        duration: "45:00",
        views: "1.2 млн просмотров",
        date: "2 дня назад",
        videoUrl: "твое_видео1.mp4", // Тут автоматически останутся твои файлы
        previewUrl: "твое_превью1.png"
    },
    // ... и так далее все твои 26 видео до самого конца ...
];

// Автоматическое переименование: этот цикл берет ТВОИ видео и меняет ТОЛЬКО названия
videoData.forEach((video, index) => {
    video.title = `Сериал Жена врага народа ${index + 1} серия`;
});

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
        player.src = video.videoUrl; // Сюда подставится именно твой рабочий путь к файлу
        
        modal.classList.remove('hidden');
        player.play().catch(err => console.log("Автовоспроизведение заблокировано"));
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

// Запуск
document.addEventListener('DOMContentLoaded', renderVideos);
