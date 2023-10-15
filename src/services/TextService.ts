class TextService {
    justify = (
        text: string
    ): string => {
            const targetLineLength = 80;
            const justifiedText: Array<String> = [];

            while (text.length > 80) {
                var tmpText = text.slice(0, targetLineLength + 1);

                if (tmpText[tmpText.length] != ' ') {
                    const words = tmpText.split(' ');
                    words.pop();
                    tmpText = words.join(' ');
                }

                tmpText = tmpText.split('\n')[0];
                var len = tmpText.length;
                var spaceNeeded = 80 - len;
                tmpText = justifyString(tmpText, spaceNeeded);
                justifiedText.push(tmpText);
                text = text.slice(len).replace(/^\s+/, '');
            }
            if (text.length > 0) justifiedText.push(text);

            return justifiedText.join('\n');
    };
}

function justifyString(inputString: string, totalLength: number) {
    var tmp = inputString.split(' ');
    var index = 0;
    while (totalLength > 0) {
        tmp[index] = tmp[index] + ' ';
        totalLength -= 1;
        index += 1;
        if (index >= tmp.length - 1) {
            index = 0;
        }
    }
    inputString = tmp.join(' ');
    return inputString;
}

export default new TextService();