class URLHandler {
    private static instance: URLHandler;
    private blobUrls: Map<string, Blob>;

    private constructor() {
        this.blobUrls = new Map();
    }

    public static getInstance(): URLHandler {
        if (!URLHandler.instance) {
            URLHandler.instance = new URLHandler();
        }
        return URLHandler.instance;
    }

    createBlobUrl(data: any, options?: BlobPropertyBag): {url: string, blob: Blob} {
        const blob = new Blob([data], options);
        const url = URL.createObjectURL(blob);
        this.blobUrls.set(url, blob);
        return {url, blob};
    }

    revokeBlobUrl(url: string): void {
        if (this.blobUrls.has(url)) {
            URL.revokeObjectURL(url);
            this.blobUrls.delete(url);
        } else {
            console.warn(`URL ${url} not found.`);
        }
    }

    getBlob(url: string): Blob | undefined {
        return this.blobUrls.get(url);
    }

    /**
     * You do not want to do this
     */
    revokeAll(): void {
        for (const url of this.blobUrls.keys()) {
            URL.revokeObjectURL(url);
        }
        this.blobUrls.clear();
    }
}

export const handler = URLHandler.getInstance();