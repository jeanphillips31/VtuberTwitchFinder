import {match} from "assert";

export default class FilterProperties {
    exactMatch: string = "";
    gameNames: string[] = [];
    languages: string[] = [];

    setValue(type: FilterOption, value: any) {
        console.log(value);
        switch (type) {
            case FilterOption.exactMatch:
                this.setExactMatch(value as string)
                break;
            case FilterOption.gameName:
                this.setGameName(value as string[])
                break;
            case FilterOption.language:
                this.setLanguage(value as string[])
                break;
        }
    }

    getExactMatch(): string {
        return this.exactMatch;
    }

    getGameNames(): string[] {
        return this.gameNames;
    }

    getLanguages(): string[] {
        return this.languages;
    }

    setExactMatch(match: string) {
        this.exactMatch = match;
    }

    setGameName(game: string[]) {
        this.gameNames = game;
    }

    setLanguage(lang: string[]) {
        this.languages = lang;
    }

    getFilterAmount(): number {
        let amount: number = 0;

        if (this.exactMatch !== "") {
            amount++;
        }
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
    exactMatch = 1,
    gameName,
    language
}