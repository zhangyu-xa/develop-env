interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
    readonly salary: number;
}
declare let me: Person;
export default me;
