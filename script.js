// НАСТРОЙКА РЕПОЗИТОРИЯ
const GITHUB_USERNAME = "MRSUPRASTIN"; 
const REPO_NAME = "ruble";              
const VIDEO_FOLDER = "my-videos";       

const videoGrid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('main-player');

// Функция генерации красивых случайных просмотров
function getRandomViews() {
    const views = Math.floor(Math.random() * 95000) + 500; 
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + " тыс. просмотров";
    }
    return views + " просмотров";
}

// Абсолютно надежный автоматический поиск ВСЕХ видео через Git Trees
async function loadAllVideos() {
    videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10"><i class="fas fa-spinner fa-spin mr-2"></i> Сканируем папку, ищем абсолютно все видео...</p>`;

    try {
        // Запрашиваем полное дерево файлов главной ветки, добавляя случайный параметр против кэширования браузером
        const treeUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/git/trees/main?recursive=1&nocache=${Date.now()}`;
        const response = await fetch(treeUrl);
        
        if (!response.ok) {
            throw new Error("Не удалось загрузить дерево файлов репозитория");
        }

        const data = await response.json();
        
        // Фильтруем файлы: они должны лежать в папке my-videos и заканчиваться на .mp4
        const videoFiles = data.tree.filter(file => 
            file.path.startsWith(VIDEO_FOLDER + '/') && 
            file.path.toLowerCase().endsWith('.mp4')
        );

        if (videoFiles.length === 0) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">В папке '${VIDEO_FOLDER}' не найдено ни одного .mp4 файла!</p>`;
            return;
        }

        // Стираем прелоадер
        videoGrid.innerHTML = "";

        // Отрисовываем абсолютно все найденные файлы
        videoFiles.forEach((file, index) => {
            // Формируем прямую ссылку на скачивание твоего оригинального видео
            const rawVideoUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${file.path}`;
            
            // АВТОМАТИЧЕСКАЯ ПОДМЕНА НАЗВАНИЯ НА СЕРИАЛ ПО ПОРЯДКУ
            const videoTitle = `Сериал Жена врага народа ${index + 1} серия`;
            const randomViewsCount = getRandomViews();

            const card = document.createElement('div');
            card.className = "bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition duration-200 group";
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
                        <span>${randomViewsCount}</span>
                        <span>•</span>
                        <span>GitHub HQ</span>
                    </div>
                </div>
            `;
            
            card.onclick = () => openPlayer(videoTitle, rawVideoUrl, randomViewsCount);
            videoGrid.append(card);
        });

    } catch (error) {
        console.error(error);
        videoGrid.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-red-400 font-medium">Ошибка поиска видеороликов.</p>
                <p class="text-xs text-gray-500 mt-1">Браузер заблокировал запрос или превышен лимит GitHub API. Попробуй зайти позже.</p>
            </div>
        `;
    }
}

// Управление плеером
function openPlayer(title, url, views) {
    document.getElementById('modal-video-title').innerText = title;
    document.getElementById('modal-video-views').innerText = views + " • Воспроизведение напрямую из репозитория";
    
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

// Стартуем автоматическое сканирование всей структуры репозитория
loadAllVideos();
