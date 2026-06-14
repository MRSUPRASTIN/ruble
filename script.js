// НАСТРОЙКА РЕПОЗИТОРИЯ
const GITHUB_USERNAME = "MRSUPRASTIN"; 
const REPO_NAME = "ruble";             
const VIDEO_FOLDER = "my-videos";      

// Ссылка на официальное API GitHub для сканирования папки
const githubApiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${VIDEO_FOLDER}`;

const videoGrid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('main-player');

// Функция автоматической загрузки списка видео с серверов GitHub
async function loadVideosFromGithub() {
    try {
        // Запрашиваем у GitHub список файлов в папке my-videos
        const response = await fetch(githubApiUrl);
        if (!response.ok) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">Папка '${VIDEO_FOLDER}' не найдена. Загрузите туда файлы через GitHub!</p>`;
            return;
        }
        
        const files = await response.json();
        
        // Отбираем только видеофайлы, игнорируя системные файлы вроде .gitkeep
        const videoFiles = files.filter(file => 
            file.name.toLowerCase().endsWith('.mp4') || 
            file.name.toLowerCase().endsWith('.webm') || 
            file.name.toLowerCase().endsWith('.mov')
        );

        if (videoFiles.length === 0) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">В папке '${VIDEO_FOLDER}' пока нет видеофайлов.</p>`;
            return;
        }

        // Очищаем сетку перед выводом
        videoGrid.innerHTML = "";
        
        // Циклом создаем карточки для каждого найденного видео
        videoFiles.forEach((file) => {
            // Прямая ссылка на сам файл для плеера
            const rawVideoUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${VIDEO_FOLDER}/${encodeURIComponent(file.name)}`;
            
            // Форматируем красивое название (убираем расширение файла и меняем дефисы на пробелы)
            const videoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

            const card = document.createElement('div');
            card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition duration-200 group";
            
            // Используем autoplay loop muted для отображения живого превью в обход CORS
            card.innerHTML = `
                <div class="relative aspect-video bg-gray-950 flex items-center justify-center overflow-hidden">
                    <video 
                        src="${rawVideoUrl}" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        loading="lazy"
                        class="w-full h-full object-cover absolute inset-0 z-10 opacity-100 transition duration-300">
                    </video>
                    <div class="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <i class="fas fa-spinner fa-spin text-gray-600 text-2xl"></i>
                    </div>
                </div>
                <div class="p-4 relative z-20 bg-gray-800">
                    <h3 class="font-semibold text-sm line-clamp-2 group-hover:text-green-400 transition mb-1">${videoTitle}</h3>
                    <p class="text-xs text-gray-400 font-medium mb-1">Мой Канал</p>
                    <div class="flex items-center text-[11px] text-gray-500 space-x-2">
                        <span>Смотреть</span>
                        <span>•</span>
                        <span>GitHub Cloud</span>
                    </div>
                </div>
            `;
            
            card.onclick = () => openPlayer(videoTitle, rawVideoUrl);
            videoGrid.append(card);
        });

    } catch (error) {
        console.error("Ошибка сети:", error);
        videoGrid.innerHTML = `<p class="text-red-400 col-span-full text-center py-10">Не удалось связаться с сервером хранения.</p>`;
    }
}

// Функции главного плеера
function openPlayer(title, url) {
    document.getElementById('modal-video-title').innerText = title;
    document.getElementById('modal-video-views').innerText = "Воспроизведение напрямую из GitHub";
    
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

// Запуск сканирования при открытии сайта
loadVideosFromGithub();
