import { isValidYouTubeUrl } from "@genway-ai/youtube-link-utils";

export const isYoutubeLinkIsValid = (link: string) =>{
    return isValidYouTubeUrl(link);
};