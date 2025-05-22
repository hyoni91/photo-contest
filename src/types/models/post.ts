
// テーマの情報を定義
export interface ThemeInput {
    name: string; //テーマ名
}

export interface PostRequestBody {
    title: string;
    content: string;
    themeId: number;
    photoUrl: string;
  }

  export interface PhotoForm {
    filename: string;
    postId: number;
    userId: number;
  }
