const levelSettings = {
    easy: {
        maxScore: 4,
        hints: 3,
        boardSize: {
            width: 4,
            height: 2
        }
    },
    normal: {
        maxScore: 8,
        hints: 3,
        boardSize: {
            width: 4,
            height: 4
        }
    },
    hard: {
        maxScore: 15,
        hints: 5,
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
    const settings = Object.assign({}, levelSettings[difficulty] || levelSettings.normal);
    if (isPortrait()) {
        const temp = settings.boardSize.width;
        settings.boardSize.width = settings.boardSize.height;
        settings.boardSize.height = temp;
    }
    return settings;
}