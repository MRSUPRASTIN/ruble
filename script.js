// НАСТРОЙКА РЕПОЗИТОРИЯ
const GITHUB_USERNAME = "MRSUPRASTIN"; 
const REPO_NAME = "ruble";             
const VIDEO_FOLDER = "my-videos";      

// СПИСОК ТВОИХ ВИДЕО (Имена файлов должны СТРОГО совпадать с тем, что лежит в папке на GitHub)
// Я уже перенес сюда все твои 4 файла со скриншота!
const myVideoFiles = [
    "274b4d60-1251-4404-942a-610559c81ffa.mp4",
    "41553a42-ad12-41f2-be6d-9fd642a02f07.mp4",
    "7c8d3f20-669f-48fb-85f2-4fd1f8fccd2b.mp4",
    "8.mp4"
];

const videoGrid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('main-player');

// Функция отображения видеороликов
function displayVideos() {
    if (myVideoFiles.length === 0) {
        videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">Список видео пуст.</p>`;
        return;
    }

    videoGrid.innerHTML = "";
    
    myVideoFiles.forEach((fileName) => {
        // Формируем прямую ссылку на файл на серверах GitHub
        const rawVideoUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${VIDEO_FOLDER}/${encodeURIComponent(fileName)}`;
        
        // Делаем красивое название (убираем .mp4 и превращаем дефисы в пробелы)
        const videoTitle = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

        // Генерируем карточку
        const card = document.createElement('div');
        card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition duration-200 group";
        card.innerHTML = `
            <div class="relative aspect-video bg-gray-950 flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:opacity-85 transition flex flex-col items-center justify-center text-center p-4">
                    <i class="fas fa-video text-3xl text-green-500 mb-2"></i>
                    <span class="text-xs font-semibold text-gray-400 max-w-full truncate px-2">${fileName}</span>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-sm line-clamp-2 group-hover:text-green-400 transition mb-1">${videoTitle}</h3>
                <p class="text-xs text-gray-400 font-medium mb-1">Мой Канал</p>
                <div class="flex items-center text-[11px] text-gray-500 space-x-2">
                    <span>Смотреть</span>
                    <span>•</span>
                    <span>GitHub HQ</span>
                </div>
            </div>
        `;
        
        card.onclick = () => openPlayer(videoTitle, rawVideoUrl);
        videoGrid.append(card);
    });
}

// Функции плеера
function openPlayer(title, url) {
    document.getElementById('modal-video-title').innerText = title;
    document.getElementById('modal-video-views').innerText = "Воспроизведение из репозитория GitHub";
    
    player.src = url;
    modal.classList.remove('hidden');
    player.play();
}

function closePlayer() {
    modal.classList.add('hidden');
    player.pause();
    player.src = "";
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closePlayer();
});

// Запуск отрисовки видео
displayVideos();
