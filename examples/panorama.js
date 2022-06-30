// 2022年06月30 房间号 23771189 恬豆发芽了 《【全景3D】恬豆生日会》
// 全景直播最后加了个 panorama=1 的参数
recorderEvents = {
    onFetchStreamUrl(data) {
        const playUrl = fetchSync(`https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=${data.roomid}&protocol=0,1&format=0,1,2&codec=0,1&qn=20000&platform=web&ptype=8&dolby=5&panorama=1`, {
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

        /** @type {any[]?} */
        const streams = JSON.parse(playUrl.body)?.data?.playurl_info?.playurl?.stream;
        if (!streams) return null;

        const result = streams.filter(x => x.protocol_name == "http_stream")[0].format.filter(x => x.format_name == "flv")[0].codec.filter(x => x.codec_name == "avc")[0];

        console.debug(result);

        if (result.current_qn != 20000) {
            console.warn("当前 qn 是: " + result.current_qn);
        }

        const randomId = Math.floor(Math.random() * result.url_info.length);
        const url_info = result.url_info[randomId];
        return url_info.host + result.base_url + url_info.extra;
    },
}
