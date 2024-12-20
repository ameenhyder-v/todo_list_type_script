import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(id: string): void;
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");

        if (typeof storedList !== "string") return;

        try {
            const parsedList: { _id: string; _item: string; _checked: boolean }[] = JSON.parse(storedList);
            parsedList.forEach((itemObj) => {
                const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
                this.addItem(newListItem);
            });
        } catch (e) {
            console.error("Failed to parse the stored list", e);
        }
    }

    save(): void {
        try {
            localStorage.setItem("myList", JSON.stringify(this._list));
        } catch (e) {
            console.error("Failed to save to localStorage", e);
        }
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save();
    }
}