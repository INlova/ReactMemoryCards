
const levels = {
    easy: {
        width: 4,
        height: 2
    },

    normal: {
        width: 4,
        height: 4
    },

    hard: {
        width: 6,
        height: 5
    }
}

function isPortrait() {
    const docElement = document.documentElement;
    const isMobile = docElement.clientWidth <= 650 ||
                     docElement.clientHeight <= 500;
   return isMobile || (docElement.clientWidth / docElement.clientHeight <= 1);
}

export function getLevelSettings(levelType) {
    const settings = Object.assign({}, levels[levelType] || levels.normal);
    if (isPortrait()) {
        const temp = settings.width;
        settings.width = settings.height;
        settings.height = temp;
    }
    return settings;
}