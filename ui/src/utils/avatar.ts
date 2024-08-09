import * as env from '../config/env'

export async function hash(str: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export function getGuestAvatar(seed: string): string {
    return `https://comment.moonlab.top/genavatar?seed=` + seed;
    // return `${env.API_HOST}/genavatar?seed=` + seed;
}

export async function getGravatar(email: string): Promise<string> {
    const hashed = await hash(email.trim().toLowerCase());
    // Gravatar dont recognize SVG as a image
    // https://docs.gravatar.com/api/avatars/images/
    // https://www.dicebear.com/guides/use-the-http-api-as-gravatar-default-image/#:~:text=Since%20Gravatar%20does%20not%20support%20SVG%2C,we%20have%20to%20use%20the%20PNG%20endpoint.
    const url = `https:/gravatar.com/avatar/${hashed}?d=${encodeURIComponent('https://api.dicebear.com/9.x/open-peeps/png?seed=' + hashed)}`;
    // const url = getGuestAvatar(email);
    return url;
  }