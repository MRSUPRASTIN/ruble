// НАСТРОЙКА РЕПОЗИТОРИЯ
const GITHUB_USERNAME = "MRSUPRASTIN"; 
const REPO_NAME = "ruble";              
const VIDEO_FOLDER = "my-videos";       

const videoGrid = document.getElementById('video-grid');

// Функция генерации красивых случайных просмотров
function getRandomViews() {
    const views = Math.floor(Math.random() * 95000) + 500; 
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + " тыс. просмотров";
    }
    return views + " просмотров";
}

// Автоматический поиск ВСЕХ видео через Git Trees под твою текущую разметку
async function loadAllVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10"><i class="fas fa-spinner fa-spin mr-2"></i> Сканируем папку, ищем абсолютно все видео...</p>`;

    try {
        const treeUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/git/trees/main?recursive=1&nocache=${Date.now()}`;
        const response = await fetch(treeUrl);
        
        if (!response.ok) {
            throw new Error("Не удалось загрузить дерево файлов");
        }

        const data = await response.json();
        
        // Ищем .mp4 в папке my-videos
        const videoFiles = data.tree.filter(file => 
            file.path.startsWith(VIDEO_FOLDER + '/') && 
            file.path.toLowerCase().endsWith('.mp4')
        );

        if (videoFiles.length === 0) {
            videoGrid.innerHTML = `<p class="text-gray-400 col-span-full text-center py-10">В папке '${VIDEO_FOLDER}' не найдено ни одного .mp4 файла!</p>`;
            return;
        }

        videoGrid.innerHTML = "";

        // Отрисовка под твой текущий дизайн (как на скриншоте)
        videoFiles.forEach((file, index) => {
            const rawVideoUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${file.path}`;
            const videoTitle = `Сериал Жена врага народа ${index + 1} серия`;
            const randomViewsCount = getRandomViews();
            const dateText = `${Math.min(index + 1, 7)} дн. назад`;

            // Создаем объект видео, который ожидает твой текущий плеер
            const videoObject = {
                title: videoTitle,
                videoUrl: rawVideoUrl,
                views: randomViewsCount,
                date: dateText
            };

            const card = document.createElement('div');
            card.className = 'flex flex-col cursor-pointer group';
            card.onclick = () => openPlayer(videoObject);

            card.innerHTML = `
                <div class="relative aspect-video w-full bg-gray-900 rounded-xl overflow-hidden mb-3">
                    <video src="${rawVideoUrl}" muted class="w-full h-full object-cover"></video>
                    <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rounded">45:00</span>
                </div>
                
                <div class="flex space-x-3 px-1">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-indigo-700 flex-shrink-0 flex items-center justify-center font-bold text-xs shadow-inner">
                        YX
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-gray-200">${videoTitle}</h3>
                        <p class="text-xs text-gray-400 mt-1 flex items-center gap-1">YouTubeX Мега Сериалы <i class="fas fa-check-circle text-gray-500 text-[10px]"></i></p>
                        <div class="text-xs text-gray-400 mt-0.5 flex items-center space-x-1">
                            <span>${randomViewsCount}</span>
                            <span class="before:content-['•'] before:mr-1">${dateText}</span>
                        </div>
                    </div>
                </div>
            `;
            
            videoGrid.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        videoGrid.innerHTML = `<p class="text-red-400 col-span-full text-center py-10">Ошибка загрузки видеороликов из GitHub API.</p>`;
    }
}

// ФУНКЦИИ МОДАЛЬНОГО ПЛЕЕРА ПОД ТВОЙ ТЕКУЩИЙ INDEX.HTML
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

// Запуск сканирования
document.addEventListener('DOMContentLoaded', loadAllVideos);
