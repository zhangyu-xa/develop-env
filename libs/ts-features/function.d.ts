declare function tsFun(x: number, y?: number): number;
declare let testFun: (x: number, y?: number) => number;
interface funInterface {
    (x: number, y?: number): number;
}
declare let ifFun: funInterface;
declare let a: number[];
declare function push(array: any[], ...rest: any[]): void;
