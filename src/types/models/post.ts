
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

  export interface Theme {
    id: number;
    name: string;
    posts: Post[];
  }

  export interface Post {
    id: number;
    title: string;
    content?: string;
    photoUrl?: string;
    userId?: number;
  }

  export interface PhotosList{
    id: number;
    title: string;
    photos: {
      filename: string;
      userId: number;
      id: number;
      postId: number;
      uploadedAt: string;
    }[]; 
  }