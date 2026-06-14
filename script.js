// НАСТРОЙКА ВАШЕГО РЕПОЗИТОРИЯ (Заполните своими данными)
const GITHUB_USERNAME = "ВАШ_ЛОГИН_НА_GITHUB"; // Например: ivan-petrov
const REPO_NAME = "rumble-clone";             // Название вашего репозитория
const VIDEO_FOLDER = "my-videos";              // Название папки с видео внутри репозитория

// Ссылка на API GitHub для чтения файлов из папки
const githubApiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${VIDEO_FOLDER}`;

const videoGrid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('main-player');

// Функция загрузки списка видео с GitHub
async function loadVideosFromGithub() {
    try {
        const response = await fetch(githubApiUrl);
        if (!response.ok) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">Папка '${VIDEO_FOLDER}' не найдена или пуста. Загрузите туда .mp4 файлы!</p>`;
            return;
        }
        
        const files = await response.json();
        
        // Фильтруем только видеофайлы (mp4, webm, mov)
        const videoFiles = files.filter(file => 
            file.name.endsWith('.mp4') || 
            file.name.endsWith('.webm') || 
            file.name.endsWith('.mov')
        );

        if (videoFiles.length === 0) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">В папке '${VIDEO_FOLDER}' нет видеофайлов.</p>`;
            return;
        }

        // Очищаем сетку и выводим видео
        videoGrid.innerHTML = "";
        
        videoFiles.forEach((file, index) => {
            // Ссылка для скачивания/воспроизведения файла напрямую с GitHub
            const rawVideoUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${VIDEO_FOLDER}/${encodeURIComponent(file.name)}`;
            
            // Красивое название видео (убираем расширение .mp4 и заменяем дефисы на пробелы)
            const videoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

            // Создаем карточку видео
            const card = document.createElement('div');
            card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition duration-200 group";
            card.innerHTML = `
                <div class="relative aspect-video bg-gray-950 flex items-center justify-center">
                    <!-- Заглушка вместо превью, так как у нас нет картинок -->
                    <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:opacity-85 transition flex flex-col items-center justify-center text-center p-4">
                        <i class="fas fa-video text-3xl text-green-500 mb-2"></i>
                        <span class="text-xs font-semibold text-gray-400 max-w-full truncate">${file.name}</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-sm line-clamp-2 group-hover:text-green-400 transition mb-1">${videoTitle}</h3>
                    <p class="text-xs text-gray-400 font-medium mb-1">Мой Канал</p>
                    <div class="flex items-center text-[11px] text-gray-500 space-x-2">
                        <span>Смотреть</span>
                        <span>•</span>
                        <span>GitHub Storage</span>
                    </div>
                </div>
            `;
            
            // При клике открываем плеер
            card.onclick = () => openPlayer(videoTitle, rawVideoUrl);
            videoGrid.append(card);
        });

    } catch (error) {
        console.error("Ошибка при получении видео:", error);
        videoGrid.innerHTML = `<p class="text-red-400 col-span-full text-center py-10">Не удалось загрузить видео. Проверьте настройки скрипта.</p>`;
    }
}

// Функции управления плеером
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

// Запуск автоматического поиска видео при открытии сайта
loadVideosFromGithub();
