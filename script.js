// Имитация базы данных видео (используем бесплатные open-source ролики)
const videos = [
    {
        id: 1,
        title: "Изумительная дикая природа — Взгляд изнутри",
        author: "EcoPlanet",
        views: "154K",
        time: "3 дня назад",
        duration: "0:15",
        thumbnail: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop",
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
        id: 2,
        title: "Большое путешествие: Как устроен мир технологий в 2026",
        author: "TechRumble",
        views: "12M",
        time: "5 часов назад",
        duration: "0:10",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4"
    },
    {
        id: 3,
        title: "Секреты кулинарии от шефа: Идеальный стейк дома",
        author: "ChefMaster",
        views: "89K",
        time: "1 неделю назад",
        duration: "0:15",
        thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop",
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4"
    },
    {
        id: 4,
        title: "Обзор суперкара будущего — Полный тест-драйв",
        author: "AutoRumble",
        views: "430K",
        time: "2 дня назад",
        duration: "0:10",
        thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop",
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4"
    }
];

// Рендеринг видеокарт на главную страницу
const videoGrid = document.getElementById('video-grid');

function displayVideos() {
    videoGrid.innerHTML = videos.map(video => `
        <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition duration-200 group" onclick="openPlayer(${video.id})">
            <div class="relative aspect-video bg-gray-900">
                <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover group-hover:opacity-90">
                <span class="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-bold">${video.duration}</span>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-sm line-clamp-2 group-hover:text-green-400 transition mb-1">${video.title}</h3>
                <p class="text-xs text-gray-400 font-medium mb-1">${video.author}</p>
                <div class="flex items-center text-[11px] text-gray-500 space-x-2">
                    <span>${video.views} просмотров</span>
                    <span>•</span>
                    <span>${video.time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Функции плеера
const modal = document.getElementById('video-modal');
const player = document.getElementById('main-player');

function openPlayer(id) {
    const video = videos.find(v => v.id === id);
    if (!video) return;

    document.getElementById('modal-video-title').innerText = video.title;
    document.getElementById('modal-video-views').innerText = `${video.views} просмотров • ${video.time}`;
    
    player.src = video.videoUrl;
    modal.classList.remove('hidden');
    player.play();
}

function closePlayer() {
    modal.classList.add('hidden');
    player.pause();
    player.src = "";
}

// Закрытие по клику вне окна
modal.addEventListener('click', (e) => {
    if (e.target === modal) closePlayer();
});

// Запуск приложения
displayVideos();