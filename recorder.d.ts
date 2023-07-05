/**
 * 录播姬的事件
 */
declare var recorderEvents: {
    /**
     * 按下测试按钮。
     */
    onTest?: (alert: (message?: any) => void) => void;

    /**
     * 过滤弹幕消息。  
     * 写入 XML 文件之前会调用，如果返回 false 就不会写入。
     */
    onDanmaku?: (json: string) => boolean;

    /**
     * 获取直播流地址，每次尝试开始录播调用一次。  
     * 如果返回了 null 会使用录播姬默认逻辑获取直播流地址。  
     * 如果返回了 string 则无条件使用脚本给的地址。
     */
    onFetchStreamUrl?: (data: { roomid: number, qn: number[] }) => string | null;

    /**
     * 修改直播流地址，每次连接直播服务器（包括 HTTP 302 跳转后）都会调用一次。  
     * 可以返回 null 意为不做修改  
     * 或返回 string 修改后的直播流地址  
     * 或返回 {url:string, ip?:string} 在修改直播流地址的同时指定连接的 IP 地址
     */
    onTransformStreamUrl?: (originalUrl: string) => string | { url: string, ip?: string } | null;

    /**
     * 修改发给弹幕服务器的握手包 JSON。
     * 需要注意握手包会影响到弹幕服务器返回的消息格式，导致直播服务器返回录播姬不支持的数据。
     * @param roomInfo 当前直播间信息
     * @param json 原握手包 JSON
     * @returns 返回 null 意为不做修改，或返回修改后的 JSON 文本
     */
    onDanmakuHandshake?: (roomInfo: RoomInfo, json: string) => string | null;
}

interface RoomInfo {
    /**
     * 原房间号
     * @example 123456
     */
    readonly roomId: number;

    /**
     * 直播间短号，没有的为 0
     * @example 0
     */
    readonly shortId: 0 | number;

    /**
     * 主播名字
     */
    readonly name: string;

    /**
     * 直播间标题
     */
    readonly title: string;

    /**
     * 直播间父分区
     */
    readonly areaParent: string;

    /**
     * 直播间子分区
     */
    readonly areaChild: string;

    /**
     * 录播姬内部对象 ID，与 API 中的 objectId 相同，重启后会变化
     */
    readonly objectId: string;

    /**
     * B站直播 API 返回的原始数据。与文件名模板的 `json` 变量相同。
     * @see https://rec.danmuji.org/user/file-name-template/#json
     */
    readonly apiData: any;
}

declare var console: Console;
interface Console {
    assert(condition?: boolean, ...data: any[]): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    debug(...data: any[]): void;
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: any[]): void;
    trace(...data: any[]): void;
    warn(...data: any[]): void;
}

interface Storage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}

declare var sharedStorage: Storage;

interface URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    readonly origin: string;
    username: string;
    password: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    readonly searchParams: URLSearchParams;
    toString(): string;
    toJSON(): string;
}

declare var URL: {
    prototype: URL;
    new(url: string, base?: string): URL;
};

interface URLSearchParams {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    getAll(name: string): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    /** @deprecated not implemented */
    sort(): void;
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

declare var URLSearchParams: {
    prototype: URLSearchParams;
    new(init?: Record<string, string> | string): URLSearchParams;
};

declare var dns: DNS;
declare interface DNS {
    /**
     * 根据域名查询 IP
     * @param domain 域名
     * @returns IP 地址，包括 IPv4 和 IPv6(如果有)
     */
    lookup(domain: string): string[];
}

/**
 * 发送网络请求
 * @param url 请求 URL
 * @param init 请求参数
 */
declare function fetchSync(url: string, init?: FetchSyncInit): FetchSyncResponse;

interface FetchSyncInit {
    method?: 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'TRACE';
    body?: string | undefined;
    headers?: Record<string, string> | [name: string, value: string][];
    redirect?: 'follow' | 'manual' | 'error';
    referrer?: string | undefined;
}

interface FetchSyncResponse {
    status: number;
    statusText: string;
    ok: boolean;
    body: string;
    headers: { [name: string]: string }
}

/**
 * 提供给脚本环境的 .NET 类型
 */
declare const dotnet: {
    /**
     * System.Net.Dns
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.dns
     */
    Dns: any;

    /**
     * System.Uri
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.uri
     */
    Uri: any;
    /**
     * System.UriBuilder
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.uribuilder
     */
    UriBuilder: any;
    /**
     * System.Web.HttpUtility
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.web.httputility
     */
    HttpUtility: any;
    /**
     * System.Collections.Specialized.NameValueCollection
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.namevaluecollection
     */
    NameValueCollection: any;

    /**
     * System.Net.Http.HttpClient
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient
     */
    HttpClient: any;
    /**
     * System.Net.Http.HttpClientHandler
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclienthandler
     */
    HttpClientHandler: any;
    /**
     * System.Net.Http.HttpCompletionOption
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpcompletionoption
     */
    HttpCompletionOption: any;
    /**
     * System.Net.Http.HttpRequestMessage
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httprequestmessage
     */
    HttpRequestMessage: any;
    /**
     * System.Net.Http.HttpMethod
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpmethod
     */
    HttpMethod: any;
    /**
     * System.Net.Http.ByteArrayContent
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.bytearraycontent
     */
    ByteArrayContent: any;
    /**
     * System.Net.Http.StringContent
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.stringcontent
     */
    StringContent: any;
    /**
     * System.Net.Http.FormUrlEncodedContent
     * @link https://docs.microsoft.com/en-us/dotnet/api/system.net.http.formurlencodedcontent
     */
    FormUrlEncodedContent: any;
}
