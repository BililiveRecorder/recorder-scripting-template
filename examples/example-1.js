recorderEvents = {
    onTest(alert) {
        alert('script test')
    },
    onTransformStreamUrl(originalUrl) {
        const match = /^(https?\:\/\/)cn-[^/]*(.bilivideo.com\/live-bvc\/.*&cdn=)([^&]*)(.*)$/.exec(originalUrl)
        if (match) {
            return `${match[1]}d1--${match[3]}${match[2]}${match[3]}${match[4]}`;
        } else {
            return null;
        }
    },
    onFetchStreamUrl(data) {
        const playUrl = fetchSync(`https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${data.roomid}&qn=10000&platform=web`, {
            method: 'GET',
            headers: {
                'Origin': 'https://live.bilibili.com',
                'Referer': 'https://live.bilibili.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
            },
        });

        if (!playUrl.ok) {
            return null;
        }

        /** @type {string[]?} */
        const urls = JSON.parse(playUrl.body)?.data.durl?.map(x => x.url);

        if (!(urls?.length))
            return null;

        const matchGotcha = /^https?\:\/\/[^\/]*gotcha[^\/]*\.bilivideo\.com\/.+$/;

        const filtered = urls.filter(x => matchGotcha.test(x));
        if (filtered.length) {
            return filtered[Math.floor(Math.random() * filtered.length)];
        } else {
            return urls[Math.floor(Math.random() * urls.length)];
        }
    },
}
