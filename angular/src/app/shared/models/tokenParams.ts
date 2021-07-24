export class TokenParams {
    code?: string;
    content?: JsonContent;
    message?: string;
    status?: number;

}
export class JsonContent {
    role?: string[];
    token?: string;
    username?: string;
}