
// テーマの情報を定義
export interface ThemeInput {
    name: string; //テーマ名
}


// データーベースに保存する画像の情報を定義
export interface photoForm{
    postId : number; //postId primary key
    userId : number; //userId foreign key
    fileName : string; //image file name
    uploadedAt : Date; //date(timestamp)
}


// ユーザーの投稿
export interface PostForm{
    userId : number; //userId primary key
    title : string;
    content : string;
    themeId : number; //themeId foreign key
    photos : File | undefined; //image file
}

