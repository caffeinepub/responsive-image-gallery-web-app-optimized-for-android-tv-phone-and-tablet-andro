import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Image {
    id: ImageId;
    title: string;
    imageType: ImageType;
}
export type ImageType = {
    __kind__: "url";
    url: string;
} | {
    __kind__: "externalBlob";
    externalBlob: ExternalBlob;
};
export type ImageId = number;
export interface backendInterface {
    addImage(title: string, imageType: ImageType): Promise<ImageId>;
    addUploadedImage(title: string, blob: ExternalBlob): Promise<ImageId>;
    addUrlImage(title: string, url: string): Promise<ImageId>;
    getAllImages(): Promise<Array<Image>>;
    getImage(id: ImageId): Promise<Image>;
    getImageBlobs(): Promise<Array<[ImageId, ExternalBlob]>>;
}
