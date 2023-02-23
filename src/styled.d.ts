import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        // 이 부분이 나의 테마가 어떻게 보일지 설명할
        // borderRadius: string;

        // colors: {
        //     main: string;
        //     secondary: string;
        // };

        // textColor: string;
        // accentColor: string;
        // cardBgColor: string;
        bgColor: string;
        cardColor: string;
        boardColor: string;
    }
}
