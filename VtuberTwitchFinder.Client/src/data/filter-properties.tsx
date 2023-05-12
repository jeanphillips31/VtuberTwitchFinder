import {match} from "assert";

export default class FilterProperties {
    gameNames: string[] = [];
    languages: string[] = [];

    setValue(type: FilterOption, value: any) {
        switch (type) {
            case FilterOption.gameName:
                this.setGameName(value as string[])
                break;
            case FilterOption.language:
                this.setLanguage(value as string[])
                break;
        }
    }


    getGameNames(): string[] {
        return this.gameNames;
    }

    getLanguages(): string[] {
        return this.languages;
    }

    setGameName(game: string[]) {
        this.gameNames = game;
    }

    setLanguage(lang: string[]) {
        this.languages = lang;
    }

    getFilterAmount(): number {
        let amount: number = 0;

        if (this.gameNames.length > 0) {
            amount++;
        }
        if (this.languages.length > 0) {
            amount++;
        }

        return amount;
    }
}

export enum FilterOption {
    gameName,
    language,
    reset
}