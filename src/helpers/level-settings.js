export const levelSettings = {
    easy: {
        maxScore: 4,
        boardSize: {
            width: 4,
            height: 2
        }
    },
    normal: {
        maxScore: 8,
        boardSize: {
            width: 4,
            height: 4
        }
    },
    hard: {
        maxScore: 15,
        boardSize: {
            width: 6,
            height: 5
        }
    }
}

function isPortrait() {
    const docElement = document.documentElement;
    const isMobile = docElement.clientWidth <= 650 ||
                     docElement.clientHeight <= 500;
   return isMobile || (docElement.clientWidth / docElement.clientHeight <= 1);
}

export function getLevelSettings(difficulty) {
    const origin = levelSettings[difficulty] || levelSettings.normal;
    const settings = JSON.parse(JSON.stringify(origin));
    if (isPortrait()) {
        const temp = settings.boardSize.width;
        settings.boardSize.width = settings.boardSize.height;
        settings.boardSize.height = temp;
    }
    return settings;
}